import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const category = formData.get("category") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!category) {
      return NextResponse.json({ error: "No category provided" }, { status: 400 });
    }

    const allowedCategories = ["products", "schools", "servers", "repairs"];
    if (!allowedCategories.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    
    // Generate clean filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
    const filename = `${category}/${uniqueSuffix}-${sanitizedFilename}`;

    // Upload directly to Supabase Storage bucket named 'laptech_media'
    const { data, error } = await supabase.storage
      .from('laptech_media')
      .upload(filename, bytes, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
      console.error("Supabase storage error:", error);
      return NextResponse.json({ error: `Supabase Storage error: ${error.message}` }, { status: 500 });
    }

    // Get the public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from('laptech_media')
      .getPublicUrl(filename);

    return NextResponse.json({ 
      success: true, 
      url: publicUrlData.publicUrl,
      filename: filename,
      category: category
    });
  } catch (error: any) {
    console.error("Upload handler error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload file" }, { status: 500 });
  }
}
