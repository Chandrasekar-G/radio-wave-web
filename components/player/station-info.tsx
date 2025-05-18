'use client';

import { cn } from '@/lib/utils';
import { Station } from '@/lib/types';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useRadioStore } from '@/lib/store/radio-store';
import { Button } from '@/components/ui/button';

interface StationInfoProps {
  station: Station;
  expanded?: boolean;
}

export function StationInfo({ station, expanded = false }: StationInfoProps) {
  const { favorites, toggleFavorite } = useRadioStore();
  const isFavorite = favorites.some(fav => fav.stationuuid === station.stationuuid);
  
  const { 
    name, 
    favicon, 
    tags, 
    countrycode, 
    language 
  } = station;
  
  const defaultImage = '/radio-placeholder.png';
  const stationImage = favicon && favicon !== '' ? favicon : defaultImage;
  
  return (
    <div className={cn(
      'flex items-center gap-3',
      expanded && 'flex-col items-center justify-center text-center'
    )}>
      <div className={cn(
        'relative h-10 w-10 overflow-hidden rounded', 
        expanded && 'h-32 w-32')
      }>
        <Image
          src={stationImage}
          alt={name || 'Radio station'}
          fill
          sizes={expanded ? '8rem' : '2.5rem'}
          className="object-cover"
          onError={(e) => {
            // Fallback if station image fails to load
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />
      </div>
      
      <div className={cn('max-w-[180px] md:max-w-[300px]', 
        expanded && 'max-w-full text-center')}>
        <h3 className={cn('truncate text-sm font-medium', 
          expanded && 'text-xl')}>
          {name || 'Unknown Station'}
        </h3>
        
        <div className={cn('flex items-center gap-1 text-xs text-muted-foreground',
          expanded && 'justify-center text-sm')}>
          {countrycode && <span>{countrycode}</span>}
          {countrycode && language && <span>•</span>}
          {language && <span>{language}</span>}
        </div>
        
        {expanded && tags && (
          <div className="mt-2 flex flex-wrap justify-center gap-1">
            {tags.split(',').slice(0, 3).map((tag) => (
              <span 
                key={tag}
                className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {!expanded && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 ml-auto md:hidden"
          onClick={() => toggleFavorite(station)}
        >
          <Heart 
            className={cn('h-4 w-4', 
              isFavorite && 'fill-primary text-primary'
            )} 
          />
        </Button>
      )}
    </div>
  );
}