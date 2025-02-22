export function StoreCategories() {
  const categories = [
    "Streetwear",
    "Urban Fashion",
    "Accessories",
    "Footwear",
    "Limited Editions",
    "Sustainable",
  ];
  const colors = [
    "bg-red-500/20 text-red-400",
    "bg-blue-500/20 text-blue-400",
    "bg-green-500/20 text-green-400",
    "bg-yellow-500/20 text-yellow-400",
    "bg-pink-500/20 text-pink-400",
    "bg-indigo-500/20 text-indigo-400",
  ];

  return (
    <div className="rounded-lg border border-white/50 bg-[#0F0E1D] p-6 shadow-[0_0_8px_rgba(255,255,255,0.2)]">
      <h2 className="text-lg font-semibold mb-4">Store Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={i}
            className={`px-3 py-1 rounded-full text-sm ${
              colors[i % colors.length]
            }`}
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
}
