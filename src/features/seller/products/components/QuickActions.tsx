import { Plus, Tag, Percent, Truck, Settings } from 'lucide-react';

const quickActions = [
  {
    icon: Plus,
    title: 'Add New Product',
    description: 'Create a new product listing',
  },
  {
    icon: Tag,
    title: 'Manage Categories',
    description: 'Organize product categories',
  },
  {
    icon: Percent,
    title: 'Create Discount',
    description: 'Set up promotional offers',
  },
  {
    icon: Truck,
    title: 'Update Shipping Options',
    description: 'Modify delivery settings',
  },
  {
    icon: Settings,
    title: 'Product Settings',
    description: 'Configure product options',
  },
];

export function QuickActions() {
  return (
    <div className="bg-[#13111E]/5 rounded-lg p-6 border border-gray-800">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-white">Quick Actions</h3>
        <p className="text-sm text-gray-400">Common product tasks</p>
      </div>

      <div className="space-y-3">
        {quickActions.map(action => {
          const IconComponent = action.icon;
          return (
            <button
              key={action.title}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#9333EA33] transition-colors text-left border border-gray-700"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-gray-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white">
                  {action.title}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {action.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
