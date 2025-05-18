'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Station } from '@/lib/types';

interface ActiveFilters {
  country: string | null;
  language: string | null;
  tag: string | null;
  popular: 'clickcount' | 'votes' | 'verified' | null;
}

interface RadioStore {
  // Current playback state
  currentStation: Station | null;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  
  // Playback history
  history: Station[];
  
  // Favorite stations
  favorites: Station[];
  
  // Active filters
  activeFilters: ActiveFilters;
  
  // User's country (from geolocation)
  country: string | null;
  
  // Actions
  playStation: (station: Station) => void;
  togglePlay: (playing?: boolean) => void;
  setVolume: (volume: number) => void;
  toggleMuted: (muted?: boolean) => void;
  
  toggleFavorite: (station: Station) => void;
  
  setFilter: (
    type: 'country' | 'language' | 'tag' | 'popular',
    value: string
  ) => void;
  clearFilter: (type: 'country' | 'language' | 'tag' | 'popular') => void;
  clearAllFilters: () => void;
  
  setCountry: (country: string) => void;
  
  playPrevious: () => void;
  playNext: () => void;
}

export const useRadioStore = create<RadioStore>()(
  persist(
    (set, get) => ({
      currentStation: null,
      isPlaying: false,
      volume: 0.7,
      isMuted: false,
      history: [],
      favorites: [],
      activeFilters: {
        country: null,
        language: null,
        tag: null,
        popular: null,
      },
      country: null,
      
      playStation: (station) => {
        // Add current station to history if it exists
        const currentStation = get().currentStation;
        if (currentStation) {
          set((state) => ({
            history: [
              currentStation,
              ...state.history.filter(
                (s) => s.stationuuid !== currentStation.stationuuid
              ).slice(0, 9), // Keep last 10 stations
            ],
          }));
        }
        
        set({ currentStation: station, isPlaying: true });
      },
      
      togglePlay: (playing) => {
        const isPlaying = playing !== undefined ? playing : !get().isPlaying;
        set({ isPlaying });
      },
      
      setVolume: (volume) => {
        set({ volume, isMuted: volume === 0 });
      },
      
      toggleMuted: (muted) => {
        const isMuted = muted !== undefined ? muted : !get().isMuted;
        set({ isMuted });
      },
      
      toggleFavorite: (station) => {
        const favorites = get().favorites;
        const isFavorited = favorites.some(
          (s) => s.stationuuid === station.stationuuid
        );
        
        if (isFavorited) {
          set({
            favorites: favorites.filter(
              (s) => s.stationuuid !== station.stationuuid
            ),
          });
        } else {
          set({ favorites: [...favorites, station] });
        }
      },
      
      setFilter: (type, value) => {
        set((state) => ({
          activeFilters: {
            ...state.activeFilters,
            [type]: value,
          },
        }));
      },
      
      clearFilter: (type) => {
        set((state) => ({
          activeFilters: {
            ...state.activeFilters,
            [type]: null,
          },
        }));
      },
      
      clearAllFilters: () => {
        set({
          activeFilters: {
            country: null,
            language: null,
            tag: null,
            popular: null,
          },
        });
      },
      
      setCountry: (country) => {
        set({ country });
      },
      
      playPrevious: () => {
        const { history } = get();
        if (history.length > 0) {
          const previousStation = history[0];
          set((state) => ({
            currentStation: previousStation,
            isPlaying: true,
            history: state.history.slice(1),
          }));
        }
      },
      
      playNext: () => {
        // This would ideally play a related station
        // For now, we'll just play a random favorite if available
        const { favorites, currentStation } = get();
        
        if (favorites.length > 0) {
          // Find a random favorite that's not the current station
          const availableFavorites = currentStation
            ? favorites.filter((s) => s.stationuuid !== currentStation.stationuuid)
            : favorites;
            
          if (availableFavorites.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableFavorites.length);
            const nextStation = availableFavorites[randomIndex];
            get().playStation(nextStation);
          }
        }
      },
    }),
    {
      name: 'radio-web-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        volume: state.volume,
        isMuted: state.isMuted,
        history: state.history,
      }),
    }
  )
);