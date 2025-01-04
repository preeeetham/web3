import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID parameter is required.' },
        { status: 400 }
      );
    }

    // Fetch the action by ID
    const action = await prisma.action.findUnique({
      where: { id },
    });

    if (!action) {
      return NextResponse.json(
        { success: false, message: `Action with ID ${id} not found.` },
        { status: 404 }
      );
    }

    // Base URL for constructing links
    const baseUrl = "http://localhost:3000";

    // Construct the response
    const response = {
      id: action.id,
      data: {
        title: action.title,
        icon: action.icon,
        description: action.description,
        label: action.label,
        links: {
          actions: [
            ...action.amounts.map((amount: number) => ({
              label: `Send ${amount} SOL`,
              href: `${baseUrl}/api/actions?id=${id}&amount=${amount}`,
            })),
            ...(action.customAmount
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
        message: error instanceof Error ? error.message : 'Unknown error occurred.',
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
