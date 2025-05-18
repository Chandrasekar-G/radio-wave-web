'use client';

import { useRef, useState, useEffect } from 'react';
import { useRadioStore } from '@/lib/store/radio-store';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { formatDuration } from '@/lib/utils';
import { PlayerControls } from './player-controls';
import { StationInfo } from './station-info';
import { Volume, Volume1, Volume2, Maximize2, Minimize2 } from 'lucide-react';
import { Visualizer } from './visualizer';

export function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const {
    currentStation,
    isPlaying,
    volume,
    togglePlay,
    setVolume,
    toggleMuted,
    isMuted,
  } = useRadioStore();
  
  const [expanded, setExpanded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Update volume and muted state
    audio.volume = isMuted ? 0 : volume;
    
    // Play or pause based on state
    if (currentStation && isPlaying) {
      audio.src = currentStation.url;
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
        setHasError(true);
        togglePlay(false);
        toast({
          title: 'Playback Error',
          description: 'Unable to play this station. Please try another one.',
          variant: 'destructive',
        });
      });
    } else {
      audio.pause();
    }

    // Clean up
    return () => {
      audio.pause();
    };
  }, [currentStation, isPlaying, volume, isMuted, togglePlay, toast]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsBuffering(false);
    const onPause = () => setIsBuffering(false);
    const onWaiting = () => setIsBuffering(true);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration || 0);
    const onError = () => {
      setHasError(true);
      togglePlay(false);
      toast({
        title: 'Playback Error',
        description: 'Unable to play this station. Please try another one.',
        variant: 'destructive',
      });
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('playing', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('playing', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('error', onError);
    };
  }, [togglePlay, toast]);

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVolume;
    }
  };

  const VolumeIcon = () => {
    if (isMuted || volume === 0) return <Volume className="h-4 w-4" />;
    if (volume < 0.5) return <Volume1 className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  if (!currentStation) {
    return (
      <div className="h-16 border-t bg-card p-2 text-card-foreground shadow-sm md:h-20 md:p-4">
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          No station selected. Browse and select a station to begin playback.
        </div>
      </div>
    );
  }

  return (
    <>
      <audio ref={audioRef} />
      
      <div
        className={cn(
          'relative border-t bg-card transition-all duration-300 ease-in-out',
          expanded ? 'h-96' : 'h-16 md:h-20'
        )}
      >
        {expanded && (
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-background/50 to-background p-6">
            <div className="mx-auto flex h-full max-w-4xl flex-col items-center justify-center gap-6">
              <StationInfo station={currentStation} expanded={true} />
              
              <div className="h-40 w-full">
                <Visualizer isPlaying={isPlaying && !isBuffering} />
              </div>
              
              <div className="w-full max-w-md">
                <PlayerControls
                  isPlaying={isPlaying}
                  isBuffering={isBuffering}
                  hasError={hasError}
                  onTogglePlay={() => togglePlay(!isPlaying)}
                  expanded={true}
                />
              </div>
            </div>
          </div>
        )}
        
        <div className={cn('flex h-full items-center justify-between p-2 md:p-4', 
          expanded && 'opacity-0')}>
          <StationInfo station={currentStation} />
          
          <div className="flex flex-1 items-center justify-center">
            <PlayerControls
              isPlaying={isPlaying}
              isBuffering={isBuffering}
              hasError={hasError}
              onTogglePlay={() => togglePlay(!isPlaying)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => toggleMuted(!isMuted)}
            >
              <VolumeIcon />
            </Button>
            
            <div className="hidden w-24 md:block">
              <Slider
                value={[isMuted ? 0 : volume]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
              />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={toggleExpand}
            >
              {expanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}