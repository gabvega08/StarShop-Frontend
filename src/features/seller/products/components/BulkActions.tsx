'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

export function BulkActions() {
  const [priceType, setPriceType] = useState('percentage');
  const [priceValue, setPriceValue] = useState('10');
  const [status, setStatus] = useState('active');

  const handlePriceUpdate = () => {
    console.log(
      `Updating price by ${priceValue}${priceType === 'percentage' ? '%' : ''}`
    );
    // Add your price update logic here
  };

  const handleStatusUpdate = () => {
    console.log(`Updating status to ${status}`);
    // Add your status update logic here
  };

  const handleBulkDelete = () => {
    console.log('Deleting selected items');
    // Add your bulk delete logic here
  };

  return (
    <Card className="w-full bg-[#13111E]/5   border-slate-800">
      <CardHeader>
        <CardTitle className="text-white text-xl font-semibold">
          Bulk Actions
        </CardTitle>
        <CardDescription className="text-slate-400">
          Manage multiple products at once
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Update Price Section */}
          <div className="space-y-3">
            <h3 className="text-white font-medium">Update Price</h3>
            <div className="flex gap-2 items-stretch">
              <Select value={priceType} onValueChange={setPriceType}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="percentage" className="text-white">
                    Percentage
                  </SelectItem>
                  <SelectItem value="fixed" className="text-white">
                    Fixed Amount
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className="flex">
                <Input
                  type="number"
                  value={priceValue}
                  onChange={e => setPriceValue(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white w-20 rounded-r-none border-r-0"
                  placeholder="10"
                />
                <Button
                  onClick={handlePriceUpdate}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-5 rounded-l-none"
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>

          {/* Update Status Section */}
          <div className="space-y-3">
            <h3 className="text-white font-medium">Update Status</h3>
            <div className="flex gap-2">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="active" className="text-white">
                    Active
                  </SelectItem>
                  <SelectItem value="inactive" className="text-white">
                    Inactive
                  </SelectItem>
                  <SelectItem value="draft" className="text-white">
                    Draft
                  </SelectItem>
                  <SelectItem value="archived" className="text-white">
                    Archived
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleStatusUpdate}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6"
              >
                Apply
              </Button>
            </div>
          </div>

          {/* Bulk Delete Section */}
          <div className="space-y-3">
            <h3 className="text-white font-medium">Bulk Delete</h3>
            <Button
              onClick={handleBulkDelete}
              variant="outline"
              className="w-full bg-transparent border-slate-700 text-white hover:bg-slate-800 hover:text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Selected
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
