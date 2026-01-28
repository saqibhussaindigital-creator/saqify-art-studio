import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const ORDER_FILE = path.join(DATA_DIR, 'orders.json');

export async function GET() {
    try {
        if (!fs.existsSync(ORDER_FILE)) {
            return NextResponse.json({ orders: [] }, { status: 200 });
        }

        const fileContent = fs.readFileSync(ORDER_FILE, 'utf-8');
        let orders = [];
        try {
            orders = JSON.parse(fileContent);
        } catch (e) {
            orders = [];
        }

        // Sort by date descending
        orders.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return NextResponse.json({ orders }, { status: 200 });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}
