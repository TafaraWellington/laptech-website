"use client";

import { useState, useEffect, useRef } from "react";

type GalleryImages = Record<string, string[]>;

export default function AdminDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("products");
  const [images, setImages] = useState<GalleryImages>({
    products: [],
    schools: [],
    servers: [],
    repairs: []
  });
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch all images
  const fetchImages = async () => {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();
      if (data.success) {
        setImages(data.images);
      }
    } catch (err) {
      console.error("Error loading upload gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setMessage(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreviewUrl(URL.createObjectURL(droppedFile));
      setMessage(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage({ text: "Please select a file first.", type: "error" });
      return;
    }

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", selectedCategory);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();

      if (data.success) {
        setMessage({ text: `Successfully uploaded to ${selectedCategory}!`, type: "success" });
        setFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        
        // Refresh the image library
        fetchImages();
      } else {
        setMessage({ text: data.error || "Failed to upload file.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "An error occurred during upload.", type: "error" });
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const categories = [
    { id: "products", label: "Laptops & Products", icon: "💻", color: "text-blue-400" },
    { id: "schools", label: "School Installations", icon: "🏫", color: "text-amber-400" },
    { id: "servers", label: "Server Infrastructure", icon: "🖥️", color: "text-purple-400" },
    { id: "repairs", label: "Shop Repairs", icon: "🔧", color: "text-emerald-400" }
  ];

  const totalFiles = Object.values(images).reduce((acc, curr) => acc + curr.length, 0);

  return (
    <div className="min-h-screen bg-[#080d16] text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Banner header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-3xl pointer-events-none"></div>
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-950/45 border border-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              👑 Laptech Control Room
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              PORTFOLIO & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">ASSETS UPLOADER</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Welcome back, Jimmy. Upload, manage, and source images across your core business lines.
            </p>
          </div>
          
          {/* Quick stats grid */}
          <div className="flex gap-4">
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl px-5 py-3 text-center">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">TOTAL ASSETS</div>
              <div className="text-2xl font-black text-blue-400 mt-1">{totalFiles}</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl px-5 py-3 text-center">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">CHANNELS</div>
              <div className="text-2xl font-black text-amber-400 mt-1">4</div>
            </div>
          </div>
        </div>

        {/* Dynamic Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel: File Uploader */}
          <div className="lg:col-span-5 bg-slate-900/30 backdrop-blur-md border border-slate-800/60 rounded-3xl p-6 lg:p-8 shadow-xl h-fit">
            <h2 className="text-xl font-extrabold text-white mb-6 flex items-center gap-2">
              <span>📤</span> Upload New Media Asset
            </h2>

            <form onSubmit={handleUpload} className="space-y-6">
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Select Business Stream
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                        selectedCategory === cat.id
                          ? "bg-slate-800 border-blue-500/60 text-white shadow-md"
                          : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:bg-slate-950/80 hover:text-slate-200"
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Drag and Drop Box */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Choose Image File
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-800 hover:border-blue-500/40 bg-slate-950/30 hover:bg-slate-950/60 rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[180px] relative overflow-hidden group"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  {previewUrl ? (
                    <div className="absolute inset-0 flex flex-col justify-end p-4 group">
                      <img 
                        src={previewUrl} 
                        alt="Upload preview" 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="relative bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl text-center text-xs font-semibold z-10">
                        📄 {file?.name.substring(0, 20)}...
                        <span className="block text-[10px] text-blue-400 mt-0.5">Click box to change file</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-4xl">📸</div>
                      <p className="text-sm font-semibold text-slate-300">
                        Drag & Drop or Click to browse
                      </p>
                      <p className="text-xs text-slate-500">
                        Supports PNG, JPG, JPEG, WEBP or SVG
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Message */}
              {message && (
                <div className={`p-4 rounded-xl border text-xs font-bold flex items-start gap-2.5 ${
                  message.type === "success" 
                    ? "bg-emerald-950/45 border-emerald-500/20 text-emerald-300"
                    : "bg-red-950/45 border-red-500/20 text-red-300"
                }`}>
                  <span>{message.type === "success" ? "✅" : "⚠️"}</span>
                  <span className="leading-relaxed">{message.text}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={uploading || !file}
                className={`w-full py-4 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                  file && !uploading
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/20 cursor-pointer active:scale-[0.98]"
                    : "bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed"
                }`}
              >
                {uploading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-slate-400 border-t-white animate-spin"></span>
                    Uploading Asset...
                  </>
                ) : (
                  <>
                    <span>🚀</span> Upload to {categories.find(c => c.id === selectedCategory)?.label}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right panel: Gallery Viewer */}
          <div className="lg:col-span-7 bg-slate-900/30 backdrop-blur-md border border-slate-800/60 rounded-3xl p-6 lg:p-8 shadow-xl flex flex-col min-h-[500px]">
            
            {/* Category tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/60 pb-6 mb-6">
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <span>🖼️</span> Live Uploaded Gallery
              </h2>
              
              <div className="flex gap-1.5 bg-slate-950/60 border border-slate-800/80 p-1 rounded-xl">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? "bg-slate-800 text-white"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {cat.icon} {cat.label.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            {loading ? (
              <div className="flex-grow flex flex-col items-center justify-center py-20 space-y-3">
                <span className="w-8 h-8 rounded-full border-4 border-slate-800 border-t-blue-500 animate-spin"></span>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Accessing files...</span>
              </div>
            ) : images[selectedCategory]?.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center py-20 border border-dashed border-slate-800/50 rounded-2xl bg-slate-950/15">
                <div className="text-5xl mb-4">📭</div>
                <h3 className="text-base font-bold text-slate-300">No images uploaded yet</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                  Use the uploader on the left to add high-fidelity pictures for your {categories.find(c => c.id === selectedCategory)?.label.toLowerCase()}!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images[selectedCategory]?.map((url, idx) => (
                  <div 
                    key={idx} 
                    className="group relative aspect-video bg-slate-950 rounded-xl border border-slate-800/80 overflow-hidden shadow-md hover:border-blue-500/50 transition-all duration-300"
                  >
                    <img 
                      src={url} 
                      alt={`Uploaded asset ${idx}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Hover controls overlay */}
                    <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 space-y-2">
                      <div className="text-[10px] text-slate-400 font-semibold truncate leading-none">
                        {url.split("/").pop()}
                      </div>
                      
                      <button
                        onClick={() => copyToClipboard(url)}
                        className="w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[9px] uppercase tracking-wider transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
                      >
                        {copiedUrl === url ? (
                          <><span>✓</span> Copied!</>
                        ) : (
                          <><span>🔗</span> Copy URL</>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick tips panel */}
            <div className="mt-auto pt-6 border-t border-slate-800/50 text-[11px] text-slate-500 leading-normal flex items-start gap-2.5">
              <span className="text-amber-500 mt-0.5">💡</span>
              <p>
                **Tip for Jimmy**: After uploading a product picture, click **"Copy URL"** on the photo hover overlay. You can directly paste this URL (e.g. `/uploads/products/...`) as the image source when adding or setting up new laptops!
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
