import React from 'react';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { categories } from '../constants/profile-constants';

const StoreCategories = () => {
  return (
    <div>
      {' '}
      <Card className="bg-custom-card-background shadow-[0_0_8px_rgba(255,255,255,0.1)] border-slate-700">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-white mb-5">
            Store Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <Badge
                key={index}
                variant="outline"
                className={`px-3 py-1 text-sm rounded-2xl font-medium border ${category.color}`}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoreCategories;
