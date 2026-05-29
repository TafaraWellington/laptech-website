import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Fetch all products from MySQL database
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    console.error("Prisma product fetch failed:", error);
    return NextResponse.json({ error: "Failed to connect to MySQL database. Ensure your prisma configuration and .env are set up properly." }, { status: 500 });
  }
}

// POST: Create a new product in the database
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate required fields
    const { brand, model, promoPrice, quantity } = body;
    if (!brand || !model || promoPrice === undefined || quantity === undefined) {
      return NextResponse.json({ error: "Brand, Model, Promo Price, and Quantity are required." }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        brand,
        model,
        processor: body.processor || null,
        ram: body.ram || null,
        storage: body.storage || null,
        display: body.display || null,
        graphics: body.graphics || null,
        features: body.features || null,
        originalPrice: body.originalPrice ? parseFloat(body.originalPrice) : null,
        promoPrice: parseFloat(promoPrice),
        quantity: parseInt(quantity),
        imageUrl: body.imageUrl || null,
        isNew: !!body.isNew
      }
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error: any) {
    console.error("Failed to add product:", error);
    return NextResponse.json({ error: error.message || "Failed to create product in MySQL database." }, { status: 500 });
  }
}

// PUT: Update an existing product
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, brand, model, promoPrice, quantity } = body;

    if (!id || !brand || !model || promoPrice === undefined || quantity === undefined) {
      return NextResponse.json({ error: "ID, Brand, Model, Promo Price, and Quantity are required for updates." }, { status: 400 });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        brand,
        model,
        processor: body.processor || null,
        ram: body.ram || null,
        storage: body.storage || null,
        display: body.display || null,
        graphics: body.graphics || null,
        features: body.features || null,
        originalPrice: body.originalPrice ? parseFloat(body.originalPrice) : null,
        promoPrice: parseFloat(promoPrice),
        quantity: parseInt(quantity),
        imageUrl: body.imageUrl || null,
        isNew: !!body.isNew
      }
    });

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error: any) {
    console.error("Failed to update product:", error);
    return NextResponse.json({ error: error.message || "Failed to update product in database." }, { status: 500 });
  }
}

// DELETE: Delete a product from the database
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID is required." }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: "Product deleted successfully." });
  } catch (error: any) {
    console.error("Failed to delete product:", error);
    return NextResponse.json({ error: error.message || "Failed to delete product from database." }, { status: 500 });
  }
}
