import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import { supabase } from "@/lib/supabase";

// GET: Fetch all products from Supabase database
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('Product')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ success: true, products: data || [] });
  } catch (error: any) {
    console.error("Supabase product fetch failed:", error);
    return NextResponse.json({ error: "Failed to connect to Supabase. Ensure your .env keys are correct." }, { status: 500 });
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

    const { data, error } = await supabase
      .from('Product')
      .insert([{
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
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, product: data });
  } catch (error: any) {
    console.error("Failed to add product:", error);
    return NextResponse.json({ error: error.message || "Failed to create product in Supabase database." }, { status: 500 });
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

    const { data, error } = await supabase
      .from('Product')
      .update({
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
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, product: data });
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

    const { error } = await supabase
      .from('Product')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true, message: "Product deleted successfully." });
  } catch (error: any) {
    console.error("Failed to delete product:", error);
    return NextResponse.json({ error: error.message || "Failed to delete product from database." }, { status: 500 });
  }
}
