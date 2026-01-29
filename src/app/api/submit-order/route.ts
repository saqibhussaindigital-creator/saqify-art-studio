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

    // TODO: INTEGRATION REQUIRED
    // On Vercel, you cannot save to the local file system (fs).
    // You must use an external service to store this data or send an email.

    // For now, we log the received order to the server console (viewable in Vercel logs)
    console.log('--- NEW ORDER RECEIVED ---');
    console.log('Order ID:', newOrder.id);
    console.log('Data:', JSON.stringify(result.data, null, 2));
    console.log('--------------------------');

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
