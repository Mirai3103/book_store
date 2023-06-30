import React from 'react';
import HeroSection from './HeroSection';
import TrendingSection from './TrendingSection';
import NewBookSection from './NewBookSection';
export default function HomePage() {
  return (
    <div className="flex w-full flex-col gap-y-4 mt-8">
      <HeroSection />
      <TrendingSection />
      <NewBookSection />
      <div className="h-16"></div>
    </div>
  );
}
