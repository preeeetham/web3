import { NextRequest, NextResponse } from "next/server";
import { PublicKey } from "@solana/web3.js";

interface ActionFormInput {
  title: string;
  description: string;
  iconUrl: string;
  toPubkey: string;
  links: Array<{
    label: string;
    amount?: number;
    href?: string;
    parameters?: Array<{
      name: string;
      label: string;
      required: boolean;
    }>;
  }>;
}

function validateSolanaAddress(address: string): PublicKey {
  try {
    return new PublicKey(address);
  } catch (err) {
    console.log(err);
    throw new Error("Invalid Solana wallet address");
  }
}

function validateFormInput(input: ActionFormInput): PublicKey {
  if (!input.title || !input.description || !input.iconUrl || !input.toPubkey) {
    throw new Error("Missing required fields: title, description, iconUrl, or toPubkey");
  }

  const toPubkey = validateSolanaAddress(input.toPubkey);

  if (!Array.isArray(input.links) || input.links.length === 0) {
    throw new Error("Links must be an array and cannot be empty");
  }

  input.links.forEach(link => {
    if (!link.label) {
      throw new Error("Each link must have a label");
    }
  });

  return toPubkey;
}

function generateActionUrl(baseUrl: string, id: string, to: string, amount: string | number) {
  return `${baseUrl}/api/actions/donate?id=${id}&to=${to}&amount=${amount}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData: ActionFormInput = await request.json();
    const toPubkey = validateFormInput(formData);
    
    // You might want to make these configurable or environment variables
    const baseUrl = "https://blinkgenerator.com";
    const id = "67782da9b5b886b3e6767c09";

    const payload = {
      title: formData.title,
      icon: formData.iconUrl,
      description: formData.description,
      label: "solana",
      links: {
        actions: formData.links.map(link => {
          const actionLink: any = {
            label: link.label,
          };

          if (link.amount) {
            // Fixed amount link
            actionLink.href = generateActionUrl(baseUrl, id, toPubkey.toString(), link.amount);
          } else if (link.parameters) {
            // Dynamic amount link
            actionLink.href = generateActionUrl(baseUrl, id, toPubkey.toString(), "{amount}");
            actionLink.parameters = [
              {
                name: "amount",
                label: "Enter the amount of SOL to send",
                required: true
              }
            ];
          }

          return actionLink;
        })
      }
    };

    return NextResponse.json(payload);
  } catch (err) {
    console.error("Error processing the request:", err);
    return NextResponse.json({
      message: err instanceof Error ? err.message : "An unknown error occurred"
    }, { status: 400 });
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}