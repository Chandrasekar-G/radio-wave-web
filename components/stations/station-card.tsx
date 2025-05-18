'use client';

import { Station } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Play, Radio } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useRadioStore } from '@/lib/store/radio-store';
import { Badge } from '@/components/ui/badge';

interface StationCardProps {
  station: Station;
}

export function StationCard({ station }: StationCardProps) {
  const { 
    currentStation, 
    isPlaying, 
    playStation, 
    togglePlay,
    favorites,
    toggleFavorite,
  } = useRadioStore();
  
  const { 
    name, 
    favicon, 
    tags, 
    country, 
    language, 
    codec, 
    bitrate, 
    clickcount,
    stationuuid 
  } = station;
  
  const isCurrentStation = currentStation?.stationuuid === stationuuid;
  const isFavorite = favorites.some(fav => fav.stationuuid === stationuuid);
  
  const defaultImage = '/radio-placeholder.png';
  const stationImage = favicon && favicon !== '' ? favicon : defaultImage;
  
  const handlePlayClick = () => {
    if (isCurrentStation) {
      togglePlay(!isPlaying);
    } else {
      playStation(station);
    }
  };
  
  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-md">
      <div className="relative aspect-video bg-muted">
        <Image
          src={stationImage}
          alt={name || 'Radio station'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          onError={(e) => {
            // Fallback if station image fails to load
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <div className="absolute bottom-2 right-2 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={() => toggleFavorite(station)}
          >
            <Heart 
              className={cn('h-4 w-4', 
                isFavorite && 'fill-primary text-primary'
              )} 
            />
          </Button>
          
          <Button
            variant={isCurrentStation && isPlaying ? "default" : "secondary"}
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={handlePlayClick}
          >
            <Play className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 font-medium" title={name}>
              {name || 'Unknown Station'}
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {country && (
              <Badge variant="outline" className="text-xs">
                {country}
              </Badge>
            )}
            
            {language && (
              <Badge variant="outline" className="text-xs">
                {language}
              </Badge>
            )}
            
            {codec && (
              <Badge variant="outline" className="text-xs">
                {codec} {bitrate && `${bitrate}k`}
              </Badge>
            )}
          </div>
          
          {tags && (
            <div className="flex flex-wrap gap-1">
              {tags.split(',').slice(0, 3).map((tag) => (
                <span 
                  key={tag}
                  className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-3">
        <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Radio className="h-3 w-3" />
            <span>{clickcount?.toLocaleString() || 0} plays</span>
          </div>
          
          {isCurrentStation && (
            <span className="flex items-center gap-1 text-primary">
              <span className="relative flex h-2 w-2">
                <span className={cn(
                  "absolute inline-flex h-full w-full rounded-full opacity-75",
                  isPlaying ? "animate-ping bg-primary" : "bg-muted"
                )}></span>
                <span className={cn(
                  "relative inline-flex h-2 w-2 rounded-full",
                  isPlaying ? "bg-primary" : "bg-muted"
                )}></span>
              </span>
              <span>{isPlaying ? 'Now Playing' : 'Paused'}</span>
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}