'use client';

import { useState, useEffect } from 'react';

interface UserLocationState {
  country: string | null;
  isLoading: boolean;
  error: string | null;
}

export function useUserLocation() {
  const [state, setState] = useState<UserLocationState>({
    country: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const getLocation = async () => {
      try {
        // First try to use the Geolocation API to get precise location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                const { latitude, longitude } = position.coords;
                const response = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                );
                
                if (response.ok) {
                  const data = await response.json();
                  setState({
                    country: data.countryCode,
                    isLoading: false,
                    error: null,
                  });
                } else {
                  // Fallback to IP-based geolocation
                  await getLocationByIP();
                }
              } catch (error) {
                // Fallback to IP-based geolocation
                await getLocationByIP();
              }
            },
            async (error) => {
              // Fallback to IP-based geolocation
              await getLocationByIP();
            }
          );
        } else {
          // Fallback to IP-based geolocation
          await getLocationByIP();
        }
      } catch (error) {
        setState({
          country: null,
          isLoading: false,
          error: 'Failed to determine location',
        });
      }
    };

    const getLocationByIP = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (response.ok) {
          const data = await response.json();
          setState({
            country: data.country_code,
            isLoading: false,
            error: null,
          });
        } else {
          throw new Error('Failed to get location by IP');
        }
      } catch (error) {
        setState({
          country: null,
          isLoading: false,
          error: 'Failed to determine location',
        });
      }
    };

    getLocation();
  }, []);

  return state;
}