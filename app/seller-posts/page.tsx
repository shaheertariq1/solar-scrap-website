"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Bell,
  Sun,
  Menu,
  X,
  MoreVertical,
  Eye,
  Edit3,
  DollarSign,
  Gavel,
  Trash2,
  MapPin,
  Mail,
  Phone,
  Building2,
  Calendar,
  CheckCircle2,
  Tag,
  Clock,
  Sparkles,
  Layers,
  Weight,
  Check,
  AlertTriangle,
} from "lucide-react";

interface SellerPost {
  id: string;
  postId: string;
  title: string;
  category: "Solar Panels" | "Inverters" | "Batteries" | "Transformers" | "Cables";
  categoryColor: string;
  qty: number;
  status: "Under Review" | "Price Approved" | "Live / Auction" | "Rejected" | "Archived";
  priceExpected: number;
  offeredPrice?: number;
  submittedDate: string;
  sellerName: string;
  sellerCompany: string;
  sellerEmail: string;
  sellerPhone: string;
  city: string;
  area: string;
  address: string;
  brandModel: string;
  estimatedWeight: string;
  condition: string;
  disassemblyState: string;
  images: string[];
}

const initialPosts: SellerPost[] = [
  {
    id: "1",
    postId: "#SP001",
    title: "500x Solar Panels 400W",
    category: "Solar Panels",
    categoryColor: "bg-amber-400",
    qty: 500,
    status: "Under Review",
    priceExpected: 4500000,
    offeredPrice: 4200000,
    submittedDate: "2024-12-04",
    sellerName: "Raza Ahmed",
    sellerCompany: "SolarTec Pvt Ltd",
    sellerEmail: "raza@solartec.pk",
    sellerPhone: "+92 300 1234567",
    city: "Karachi",
    area: "SITE Area",
    address: "Plot 45, Industrial Zone, SITE Area Karachi",
    brandModel: "Longi Solar 400W Monocrystalline",
    estimatedWeight: "10,000 kg",
    condition: "Used / Scrapped (80% intact)",
    disassemblyState: "Ready for pickup / packed",
    images: [
      "/images/sign-in-img.jpg",
      "/images/otp-screen-img.jpg",
      "/images/reset-password-img.jpg",
    ],
  },
  {
    id: "2",
    postId: "#SP002",
    title: "Industrial Inverters (10 units)",
    category: "Inverters",
    categoryColor: "bg-blue-500",
    qty: 10,
    status: "Price Approved",
    priceExpected: 850000,
    offeredPrice: 800000,
    submittedDate: "2024-12-05",
    sellerName: "Nadia Iqbal",
    sellerCompany: "Sun Energy Co.",
    sellerEmail: "nadia@sunenergy.pk",
    sellerPhone: "+92 321 5551234",
    city: "Lahore",
    area: "Gulberg III",
    address: "Industrial Complex, Gulberg III Lahore",
    brandModel: "Huawei SUN2000 50KTL",
    estimatedWeight: "550 kg",
    condition: "Functional Scrap / Partial Fault",
    disassemblyState: "Dismantled and stored",
    images: [
      "/images/verify-email-screen.jpg",
      "/images/sign-in-img.jpg",
      "/images/otp-screen-img.jpg",
    ],
  },
  {
    id: "3",
    postId: "#SP003",
    title: "Lithium Battery Bank 48V",
    category: "Batteries",
    categoryColor: "bg-purple-500",
    qty: 25,
    status: "Live / Auction",
    priceExpected: 1200000,
    offeredPrice: 1150000,
    submittedDate: "2024-12-02",
    sellerName: "Sana Malik",
    sellerCompany: "Voltex Systems",
    sellerEmail: "sana@voltex.pk",
    sellerPhone: "+92 345 2223333",
    city: "Islamabad",
    area: "I-9 Industrial",
    address: "Street 4, Sector I-9/2 Islamabad",
    brandModel: "Pylontech US3000C",
    estimatedWeight: "800 kg",
    condition: "Used / Second Life Potential",
    disassemblyState: "Disconnected in warehouse",
    images: [
      "/images/otp-screen-img.jpg",
      "/images/reset-password-img.jpg",
      "/images/verify-email-screen.jpg",
    ],
  },
];

