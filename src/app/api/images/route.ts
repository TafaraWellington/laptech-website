import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const allowedCategories = ["products", "schools", "servers", "repairs"];
    const categoriesToRead = category && allowedCategories.includes(category) 
      ? [category] 
      : allowedCategories;

    const result: Record<string, string[]> = {};

    for (const cat of categoriesToRead) {
      const { data, error } = await supabase.storage
        .from("laptech_media")
        .list(cat, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) {
        console.error(`Error listing folder ${cat}:`, error);
        result[cat] = [];
      } else {
        result[cat] = data
           .filter(file => file.name !== '.emptyFolderPlaceholder')
           .map(file => {
              const { data: urlData } = supabase.storage.from("laptech_media").getPublicUrl(`${cat}/${file.name}`);
              return urlData.publicUrl;
           });
      }
    }

    return NextResponse.json({ success: true, images: result });
  } catch (error: any) {
    console.error("Failed to read images:", error);
    return NextResponse.json({ error: "Failed to load upload gallery" }, { status: 500 });
  }
}
