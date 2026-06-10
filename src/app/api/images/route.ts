import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import path from "path";
import { promises as fs } from "fs";

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
      const uploadDir = path.join(process.cwd(), "public", "uploads", cat);
      
      try {
        const files = await fs.readdir(uploadDir);
        const imageFiles = files
          .filter(file => file !== ".emptyFolderPlaceholder")
          .map(file => `/uploads/${cat}/${file}`);
        result[cat] = imageFiles;
      } catch (err: any) {
        if (err.code === "ENOENT") {
          result[cat] = [];
        } else {
          console.error(`Error listing folder ${cat}:`, err);
          result[cat] = [];
        }
      }
    }

    return NextResponse.json({ success: true, images: result });
  } catch (error: any) {
    console.error("Failed to read images:", error);
    return NextResponse.json({ error: "Failed to load upload gallery" }, { status: 500 });
  }
}
