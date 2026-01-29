import { NextResponse } from 'next/server';
import { z } from 'zod';
// Define Validation Schema
const OrderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().optional(),
  details: z.string().min(10, "Please provide more details about your project"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate data
    const result = OrderSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: result.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const newOrder = {
      id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...result.data,
      createdAt: new Date().toISOString(),
      status: 'pending' // pending, completed, cancelled
    };

    // Send to Formspree
    try {
      const response = await fetch("https://formspree.io/f/xlgngzjb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Order: ${result.data.service} (${newOrder.id})`,
          ...result.data,
          orderId: newOrder.id
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send order to Formspree");
      }
    } catch (err) {
      console.error("Formspree Error:", err);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Order submitted successfully!',
        orderId: newOrder.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
