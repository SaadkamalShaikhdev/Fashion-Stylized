import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    await connectToDatabase();
    try {
            const searchParams = request.nextUrl.searchParams;
            const category = searchParams.get('category');
            if(category){
                const products = await Product.find({ category }).lean();
                if (!products) {
                    return NextResponse.json({ success: false, error: 'No products found for this category' }, { status: 404 });
                }

                return NextResponse.json({ success: true, data: products }, { status: 200 });
            }
            return NextResponse.json({ success: false, error: 'Category parameter is required' }, { status: 400 });

    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch categories' }, { status: 500 });
    }

}