'use client';

import { useEffect, useState } from 'react';
import { useStations } from '@/lib/hooks/use-stations';
import { StationCard } from './station-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, RefreshCw } from 'lucide-react';
import { useRadioStore } from '@/lib/store/radio-store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Station } from '@/lib/types';
import { usePathname } from 'next/navigation';

export function StationGrid() {
  const pathname = usePathname();
  const { activeFilters, favorites = [] } = useRadioStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('popularity');
  
  const showFavorites = pathname === '/favorites';
  
  const { 
    stations = [], 
    isLoading, 
    isError, 
    refetch 
  } = useStations({
    search: debouncedQuery,
    country: activeFilters.country,
    language: activeFilters.language,
    tag: activeFilters.tag,
    popularity: activeFilters.popular,
  });
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  const displayedStations = showFavorites 
    ? favorites 
    : (stations || []);
    
  const sortedStations = [...displayedStations].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return (a.name || '').localeCompare(b.name || '');
      case 'country':
        return (a.country || '').localeCompare(b.country || '');
      case 'popularity':
      default:
        return (b.clickcount || 0) - (a.clickcount || 0);
    }
  });
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      );
    }
    
    if (isError) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-card p-8 text-center">
          <p className="text-destructive">
            Failed to load radio stations. Please try again.
          </p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      );
    }
    
    if (showFavorites && sortedStations.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            You haven't added any favorites yet.
          </p>
          <p className="text-sm text-muted-foreground">
            Browse stations and click the heart icon to add them to your favorites.
          </p>
        </div>
      );
    }
    
    if (sortedStations.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            No stations found with the current filters.
          </p>
          <p className="text-sm text-muted-foreground">
            Try changing your search criteria or clearing filters.
          </p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedStations.map((station) => (
          <StationCard key={station.stationuuid} station={station} />
        ))}
      </div>
    );
  };
  
  const getTitle = () => {
    if (showFavorites) return 'Favorite Stations';
    
    if (activeFilters.country) return `Stations in ${activeFilters.country}`;
    if (activeFilters.language) return `${activeFilters.language} Stations`;
    if (activeFilters.tag) return `${activeFilters.tag} Stations`;
    
    switch (activeFilters.popular) {
      case 'clickcount':
        return 'Most Popular Stations';
      case 'votes':
        return 'Top Voted Stations';
      case 'verified':
        return 'Verified Stations';
      default:
        return 'Discover Stations';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <h1 className="text-2xl font-bold">{getTitle()}</h1>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search stations..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="country">Country</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
      
      {renderContent()}
    </div>
  );
}