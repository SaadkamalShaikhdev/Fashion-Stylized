import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { uploadToImageKit } from "@/lib/uplaudToImageKit";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    await connectToDatabase();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id') 
    // const page = parseInt(searchParams.get('page') || '1');
    // const limit = parseInt(searchParams.get('limit') || '10');

    try {
        if(id){
            const product = await Product.findById(id);
            if (!product) {
                return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
            }
            return NextResponse.json({ success: true, data: product }, { status: 200 });
        }

        const products = await Product.find({});
        if (!products) {
            return NextResponse.json({ success: false, error: 'No products found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: products }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions)
    if(session?.user?.role != "admin"){
        return NextResponse.json(
            {
             success: false,
             error: "User is not authenticated"
            },{status: 404}
        )
    }

    const {title , description, price, images , keyFeatures, category,isTrending, expire , token , signature,  } = await request.json();

    if(!title || !description || !price || !category){
        return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    try {
        const imageUrls: string[] = [];
        for (const image of images) {
           const uploadResult = await uploadToImageKit({image, token, signature, expire});
           if(uploadResult.url){   
           imageUrls.push(uploadResult.url);
           }
        }
        const newProduct = new Product({
            title,
            description,
            price,
            images: imageUrls,
            keyFeatures,
            category,
            isTrending,
        });
        const savedProduct = await newProduct.save();
        if (!savedProduct) {
        return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500
        });
    }
    return NextResponse.json({ success: true, data: savedProduct }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const session = await getServerSession(authOptions)
    if(session?.user?.role != "admin"){
        return NextResponse.json(
            {
             success: false,
             error: "User is not authenticated"
            },{status: 404}
        )
    }
     const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id') 
    if(!id){
        return NextResponse.json({ success: false, error: 'Product ID is required' }, { status: 400 });
    }
    const {title , description, price, images , keyFeatures, category,isTrending} = await request.json();
    try {
        if(!title || !description || !price || !category){
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }
        if(images){
            const imageUrls: string[] = [];
            for (const image of images) {
               const uploadResult = await uploadToImageKit({image, token: "", signature: "", expire: 0});
                if(uploadResult.url){
                     imageUrls.push(uploadResult.url);
                }
            }
        }
        else{
            const product = await Product.findByIdAndUpdate(id, { title, description, price, keyFeatures, category, isTrending }, { new: true });
            if (!product) {
                return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
            }
            return NextResponse.json({ success: true, data: product }, { status: 200 });
        }
        const product = await Product.findByIdAndUpdate(id, { title, description, price, keyFeatures, category, isTrending }, { new: true });
        if (!product) {
            return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: product }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const session = await getServerSession(authOptions)
    if(session?.user?.role != "admin"){
        return NextResponse.json(
            {
             success: false,
             error: "User is not authenticated"
            },{status: 404}
        )
    }
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id')
        if(!id){
            return NextResponse.json({ success: false, error: 'Product ID is required' }, { status: 400 });
        }
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: product }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete product' }, { status: 500 });
    }
}