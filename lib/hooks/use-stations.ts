'use client';

import { useQuery } from '@tanstack/react-query';
import { Station } from '@/lib/types';

interface StationsParams {
  search?: string;
  country?: string | null;
  language?: string | null;
  tag?: string | null;
  popularity?: string | null;
  limit?: number;
}

export function useStations({
  search = '',
  country = null,
  language = null,
  tag = null,
  popularity = null,
  limit = 50,
}: StationsParams) {
  return useQuery({
    queryKey: ['stations', search, country, language, tag, popularity, limit],
    queryFn: async () => {
      // Base URL for the radio-browser.info API
      const BASE_URL = 'https://de1.api.radio-browser.info/json';
      
      let endpoint = '/stations/search';
      
      // Build query parameters
      const params = new URLSearchParams();
      
      if (search) {
        params.append('name', search);
        params.append('nameExact', 'false');
      }
      
      if (country) {
        params.append('countrycode', country);
      }
      
      if (language) {
        params.append('language', language);
      }
      
      if (tag) {
        params.append('tag', tag);
      }
      
      if (popularity === 'clickcount') {
        params.append('order', 'clickcount');
        params.append('reverse', 'true');
      } else if (popularity === 'votes') {
        params.append('order', 'votes');
        params.append('reverse', 'true');
      } else if (popularity === 'verified') {
        params.append('is_https', 'true');
      } else {
        // Default sorting
        params.append('order', 'clickcount');
        params.append('reverse', 'true');
      }
      
      // Always include some basic filters for quality
      params.append('limit', limit.toString());
      params.append('hidebroken', 'true');
      
      const response = await fetch(`${BASE_URL}${endpoint}?${params.toString()}`, {
        headers: {
          'User-Agent': 'RadioWeb/1.0',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch stations');
      }
      
      const data: Station[] = await response.json();
      return data;
    },
    retry: 3,
  });
}