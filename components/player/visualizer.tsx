'use client';

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface VisualizerProps {
  isPlaying: boolean;
}

export function Visualizer({ isPlaying }: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let dataArray: Uint8Array | null = null;
    
    const setupAudioContext = () => {
      try {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        
        // Find the audio element
        const audioElement = document.querySelector('audio');
        if (!audioElement) return;
        
        const source = audioContext.createMediaElementSource(audioElement);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        
        return true;
      } catch (error) {
        console.error('Error setting up audio context:', error);
        return false;
      }
    };
    
    const draw = () => {
      if (!context || !analyser || !dataArray) return;
      
      // Resize canvas to match parent container
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
      
      animationRef.current = requestAnimationFrame(draw);
      
      analyser.getByteFrequencyData(dataArray);
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = (canvas.width / dataArray.length) * 2.5;
      let x = 0;
      
      for (let i = 0; i < dataArray.length; i++) {
        const barHeight = isPlaying ? dataArray[i] * (canvas.height / 255) : 0;
        
        // Create gradient for bars
        const gradient = context.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        gradient.addColorStop(0, 'hsl(var(--primary) / 0.3)');
        gradient.addColorStop(1, 'hsl(var(--primary))');
        
        context.fillStyle = gradient;
        
        // Round the corners of bars
        const barX = x;
        const barY = canvas.height - barHeight;
        const radius = barWidth / 2;
        
        if (barHeight > 0) {
          context.beginPath();
          context.moveTo(barX + radius, barY);
          context.arcTo(barX + barWidth, barY, barX + barWidth, barY + barHeight, radius);
          context.arcTo(barX + barWidth, barY + barHeight, barX, barY + barHeight, radius);
          context.arcTo(barX, barY + barHeight, barX, barY, radius);
          context.arcTo(barX, barY, barX + barWidth, barY, radius);
          context.closePath();
          context.fill();
        }
        
        x += barWidth + 1;
      }
    };
    
    let initialized = false;
    
    if (isPlaying) {
      if (!initialized) {
        initialized = setupAudioContext() || false;
      }
      
      if (initialized && !animationRef.current) {
        draw();
      }
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);
  
  return (
    <div className="h-full w-full overflow-hidden rounded-lg bg-background/50">
      {isPlaying ? (
        <canvas 
          ref={canvasRef} 
          className="h-full w-full"
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="text-sm text-muted-foreground">
            Start playback to see visualization
          </div>
        </div>
      )}
    </div>
  );
}