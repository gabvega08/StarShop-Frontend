"use client"

const Tabs = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
    const tabItems = ["Overview", "Sales", "Traffic", "Products", "Customers"]
  
    return (
      <div className="flex justify-between items-center mb-6 mt-10">
        <div className="flex space-x-2">
          {tabItems.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === tab ? "bg-purple-600 text-white" : "text-gray-400 hover:text-gray-300"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="text-sm text-gray-400">Last 30 days</div>
      </div>
    )
  }

export default Tabs;