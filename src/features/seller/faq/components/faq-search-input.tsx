import { Input } from '@/shared/components/ui/Input';
import { Search } from 'lucide-react';
export default function FAQSearchInput() {
  return (
    <div className="flex items-center border border-sidebarBorder rounded-md py-1 px-3">
      <Search className="text-sidebarText" />
      <Input
        placeholder="Search for answers..."
        className="bg-transparent !border-none !outline-none !ring-0 !ring-offset-0 focus:!ring-0 focus:!outline-none focus:!border-none focus-visible:!ring-0 focus-visible:!outline-none focus-visible:!border-none text-white text-md shadow-none"
      />
    </div>
  );
}
