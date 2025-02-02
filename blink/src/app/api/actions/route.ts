import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { validateInput, generateUniqueId } from '@/utils/validation';
import { ActionFormInput } from '@/types/types';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const input: ActionFormInput = await request.json();
    validateInput(input);

    const id = generateUniqueId();

    // Store the action in the database
    const action = await prisma.action.create({
      data: {
        id,
        title: input.title,
        icon: input.imageUrl,
        description: input.description,
        label: input.label,
        amounts: input.amounts,
        customAmount: input.customAmount,
      },
    });

    const baseUrl = "http://localhost:3000";

    // Create the response
    const response = {
      id: action.id,
      data: {
        title: action.title,
        icon: action.icon,
        description: action.description,
        label: action.label,
        links: {
          actions: [
            ...input.amounts.map((amount) => ({
              label: `Send ${amount} SOL`,
              href: `${baseUrl}/api/actions?id=${id}&amount=${amount}`,
            })),
            ...(input.customAmount
              ? [
                  {
                    label: "Send SOL",
                    href: `${baseUrl}/api/actions?id=${id}&amount={amount}`,
                    parameters: [
                      {
                        name: "amount",
                        label: "Enter the amount of SOL to send",
                        required: true,
                      },
                    ],
                  },
                ]
              : []),
          ],
        },
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
