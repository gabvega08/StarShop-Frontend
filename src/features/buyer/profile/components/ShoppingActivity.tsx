export function ShoppingActivity() {
  return (
    <div className="bg-custom-card-background rounded-lg p-6 border border-white/30 shadow-[0_0_10px_0_rgba(255,255,255,0.1)]">
      <h2 className="text-xl font-semibold text-white mb-6">
        Shopping Activity
      </h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center bg-white/5 rounded-lg p-4 mb-2">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500/20 mr-4">
            <svg
              className="w-6 h-6 text-blue-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-white font-medium">Total Orders</div>
            <div className="text-gray-400 text-xs">Currently listed</div>
          </div>
          <div className="text-2xl font-bold text-white">47</div>
        </div>
        <div className="flex items-center bg-white/5 rounded-lg p-4 mb-2">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500/20 mr-4">
            <svg
              className="w-6 h-6 text-yellow-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m0 0H3"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-white font-medium">Reviews Given</div>
            <div className="text-gray-400 text-xs">Customer feedback</div>
          </div>
          <div className="text-2xl font-bold text-white">32</div>
        </div>
        <div className="flex items-center bg-white/5 rounded-lg p-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500/20 mr-4">
            <svg
              className="w-6 h-6 text-red-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-white font-medium">Wishlist Items</div>
            <div className="text-gray-400 text-xs">Saved for later</div>
          </div>
          <div className="text-2xl font-bold text-white">15</div>
        </div>
      </div>
    </div>
  );
}
