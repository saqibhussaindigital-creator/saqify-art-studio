import { NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

// Define Validation Schema
const OrderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().optional(),
  details: z.string().min(10, "Please provide more details about your project"),
});

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const ORDER_FILE = path.join(DATA_DIR, 'orders.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

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

    // Read existing orders
    let orders: any[] = [];
    if (fs.existsSync(ORDER_FILE)) {
      const fileContent = fs.readFileSync(ORDER_FILE, 'utf-8');
      try {
        orders = JSON.parse(fileContent);
        if (!Array.isArray(orders)) orders = [];
      } catch (e) {
        console.error("Error parsing existing orders file, starting fresh.");
      }
    }

    // Add new order
    orders.push(newOrder);

    // Save to file
    fs.writeFileSync(ORDER_FILE, JSON.stringify(orders, null, 2));

    console.log('Order saved:', newOrder.id);

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
