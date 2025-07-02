import { Input } from '@/shared/components/ui/Input';
import { Search } from 'lucide-react';
export default function FAQSearchInput() {
  return (
    <div className="flex items-center border border-sidebarBorder rounded-md py-1 px-3">
      <Search className="text-sidebarText" />
      <Input
        placeholder="Search for answers..."
        className="bg-transparent !focus:ring-0 !focus:outline-none !outline-none !ring-0 border-none text-white text-md"
      />
    </div>
  );
}
