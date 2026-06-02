import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const allowedCategories = ["products", "schools", "servers", "repairs"];
    
    // If no category specified, return all images grouped by category
    const categoriesToRead = category && allowedCategories.includes(category) 
      ? [category] 
      : allowedCategories;

    const result: Record<string, string[]> = {};

    for (const cat of categoriesToRead) {
      // List files inside the category folder in the 'laptech_media' bucket
      const { data: files, error } = await supabase.storage
        .from('laptech_media')
        .list(cat);

      if (error) {
        console.error(`Error listing folder ${cat} in Supabase storage:`, error);
        result[cat] = [];
        continue;
      }

      if (files) {
        // Filter out any default placeholder/folder files, and map to public URLs
        const imageFiles = files
          .filter(file => file.name !== ".emptyFolderPlaceholder")
          .map(file => {
            const { data } = supabase.storage
              .from('laptech_media')
              .getPublicUrl(`${cat}/${file.name}`);
            return data.publicUrl;
          });
        result[cat] = imageFiles;
      } else {
        result[cat] = [];
      }
    }

    return NextResponse.json({ success: true, images: result });
  } catch (error: any) {
    console.error("Failed to read images from Supabase storage:", error);
    return NextResponse.json({ error: "Failed to load upload gallery" }, { status: 500 });
  }
}
