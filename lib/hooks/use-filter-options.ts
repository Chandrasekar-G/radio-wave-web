'use client';

import { useQuery } from '@tanstack/react-query';

interface FilterOption {
  name: string;
  value: string;
  stationCount?: number;
}

export function useFilterOptions(filterType: 'country' | 'language' | 'tag' | 'popular') {
  return useQuery({
    queryKey: ['filterOptions', filterType],
    queryFn: async () => {
      if (filterType === 'popular') {
        return [
          { name: 'Most Clicked', value: 'clickcount' },
          { name: 'Most Voted', value: 'votes' },
          { name: 'Verified', value: 'verified' },
        ];
      }
      
      // Base URL for the radio-browser.info API
      const BASE_URL = 'https://de1.api.radio-browser.info/json';
      
      let endpoint = '';
      switch (filterType) {
        case 'country':
          endpoint = '/countrycodes';
          break;
        case 'language':
          endpoint = '/languages';
          break;
        case 'tag':
          endpoint = '/tags';
          break;
        default:
          throw new Error(`Invalid filter type: ${filterType}`);
      }
      
      const response = await fetch(`${BASE_URL}${endpoint}?hidebroken=true`, {
        headers: {
          'User-Agent': 'RadioWeb/1.0',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${filterType} options`);
      }
      
      const data = await response.json();
      
      // Transform the response based on the filter type
      const options: FilterOption[] = data.map((item: any) => {
        switch (filterType) {
          case 'country':
            return {
              name: item.name || item.country || item.iso_3166_1,
              value: item.iso_3166_1,
              stationCount: item.stationcount,
            };
          case 'language':
            return {
              name: item.name,
              value: item.name,
              stationCount: item.stationcount,
            };
          case 'tag':
            return {
              name: item.name,
              value: item.name,
              stationCount: item.stationcount,
            };
          default:
            return { name: '', value: '' };
        }
      });
      
      // Sort by station count
      return options
        .filter(option => option.stationCount && option.stationCount > 0)
        .sort((a, b) => (b.stationCount || 0) - (a.stationCount || 0));
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}