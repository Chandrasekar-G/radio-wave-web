'use client';

import { Sidebar } from '@/components/sidebar/sidebar';
import { Player } from '@/components/player/player';
import { useRadioStore } from '@/lib/store/radio-store';
import { useEffect } from 'react';
import { useUserLocation } from '@/lib/hooks/use-user-location';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { setCountry } = useRadioStore();
  const { country } = useUserLocation();

  // Set user's country in store when available
  useEffect(() => {
    if (country) {
      setCountry(country);
    }
  }, [country, setCountry]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar className="hidden md:block" />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
      <Player />
    </div>
  );
}