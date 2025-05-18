'use client';

import { Button } from '@/components/ui/button';
import { useRadioStore } from '@/lib/store/radio-store';
import { Heart, Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlayerControlsProps {
  isPlaying: boolean;
  isBuffering: boolean;
  hasError: boolean;
  onTogglePlay: () => void;
  expanded?: boolean;
}

export function PlayerControls({
  isPlaying,
  isBuffering,
  hasError,
  onTogglePlay,
  expanded = false,
}: PlayerControlsProps) {
  const { currentStation, favorites, toggleFavorite, playPrevious, playNext } = useRadioStore();
  
  const isFavorite = currentStation ? favorites.some(fav => fav.stationuuid === currentStation.stationuuid) : false;
  
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', expanded && 'h-10 w-10')}
        onClick={playPrevious}
        disabled={!currentStation}
      >
        <SkipBack className={cn('h-4 w-4', expanded && 'h-5 w-5')} />
      </Button>
      
      <Button
        variant="default"
        size="icon"
        className={cn(
          'h-8 w-8 rounded-full', 
          expanded && 'h-12 w-12',
          hasError && 'bg-destructive hover:bg-destructive/90',
          isBuffering && 'animate-pulse'
        )}
        onClick={onTogglePlay}
        disabled={hasError || !currentStation}
      >
        {isPlaying ? (
          <Pause className={cn('h-4 w-4', expanded && 'h-5 w-5')} />
        ) : (
          <Play className={cn('h-4 w-4', expanded && 'h-5 w-5')} />
        )}
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', expanded && 'h-10 w-10')}
        onClick={playNext}
        disabled={!currentStation}
      >
        <SkipForward className={cn('h-4 w-4', expanded && 'h-5 w-5')} />
      </Button>
      
      {expanded && currentStation && (
        <Button
          variant="ghost"
          size="icon"
          className="ml-4 h-10 w-10"
          onClick={() => toggleFavorite(currentStation)}
        >
          <Heart className={cn('h-5 w-5', isFavorite && 'fill-primary text-primary')} />
        </Button>
      )}
    </div>
  );
}