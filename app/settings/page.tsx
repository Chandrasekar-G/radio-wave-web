'use client';

import { MainLayout } from '@/components/layouts/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRadioStore } from '@/lib/store/radio-store';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Paintbrush, RefreshCw, Trash2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

export default function SettingsPage() {
  const { 
    volume, 
    setVolume, 
    isMuted, 
    toggleMuted,
    clearAllFilters,
    favorites,
  } = useRadioStore();
  
  const { theme, setTheme } = useTheme();
  const [themeColor, setThemeColor] = useState<string>('zinc');
  
  // Theme presets representing different color schemes
  const themePresets = [
    { name: 'Default', color: 'zinc', primary: '#18181b', accent: '#18181b' },
    { name: 'Blue', color: 'blue', primary: '#1d4ed8', accent: '#3b82f6' },
    { name: 'Green', color: 'green', primary: '#15803d', accent: '#22c55e' },
    { name: 'Purple', color: 'purple', primary: '#7e22ce', accent: '#a855f7' },
    { name: 'Red', color: 'red', primary: '#b91c1c', accent: '#ef4444' },
    { name: 'Amber', color: 'amber', primary: '#b45309', accent: '#f59e0b' },
  ];
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="playback">Playback</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4 py-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Manage your general app preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Clear Filters</Label>
                    <p className="text-sm text-muted-foreground">
                      Reset all your current station filters
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={clearAllFilters}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset Filters
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Saved Favorites</Label>
                    <p className="text-sm text-muted-foreground">
                      You have {favorites.length} saved stations
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    disabled={favorites.length === 0}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Favorites
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="playback" className="space-y-4 py-4">
            <Card>
              <CardHeader>
                <CardTitle>Playback Settings</CardTitle>
                <CardDescription>
                  Configure your audio preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="volume">Volume ({Math.round(volume * 100)}%)</Label>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="mute" className="text-sm">Mute</Label>
                      <Switch 
                        id="mute" 
                        checked={isMuted}
                        onCheckedChange={toggleMuted}
                      />
                    </div>
                  </div>
                  <Slider
                    id="volume"
                    defaultValue={[volume]}
                    max={1}
                    step={0.01}
                    disabled={isMuted}
                    onValueChange={(value) => setVolume(value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoplay">Autoplay</Label>
                    <Switch id="autoplay" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automatically play stations when selected
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4 py-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how Radio Web looks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme Mode</Label>
                  <div className="flex items-center space-x-2">
                    <ThemeToggle />
                    <p className="text-sm capitalize">
                      {theme === 'system' ? 'System Default' : theme}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>Theme Color</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {themePresets.map((preset) => (
                      <Button
                        key={preset.color}
                        variant="outline"
                        className={`flex h-16 flex-col items-center justify-center gap-1 ${
                          themeColor === preset.color ? 'border-primary ring-1 ring-primary' : ''
                        }`}
                        onClick={() => setThemeColor(preset.color)}
                      >
                        <div 
                          className="h-6 w-6 rounded-full"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <span className="text-xs">{preset.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>
                    <Paintbrush className="mr-2 h-4 w-4" />
                    Apply Theme
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="about" className="space-y-4 py-4">
            <Card>
              <CardHeader>
                <CardTitle>About Radio Web</CardTitle>
                <CardDescription>
                  Information about this application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted p-4">
                  <h3 className="mb-2 font-medium">Radio Web</h3>
                  <p className="text-sm text-muted-foreground">
                    Version 1.0.0
                  </p>
                  <p className="mt-4 text-sm">
                    A modern radio streaming app built with Next.js, React, and Tailwind CSS.
                    Listen to thousands of radio stations from around the world.
                  </p>
                  <p className="mt-2 text-sm">
                    Data provided by the radio-browser.info API.
                  </p>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p>© 2025 Radio Web. All rights reserved.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}