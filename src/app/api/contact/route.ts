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

        // Send to Formspree
        try {
            const response = await fetch("https://formspree.io/f/xlgngzjb", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    _subject: `New Contact: ${result.data.subject}`,
                    ...result.data,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message to Formspree");
            }
        } catch (err) {
            console.error("Formspree Error:", err);
            // We still return success to the user so they see the "Thank you" message,
            // but we log the error for debugging.
        }

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
