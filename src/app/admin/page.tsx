"use client";

import { useState, useEffect, useRef } from "react";

type GalleryImages = Record<string, string[]>;

type Product = {
  id: string;
  brand: string;
  model: string;
  processor?: string | null;
  ram?: string | null;
  storage?: string | null;
  display?: string | null;
  graphics?: string | null;
  features?: string | null;
  originalPrice?: number | null;
  promoPrice: number;
  quantity: number;
  imageUrl?: string | null;
  isNew: boolean;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"products" | "media">("products");
  
  // Media Tab State
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
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Product Tab State
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    processor: "",
    ram: "",
    storage: "",
    display: "",
    graphics: "",
    features: "",
    originalPrice: "",
    promoPrice: "",
    quantity: "1",
    imageUrl: "",
    isNew: false
  });

  // Global Status Messages
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [loadingMedia, setLoadingMedia] = useState(true);

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
      setLoadingMedia(false);
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        // Fallback to empty if DB has connection errors
        setProducts([]);
      }
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchImages();
    fetchProducts();
  }, []);

  // Media Handlers
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

    const data = new FormData();
    data.append("file", file);
    data.append("category", selectedCategory);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data
      });
      const resData = await res.json();

      if (resData.success) {
        setMessage({ text: `Successfully uploaded image to ${selectedCategory}!`, type: "success" });
        setFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        
        // Refresh the image library
        fetchImages();
      } else {
        setMessage({ text: resData.error || "Failed to upload file.", type: "error" });
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

  // Product CRUD Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const payload = {
      ...formData,
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      promoPrice: parseFloat(formData.promoPrice),
      quantity: parseInt(formData.quantity)
    };

    try {
      const isEditing = !!editingProduct;
      const url = "/api/products";
      const method = isEditing ? "PUT" : "POST";
      const body = isEditing ? { ...payload, id: editingProduct.id } : payload;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await res.json();

      if (data.success) {
        setMessage({ 
          text: isEditing ? "Product updated successfully!" : "New product cataloged successfully!", 
          type: "success" 
        });
        resetForm();
        fetchProducts();
      } else {
        setMessage({ text: data.error || "Operation failed.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "An error occurred connecting to database.", type: "error" });
    }
  };

  const handleEditInit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      brand: product.brand,
      model: product.model,
      processor: product.processor || "",
      ram: product.ram || "",
      storage: product.storage || "",
      display: product.display || "",
      graphics: product.graphics || "",
      features: product.features || "",
      originalPrice: product.originalPrice ? product.originalPrice.toString() : "",
      promoPrice: product.promoPrice.toString(),
      quantity: product.quantity.toString(),
      imageUrl: product.imageUrl || "",
      isNew: product.isNew
    });
    setShowAddForm(true);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you absolutely sure you want to delete this laptop from the catalogue?")) return;
    setMessage(null);

    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: "DELETE"
      });
      const data = await res.json();

      if (data.success) {
        setMessage({ text: "Laptop removed from database successfully.", type: "success" });
        fetchProducts();
      } else {
        setMessage({ text: data.error || "Failed to delete.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Error connecting to server.", type: "error" });
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setShowAddForm(false);
    setFormData({
      brand: "",
      model: "",
      processor: "",
      ram: "",
      storage: "",
      display: "",
      graphics: "",
      features: "",
      originalPrice: "",
      promoPrice: "",
      quantity: "1",
      imageUrl: "",
      isNew: false
    });
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
        
        {/* Banner Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-3xl pointer-events-none"></div>
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-950/45 border border-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              👑 Laptech Control Room
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              LAPTECH <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">ADMIN PORTAL</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Welcome, Jimmy. Easily manage your live laptop catalog database and organize marketing media assets.
            </p>
          </div>
          
          {/* Quick stats grid */}
          <div className="flex gap-4">
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl px-5 py-3 text-center">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">CATALOG SIZE</div>
              <div className="text-2xl font-black text-blue-400 mt-1">{products.length}</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl px-5 py-3 text-center">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">MEDIA ASSETS</div>
              <div className="text-2xl font-black text-amber-400 mt-1">{totalFiles}</div>
            </div>
          </div>
        </div>

        {/* Global tab navigation */}
        <div className="flex border-b border-slate-800/60 pb-1 gap-2">
          <button
            onClick={() => { setActiveTab("products"); setMessage(null); }}
            className={`px-6 py-3 font-bold text-xs tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
              activeTab === "products"
                ? "border-blue-500 text-white"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            📦 Laptop Catalog Manager
          </button>
          <button
            onClick={() => { setActiveTab("media"); setMessage(null); }}
            className={`px-6 py-3 font-bold text-xs tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
              activeTab === "media"
                ? "border-amber-500 text-white"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            🖼️ Media Asset uploader
          </button>
        </div>

        {/* Global Notification */}
        {message && (
          <div className={`p-4 rounded-2xl border text-xs font-bold flex items-start gap-2.5 max-w-3xl mx-auto shadow-lg ${
            message.type === "success" 
              ? "bg-emerald-950/45 border-emerald-500/20 text-emerald-300"
              : "bg-red-950/45 border-red-500/20 text-red-300"
          }`}>
            <span>{message.type === "success" ? "✅" : "⚠️"}</span>
            <span className="leading-relaxed">{message.text}</span>
          </div>
        )}

        {/* -------------------- TAB 1: PRODUCT CATALOG MANAGER -------------------- */}
        {activeTab === "products" && (
          <div className="space-y-8">
            
            {/* Header with trigger button */}
            <div className="flex justify-between items-center bg-slate-900/10 border border-slate-800/40 p-5 rounded-2xl">
              <div>
                <h2 className="text-xl font-extrabold text-white">Live Laptop Catalog</h2>
                <p className="text-xs text-slate-500">Add, configure spec sheets, or update prices instantly.</p>
              </div>
              {!showAddForm ? (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md active:scale-95"
                >
                  ＋ Add Laptop Deal
                </button>
              ) : (
                <button
                  onClick={resetForm}
                  className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95"
                >
                  Cancel
                </button>
              )}
            </div>

            {/* Laptop Creation/Edition Form */}
            {showAddForm && (
              <div className="bg-slate-900/30 backdrop-blur-md border border-slate-800/60 rounded-3xl p-6 lg:p-8 shadow-xl max-w-4xl mx-auto">
                <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800/60 pb-3 flex items-center gap-2">
                  <span>{editingProduct ? "✏️ Edit Laptop Details" : "📦 Catalog New Laptop Deal"}</span>
                </h3>

                <form onSubmit={handleProductSubmit} className="space-y-6">
                  {/* Row 1: Brand & Model */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Brand *</label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. Dell, Lenovo, Apple, ASUS"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Model Name *</label>
                      <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. ThinkPad T14 Gen 2"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 2: Processor & RAM */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Processor / CPU</label>
                      <input
                        type="text"
                        name="processor"
                        value={formData.processor}
                        onChange={handleInputChange}
                        placeholder="e.g. Intel Core i7-1185G7 @3.00GHz"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">RAM Capacity</label>
                      <input
                        type="text"
                        name="ram"
                        value={formData.ram}
                        onChange={handleInputChange}
                        placeholder="e.g. 16GB DDR4 RAM"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 3: Storage & Display */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Storage / SSD</label>
                      <input
                        type="text"
                        name="storage"
                        value={formData.storage}
                        onChange={handleInputChange}
                        placeholder="e.g. 512GB M.2 NVMe SSD"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Display Size & Resolution</label>
                      <input
                        type="text"
                        name="display"
                        value={formData.display}
                        onChange={handleInputChange}
                        placeholder="e.g. 15.6 inch FHD IPS Screen"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 4: Graphics & Special Features */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Graphics Card / GPU</label>
                      <input
                        type="text"
                        name="graphics"
                        value={formData.graphics}
                        onChange={handleInputChange}
                        placeholder="e.g. NVIDIA T500 2GB GPU"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Key Selling Point (Features)</label>
                      <input
                        type="text"
                        name="features"
                        value={formData.features}
                        onChange={handleInputChange}
                        placeholder="e.g. Backlit Keyboard, LTE connectivity, Touch Bar"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 5: Prices & Stock */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Original Price (Rands)</label>
                      <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                        placeholder="e.g. 9500 (Optional)"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Promo/Deal Price (Rands) *</label>
                      <input
                        type="number"
                        name="promoPrice"
                        value={formData.promoPrice}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. 7500"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Quantity Available *</label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        required
                        min="0"
                        placeholder="e.g. 3"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 6: Image URL & Badge Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Image Link / Sourced URL</label>
                      <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        placeholder="Paste URL copied from uploader (e.g. /uploads/products/...)"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                      <input
                        type="checkbox"
                        id="isNew"
                        name="isNew"
                        checked={formData.isNew}
                        onChange={handleCheckboxChange}
                        className="w-5 h-5 bg-slate-950 border border-slate-800 rounded-md cursor-pointer accent-blue-500"
                      />
                      <label htmlFor="isNew" className="text-sm font-bold text-slate-300 cursor-pointer">
                        Mark product with a shiny <span className="text-blue-400 uppercase font-black text-xs">"NEW"</span> banner badge
                      </label>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl cursor-pointer transition-all active:scale-95 shadow-md flex-grow"
                    >
                      {editingProduct ? "Save Updates" : "Publish Laptop to Catalog"}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-transparent hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-xl cursor-pointer transition-all"
                    >
                      Discard
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List Table of Laptops */}
            <div className="bg-slate-900/30 border border-slate-800/60 rounded-3xl overflow-hidden shadow-xl">
              {loadingProducts ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-3">
                  <span className="w-8 h-8 rounded-full border-4 border-slate-800 border-t-blue-500 animate-spin"></span>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Querying MySQL Products...</span>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-20 bg-slate-950/15">
                  <div className="text-5xl mb-4">💻</div>
                  <h3 className="text-base font-bold text-slate-300">Catalog is currently empty</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                    Start adding laptops to your catalog! They will instantly show up in the Deals section of your home page.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950/60 border-b border-slate-850/80 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        <th className="p-5">Laptop</th>
                        <th className="p-5">Specs Summary</th>
                        <th className="p-5 text-right">Price</th>
                        <th className="p-5 text-center">Stock</th>
                        <th className="p-5 text-center">Status</th>
                        <th className="p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850/40 text-sm">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-900/20 transition-all group">
                          {/* Brand & Model */}
                          <td className="p-5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center text-xs font-bold text-slate-400">
                                {product.imageUrl ? (
                                  <img src={product.imageUrl} alt={product.model} className="w-full h-full object-cover" />
                                ) : (
                                  <span>💻</span>
                                )}
                              </div>
                              <div>
                                <div className="font-extrabold text-white text-sm leading-tight group-hover:text-blue-400 transition-colors">
                                  {product.brand} {product.model}
                                </div>
                                <div className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-wider font-semibold">
                                  ID: {product.id.substring(0, 8)}...
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* CPU & Memory */}
                          <td className="p-5">
                            <div className="space-y-0.5 text-xs text-slate-350">
                              <div className="truncate max-w-[250px]"><span className="text-[9px] font-bold text-slate-500 bg-slate-950 px-1 py-0.2 rounded mr-1">CPU</span> {product.processor || "N/A"}</div>
                              <div>
                                <span className="text-[9px] font-bold text-slate-500 bg-slate-950 px-1 py-0.2 rounded mr-1">RAM</span> {product.ram || "N/A"} | 
                                <span className="text-[9px] font-bold text-slate-500 bg-slate-950 px-1 py-0.2 rounded mx-1">SSD</span> {product.storage || "N/A"}
                              </div>
                            </div>
                          </td>

                          {/* Prices */}
                          <td className="p-5 text-right font-semibold text-white">
                            {product.originalPrice && (
                              <div className="text-[10px] text-slate-500 line-through">
                                R{product.originalPrice.toLocaleString()}
                              </div>
                            )}
                            <div className="text-amber-400 font-extrabold">
                              R{product.promoPrice.toLocaleString()}
                            </div>
                          </td>

                          {/* Stock Quantity */}
                          <td className="p-5 text-center">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                              product.quantity > 0 ? "text-emerald-400 bg-emerald-950/20" : "text-red-400 bg-red-950/20"
                            }`}>
                              {product.quantity}
                            </span>
                          </td>

                          {/* Banner badge */}
                          <td className="p-5 text-center">
                            {product.isNew ? (
                              <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                                NEW
                              </span>
                            ) : (
                              <span className="text-[10px] text-slate-600 font-semibold uppercase">
                                Deals
                              </span>
                            )}
                          </td>

                          {/* Edit / Delete actions */}
                          <td className="p-5 text-right">
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => handleEditInit(product)}
                                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/60 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="px-3 py-1.5 rounded-lg bg-transparent border border-red-900/35 hover:border-red-500/50 hover:bg-red-950/10 text-red-500 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

        {/* -------------------- TAB 2: MEDIA ASSET UPLOADER -------------------- */}
        {activeTab === "media" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Panel: File Uploader */}
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={uploading || !file}
                  className={`w-full py-4 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                    file && !uploading
                      ? "bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/20 cursor-pointer active:scale-[0.98]"
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

            {/* Right Panel: Gallery Viewer */}
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
              {loadingMedia ? (
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
                  **Tip for Jimmy**: After uploading a product picture, click **"Copy URL"** on the photo hover overlay. You can directly paste this URL (e.g. `/uploads/products/...`) as the **Image Link / Sourced URL** in your **Laptop Catalog Manager** tab when adding new stock!
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
