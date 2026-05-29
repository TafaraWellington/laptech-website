import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import { readdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

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
      const relativePath = join("uploads", cat);
      const absolutePath = join(process.cwd(), "public", relativePath);
      
      if (existsSync(absolutePath)) {
        const files = await readdir(absolutePath);
        // Filter out hidden files or subfolders, keep only images/files
        const imageFiles = files
          .filter(file => !file.startsWith('.'))
          .map(file => `/${relativePath.replace(/\\/g, "/")}/${file}`);
        result[cat] = imageFiles;
      } else {
        result[cat] = [];
      }
    }

    return NextResponse.json({ success: true, images: result });
  } catch (error: any) {
    console.error("Failed to read images:", error);
    return NextResponse.json({ error: "Failed to load upload gallery" }, { status: 500 });
  }
}
