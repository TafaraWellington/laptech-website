import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

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

    // Validate category to prevent directory traversal
    const allowedCategories = ["products", "schools", "servers", "repairs"];
    if (!allowedCategories.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define target directory in public folder
    const relativeUploadDir = join("uploads", category);
    const absoluteUploadDir = join(process.cwd(), "public", relativeUploadDir);

    // Ensure the folder exists
    if (!existsSync(absoluteUploadDir)) {
      await mkdir(absoluteUploadDir, { recursive: true });
    }

    // Generate clean filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
    const filename = `${uniqueSuffix}-${sanitizedFilename}`;
    const absoluteFilePath = join(absoluteUploadDir, filename);

    // Save the file
    await writeFile(absoluteFilePath, buffer);
    const publicUrl = `/${relativeUploadDir.replace(/\\/g, "/")}/${filename}`;

    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      filename: filename,
      category: category
    });
  } catch (error: any) {
    console.error("Upload handler error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload file" }, { status: 500 });
  }
}
