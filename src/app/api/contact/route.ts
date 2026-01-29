import { NextResponse } from 'next/server';
import { z } from 'zod';

// Define Validation Schema for Contact Form
const ContactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(1, "Message is required"),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate data
        const result = ContactSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                {
                    error: 'Validation failed',
                    details: result.error.flatten().fieldErrors
                },
                { status: 400 }
            );
        }

        // TODO: INTEGRATION REQUIRED
        // On Vercel, you cannot save to the local file system (fs).
        // You must use an external service to store this data or send an email.
        // Examples:
        // 1. Send Email: Use Nodemailer with Gmail/SendGrid/Resend
        // 2. Database: Use Supabase, MongoDB, or Vercel Postgres
        // 3. Form Service: Use Formspree

        // For now, we log the received message to the server console (viewable in Vercel logs)
        console.log('--- NEW CONTACT MESSAGE ---');
        console.log('Name:', result.data.name);
        console.log('Email:', result.data.email);
        console.log('Subject:', result.data.subject);
        console.log('Message:', result.data.message);
        console.log('---------------------------');

        return NextResponse.json(
            {
                success: true,
                message: 'Message received successfully!',
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
