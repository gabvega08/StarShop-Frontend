export function DeliveryCalendar() {
  return (
    <div className="bg-custom-card-background rounded-lg p-6 border border-white/30 shadow-[0_0_10px_0_rgba(255,255,255,0.1)]">
      <h2 className="text-xl font-semibold text-white mb-6">
        Delivery Calendar
      </h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg p-4 bg-white/5">
          <div className="flex items-center gap-x-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-500/20">
              <svg
                className="w-6 h-6 text-purple-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <div className="text-white font-medium">Package Arriving</div>
              <div className="text-gray-400 text-sm">March 15, 2024</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg p-4 bg-white/5">
          <div className="flex items-center gap-x-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500/20">
              <svg
                className="w-6 h-6 text-green-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <div className="text-white font-medium">Expected Delivery</div>
              <div className="text-gray-400 text-sm">March 18, 2024</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