export default function SellerPostsPage() {
  const [posts, setPosts] = useState<SellerPost[]>(initialPosts);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [topSearch, setTopSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active Menu ID
  const [actionMenuOpenId, setActionMenuOpenId] = useState<string | null>(null);

  // Modals state
  const [selectedPost, setSelectedPost] = useState<SellerPost | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSetPriceOpen, setIsSetPriceOpen] = useState(false);
  const [isAuctionOpen, setIsAuctionOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Forms edit state
  const [editFormData, setEditFormData] = useState<Partial<SellerPost>>({});
  const [offeredPriceInput, setOfferedPriceInput] = useState<number>(0);
  const [adminNotes, setAdminNotes] = useState("");
  const [auctionStartBid, setAuctionStartBid] = useState<number>(0);
  const [auctionDuration, setAuctionDuration] = useState("3 Days");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const navItems = [
    { name: "Dashboard", icon: "/icons/dashboard.svg", href: "/dashboard" },
    { name: "Sellers / EPC", icon: "/icons/seller.svg", href: "/sellers" },
    { name: "Scrap Dealers", icon: "/icons/scrap-dealer.svg", href: "/scrap-dealers" },
    { name: "Seller Posts", icon: "/icons/seller-post.svg", href: "/seller-posts" },
    { name: "Auctions", icon: "/icons/auction.svg", href: "/auctions" },
    { name: "Bids", icon: "/icons/bids.svg", href: "/bids" },
    { name: "Facebook Leads", icon: "/icons/facebook-leads.svg", href: "/facebook-leads" },
    { name: "Notifications", icon: "/icons/notifications.svg", href: "/notifications" },
    { name: "Settings", icon: "/icons/setting.svg", href: "/settings" },
  ];

  const filterTabs = [
    { name: "All", count: posts.length },
    { name: "Under Review", count: posts.filter((p) => p.status === "Under Review").length },
    { name: "Price Approved", count: posts.filter((p) => p.status === "Price Approved").length },
    { name: "Live / Auction", count: posts.filter((p) => p.status === "Live / Auction").length },
    { name: "Rejected", count: posts.filter((p) => p.status === "Rejected").length },
    { name: "Archived", count: posts.filter((p) => p.status === "Archived").length },
  ];

  // Filtering
  const filteredPosts = posts.filter((p) => {
    if (activeFilter !== "All" && p.status !== activeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        p.title.toLowerCase().includes(q) ||
        p.sellerName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.postId.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Modal Handlers
  const handleOpenDetails = (post: SellerPost) => {
    setSelectedPost(post);
    setIsDetailsOpen(true);
    setActionMenuOpenId(null);
  };

  const handleOpenEdit = (post: SellerPost) => {
    setSelectedPost(post);
    setEditFormData({ ...post });
    setIsEditOpen(true);
    setActionMenuOpenId(null);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost) return;
    setPosts((prev) =>
      prev.map((p) => (p.id === selectedPost.id ? ({ ...p, ...editFormData } as SellerPost) : p))
    );
    setIsEditOpen(false);
    showToast("Post updated successfully!");
  };

  const handleOpenSetPrice = (post: SellerPost) => {
    setSelectedPost(post);
    setOfferedPriceInput(post.offeredPrice || post.priceExpected);
    setIsSetPriceOpen(true);
    setActionMenuOpenId(null);
  };

  const handleSaveSetPrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === selectedPost.id
          ? { ...p, offeredPrice: offeredPriceInput, status: "Price Approved" }
          : p
      )
    );
    setIsSetPriceOpen(false);
    showToast(`Price set to PKR ${offeredPriceInput.toLocaleString()} and approved!`);
  };

  const handleOpenAuction = (post: SellerPost) => {
    setSelectedPost(post);
    setAuctionStartBid(post.offeredPrice ? Math.round(post.offeredPrice * 0.9) : 4000000);
    setIsAuctionOpen(true);
    setActionMenuOpenId(null);
  };

  const handleSaveAuction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost) return;
    setPosts((prev) =>
      prev.map((p) => (p.id === selectedPost.id ? { ...p, status: "Live / Auction" } : p))
    );
    setIsAuctionOpen(false);
    showToast(`Auction published for ${selectedPost.title}!`);
  };

  const handleOpenDelete = (post: SellerPost) => {
    setSelectedPost(post);
    setIsDeleteOpen(true);
    setActionMenuOpenId(null);
  };

  const handleConfirmDelete = () => {
    if (!selectedPost) return;
    setPosts((prev) => prev.filter((p) => p.id !== selectedPost.id));
    setIsDeleteOpen(false);
    showToast("Post removed permanently.");
  };

  return (
    <div className="min-h-screen w-full bg-[#EBECEF] p-2 sm:p-3 md:p-4 flex items-center justify-center">
      {/* Outer Card Frame */}
      <div className="w-full bg-[#111827] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl border border-gray-200/50 flex flex-col lg:flex-row min-h-[calc(100vh-16px)] sm:min-h-[calc(100vh-24px)] md:min-h-[calc(100vh-32px)] relative">
        {/* ===================== SIDEBAR ===================== */}
        <aside className="w-full lg:w-[240px] xl:w-[250px] bg-[#111827] text-white flex flex-col justify-between p-4 lg:p-5 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-800">
          <div>
            {/* Brand Logo */}
            <div className="flex items-center justify-between lg:justify-start gap-3 pb-6 border-b border-gray-800/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#009639] flex items-center justify-center text-white shadow-md shadow-[#009639]/30">
                  <Sun className="w-6 h-6 animate-spin-slow" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight leading-none">
                    Solar Scrap
                  </h2>
                  <p className="text-[11px] text-gray-400 mt-1 leading-none font-medium">
                    Seller Portal
                  </p>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Navigation */}
            <nav className={`mt-5 space-y-1.5 ${mobileMenuOpen ? "block" : "hidden lg:block"}`}>
              {navItems.map((item) => {
                const isActive = item.name === "Seller Posts";
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 text-left ${
                      isActive
                        ? "bg-[#009639] text-white shadow-md shadow-[#009639]/30"
                        : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/70"
                    }`}
                  >
                    <span className="w-5 h-5 flex items-center justify-center shrink-0">
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={18}
                        height={18}
                        className={`w-4.5 h-4.5 object-contain ${
                          isActive ? "brightness-0 invert" : "opacity-60"
                        }`}
                      />
                    </span>
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Logout */}
          <div className={`pt-6 mt-6 border-t border-gray-800/80 ${mobileMenuOpen ? "block" : "hidden lg:block"}`}>
            <Link
              href="/"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-white hover:text-red-400 hover:bg-red-950/20 transition-colors group"
            >
              <Image
                src="/icons/logout-button.svg"
                alt="Logout"
                width={18}
                height={18}
                className="w-4.5 h-4.5 object-contain opacity-80 group-hover:opacity-100"
              />
              <span>Logout</span>
            </Link>
          </div>
        </aside>

        {/* ===================== MAIN CONTENT AREA ===================== */}
        <div className="flex-1 bg-[#f8fafc] flex flex-col min-w-0">
          
          {/* Top Navbar */}
          <header className="bg-white border-b border-gray-200/80 px-5 sm:px-8 py-3.5 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-[420px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={topSearch}
                onChange={(e) => setTopSearch(e.target.value)}
                placeholder="Search users, posts, auctions, bids..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-gray-50/70 border border-gray-200/80 rounded-xl outline-none focus:bg-white focus:border-[#009639] focus:ring-2 focus:ring-[#009639]/15 transition-all text-gray-800 placeholder:text-gray-400"
              />
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <button
                type="button"
                className="relative p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              </button>

              <div className="flex items-center gap-3 pl-2 sm:border-l border-gray-200">
                <span className="hidden sm:inline-block text-xs font-semibold text-gray-800">
                  Admin Platform
                </span>
                <div className="relative w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full overflow-hidden ring-2 ring-gray-100 shadow-sm">
                  <Image
                    src="/images/admin.png"
                    alt="Admin Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </header>

          {/* Main Body */}
          <main className="flex-1 p-5 sm:p-7 md:p-8 space-y-6 overflow-y-auto">
            
            {/* Header Title */}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Seller Posts
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Approve, edit, manage and convert seller scrap posts into live auctions.
              </p>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              
              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {filterTabs.map((tab) => {
                  const isActive = activeFilter === tab.name;
                  return (
                    <button
                      key={tab.name}
                      type="button"
                      onClick={() => setActiveFilter(tab.name)}
                      className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                        isActive
                          ? "bg-[#009639] text-white shadow-sm"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                      }`}
                    >
                      <span>{tab.name}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Table Search Input */}
              <div className="relative w-full sm:w-[260px]">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, seller, category..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-xl outline-none focus:border-[#009639] focus:ring-1 focus:ring-[#009639]/20 text-gray-800 placeholder:text-gray-400"
                />
              </div>

            </div>

            {/* Seller Posts Data Table */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                      <th className="py-3 px-4 sm:px-5">POST ID</th>
                      <th className="py-3 px-4">TITLE</th>
                      <th className="py-3 px-4">CATEGORY</th>
                      <th className="py-3 px-4">QTY</th>
                      <th className="py-3 px-4">STATUS</th>
                      <th className="py-3 px-4">PRICE EXPECTED</th>
                      <th className="py-3 px-4">SUBMITTED</th>
                      <th className="py-3 px-4 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs">
                    {filteredPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50/70 transition-colors">
                        {/* Post ID */}
                        <td className="py-3.5 px-4 sm:px-5 font-mono text-[11px] font-bold text-gray-700 whitespace-nowrap">
                          {post.postId}
                        </td>

                        {/* Title & Seller */}
                        <td className="py-3.5 px-4 font-semibold text-gray-900 whitespace-nowrap">
                          <div>
                            <p className="hover:text-[#009639] cursor-pointer" onClick={() => handleOpenDetails(post)}>
                              {post.title}
                            </p>
                            <p className="text-[10px] text-gray-400 font-normal">
                              by {post.sellerName} ({post.sellerCompany})
                            </p>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${post.categoryColor}`} />
                            <span className="text-gray-700 font-medium">{post.category}</span>
                          </div>
                        </td>

                        {/* Qty */}
                        <td className="py-3.5 px-4 font-bold text-gray-900 whitespace-nowrap">
                          {post.qty}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                              post.status === "Price Approved"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : post.status === "Under Review"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : post.status === "Live / Auction"
                                ? "bg-sky-50 text-sky-700 border border-sky-200"
                                : "bg-gray-50 text-gray-700 border border-gray-200"
                            }`}
                          >
                            {post.status}
                          </span>
                        </td>

                        {/* Price Expected */}
                        <td className="py-3.5 px-4 font-semibold text-gray-900 whitespace-nowrap">
                          PKR {post.priceExpected.toLocaleString()}
                        </td>

                        {/* Submitted Date */}
                        <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap font-mono text-[11px]">
                          {post.submittedDate}
                        </td>

                        {/* Actions 3-dots */}
                        <td className="py-3.5 px-4 text-right relative whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() =>
                              setActionMenuOpenId(actionMenuOpenId === post.id ? null : post.id)
                            }
                            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                            aria-label="Actions"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {/* Floating Actions Menu Dropdown */}
                          {actionMenuOpenId === post.id && (
                            <div className="absolute right-4 top-10 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-20 text-left">
                              <button
                                type="button"
                                onClick={() => handleOpenDetails(post)}
                                className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5 text-gray-500" />
                                <span>View Details</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleOpenEdit(post)}
                                className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-gray-500" />
                                <span>Edit Post</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleOpenSetPrice(post)}
                                className="w-full px-3 py-1.5 text-xs text-emerald-600 hover:bg-emerald-50 flex items-center gap-2 transition-colors cursor-pointer font-medium"
                              >
                                <DollarSign className="w-3.5 h-3.5" />
                                <span>Set Price</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleOpenAuction(post)}
                                className="w-full px-3 py-1.5 text-xs text-blue-600 hover:bg-blue-50 flex items-center gap-2 transition-colors cursor-pointer font-medium"
                              >
                                <Gavel className="w-3.5 h-3.5" />
                                <span>Convert to Auction</span>
                              </button>
                              <div className="border-t border-gray-100 my-1" />
                              <button
                                type="button"
                                onClick={() => handleOpenDelete(post)}
                                className="w-full px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete Post</span>
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}

                    {filteredPosts.length === 0 && (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-xs text-gray-400">
                          No seller posts found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>
                  Showing {filteredPosts.length} of {posts.length} posts
                </span>
                <div className="flex items-center gap-1">
                  <span className="w-6 h-6 rounded-md bg-[#009639] text-white flex items-center justify-center font-bold text-[11px]">
                    1
                  </span>
                </div>
              </div>
            </div>

          </main>

        </div>

      {/* ===================== 1. POST DETAILS MODAL ===================== */}
      {isDetailsOpen && selectedPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-[560px] w-full p-5 sm:p-6 shadow-2xl border border-gray-100 max-h-[92vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[11px] font-bold text-[#009639] uppercase tracking-wider">
                  {selectedPost.category}
                </span>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">
                  {selectedPost.title}
                </h2>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  <span>{selectedPost.city}, {selectedPost.area}</span>
                  <span>•</span>
                  <span className="font-mono">{selectedPost.postId}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsDetailsOpen(false)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Expected Price Banner */}
            <div className="mt-4 p-4 bg-emerald-50/90 rounded-2xl border border-emerald-200/80 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  PRICE EXPECTED
                </p>
                <p className="text-2xl font-black text-[#009639] leading-tight">
                  PKR {selectedPost.priceExpected.toLocaleString()}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white text-amber-500 flex items-center justify-center shadow-xs border border-emerald-100">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            {/* Photos Thumbnails */}
            <div className="mt-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                ATTACHED PHOTOS
              </p>
              <div className="grid grid-cols-3 gap-2">
                {selectedPost.images.map((img, idx) => (
                  <div key={idx} className="relative h-20 rounded-xl overflow-hidden border border-gray-200 shadow-xs">
                    <Image src={img} alt="Post image" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Specification Grid */}
            <div className="space-y-3 mt-4 text-xs">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                ITEM SPECIFICATIONS
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-[10px] text-gray-400">Category</p>
                  <p className="font-semibold text-gray-800">{selectedPost.category}</p>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-[10px] text-gray-400">Condition</p>
                  <p className="font-semibold text-gray-800">{selectedPost.condition}</p>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-[10px] text-gray-400">Brand / Model</p>
                  <p className="font-semibold text-gray-800">{selectedPost.brandModel}</p>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-[10px] text-gray-400">Est. Weight</p>
                  <p className="font-semibold text-gray-800">{selectedPost.estimatedWeight}</p>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-[10px] text-gray-400">Disassembly State</p>
                  <p className="font-semibold text-gray-800">{selectedPost.disassemblyState}</p>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-[10px] text-gray-400">Quantity</p>
                  <p className="font-semibold text-gray-800">{selectedPost.qty} Units</p>
                </div>
              </div>
            </div>

            {/* Seller Info Card */}
            <div className="mt-4 p-3 bg-gray-50 rounded-2xl border border-gray-100 text-xs">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                SELLER INFORMATION
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-bold text-gray-900">{selectedPost.sellerName}</p>
                  <p className="text-[11px] text-gray-500">{selectedPost.sellerCompany}</p>
                </div>
                <div className="text-right text-[11px] text-gray-600">
                  <p>{selectedPost.sellerEmail}</p>
                  <p className="font-mono">{selectedPost.sellerPhone}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-5 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setIsDetailsOpen(false);
                  handleOpenSetPrice(selectedPost);
                }}
                className="py-2.5 px-3 bg-[#009639] hover:bg-[#008230] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>Set Price</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsDetailsOpen(false);
                  handleOpenEdit(selectedPost);
                }}
                className="py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Post</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsDetailsOpen(false);
                  handleOpenAuction(selectedPost);
                }}
                className="py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-xl border border-blue-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Gavel className="w-3.5 h-3.5" />
                <span>Convert to Auction</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ===================== 2. EDIT SELLER POST MODAL ===================== */}
      {isEditOpen && selectedPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-[440px] w-full p-5 sm:p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">Edit Seller Post</h2>
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Post Title</label>
                <input
                  type="text"
                  value={editFormData.title || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#009639]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">City</label>
                  <input
                    type="text"
                    value={editFormData.city || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#009639]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Area</label>
                  <input
                    type="text"
                    value={editFormData.area || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, area: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#009639]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Address</label>
                <input
                  type="text"
                  value={editFormData.address || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#009639]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Brand / Model</label>
                <input
                  type="text"
                  value={editFormData.brandModel || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, brandModel: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#009639]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Quantity</label>
                  <input
                    type="number"
                    value={editFormData.qty || 0}
                    onChange={(e) => setEditFormData({ ...editFormData, qty: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#009639]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Expected Price (PKR)</label>
                  <input
                    type="number"
                    value={editFormData.priceExpected || 0}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, priceExpected: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#009639]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#009639] hover:bg-[#008230] text-white font-semibold rounded-xl shadow-xs cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ===================== 3. SET PRICE / PRICE APPROVAL MODAL ===================== */}
      {isSetPriceOpen && selectedPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-[380px] w-full p-5 sm:p-6 shadow-2xl border border-gray-100">
            
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Set Price &amp; Valuation</h3>
              <button
                type="button"
                onClick={() => setIsSetPriceOpen(false)}
                className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <form onSubmit={handleSaveSetPrice} className="space-y-3 mt-3 text-xs">
              <p className="text-gray-500">
                Post: <span className="font-semibold text-gray-800">{selectedPost.title}</span>
              </p>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Expected Price (PKR)</label>
                <input
                  type="text"
                  disabled
                  value={`PKR ${selectedPost.priceExpected.toLocaleString()}`}
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-xl text-gray-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Offered Admin Price (PKR)</label>
                <input
                  type="number"
                  value={offeredPriceInput}
                  onChange={(e) => setOfferedPriceInput(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#009639] font-bold text-gray-900"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Admin Notes (Optional)</label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="e.g. Valuation based on panel condition..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#009639] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsSetPriceOpen(false)}
                  className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#009639] hover:bg-[#008230] text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Set &amp; Approve Price
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ===================== 4. CONVERT TO AUCTION MODAL ===================== */}
      {isAuctionOpen && selectedPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-[390px] w-full p-5 sm:p-6 shadow-2xl border border-gray-100">
            
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Convert to Auction</h3>
              <button
                type="button"
                onClick={() => setIsAuctionOpen(false)}
                className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <form onSubmit={handleSaveAuction} className="space-y-3 mt-3 text-xs">
              <div className="p-2.5 bg-blue-50/70 border border-blue-100 rounded-xl text-blue-900">
                <p className="font-bold">{selectedPost.title}</p>
                <p className="text-[11px] text-blue-700">Category: {selectedPost.category} • Qty: {selectedPost.qty}</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Starting Bid (PKR)</label>
                <input
                  type="number"
                  value={auctionStartBid}
                  onChange={(e) => setAuctionStartBid(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#009639] font-bold text-gray-900"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Auction Duration</label>
                <select
                  value={auctionDuration}
                  onChange={(e) => setAuctionDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#009639] bg-white font-medium"
                >
                  <option value="24 Hours">24 Hours (1 Day)</option>
                  <option value="48 Hours">48 Hours (2 Days)</option>
                  <option value="3 Days">3 Days (72 Hours)</option>
                  <option value="5 Days">5 Days</option>
                  <option value="7 Days">7 Days (1 Week)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAuctionOpen(false)}
                  className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#009639] hover:bg-[#008230] text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Publish Auction
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ===================== 5. DELETE POST CONFIRMATION MODAL ===================== */}
      {isDeleteOpen && selectedPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-[340px] w-full p-5 shadow-2xl border border-gray-100">
            
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5 text-red-600">
                <AlertTriangle className="w-4 h-4" />
                <span>Delete Post?</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-gray-800">{selectedPost.title}</span>? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-2 mt-5">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="px-3.5 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ===================== TOAST NOTIFICATION ===================== */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 z-50 animate-slideUp">
          <Check className="w-4 h-4 text-[#009639]" />
          <span>{toastMessage}</span>
        </div>
      )}

      </div>
    </div>
  );
}
