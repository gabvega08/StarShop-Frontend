import { StoreAchievements } from "@/components/features/seller/store-profile/StoreAchievements";
import { StoreCategories } from "@/components/features/seller/store-profile/StoreCategories";
import { StoreHeader } from "@/components/features/seller/store-profile/StoreHeader";
import { StoreStats } from "@/components/features/seller/store-profile/StoreStats";

export default function StoreProfilePage() {
  return (
    <div className="min-h-screen text-white">
      <main className="container mx-auto px-4 py-8 bg-stars">
        <div className="max-w-4xl mx-auto space-y-8">
          <StoreHeader />
          <StoreStats />
          <StoreCategories />
          <StoreAchievements />
        </div>
      </main>
    </div>
  );
}
