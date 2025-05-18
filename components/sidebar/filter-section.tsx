'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, ChevronRight, DivideIcon as LucideIcon } from 'lucide-react';
import { useRadioStore } from '@/lib/store/radio-store';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useFilterOptions } from '@/lib/hooks/use-filter-options';

interface FilterSectionProps {
  icon: LucideIcon;
  title: string;
  expanded: boolean;
  onToggle: () => void;
  filterType: 'country' | 'language' | 'tag' | 'popular';
}

export function FilterSection({
  icon: Icon,
  title,
  expanded,
  onToggle,
  filterType,
}: FilterSectionProps) {
  const router = useRouter();
  const { setFilter, activeFilters, clearFilter } = useRadioStore();
  const { options = [], isLoading } = useFilterOptions(filterType);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredOptions = (options || []).filter(option => 
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularOptions = [
    { name: 'Most Clicked', value: 'clickcount' },
    { name: 'Most Voted', value: 'votes' },
    { name: 'Verified', value: 'verified' },
  ];

  const isActiveFilter = (value: string) => {
    return activeFilters[filterType] === value;
  };

  const handleFilterClick = (value: string) => {
    if (isActiveFilter(value)) {
      clearFilter(filterType);
    } else {
      setFilter(filterType, value);
    }
    router.push('/');
  };

  const renderItems = () => {
    if (filterType === 'popular') {
      return popularOptions.map((option) => (
        <Button
          key={option.value}
          variant="ghost"
          className={cn(
            'justify-start px-8 py-2 h-8 text-sm',
            isActiveFilter(option.value) && 'bg-accent'
          )}
          onClick={() => handleFilterClick(option.value)}
        >
          {option.name}
        </Button>
      ));
    }

    return filteredOptions.slice(0, 10).map((option) => (
      <Button
        key={option.value}
        variant="ghost"
        className={cn(
          'justify-start px-8 py-2 h-8 text-sm',
          isActiveFilter(option.value) && 'bg-accent'
        )}
        onClick={() => handleFilterClick(option.value)}
      >
        {option.name}
        {option.stationCount && (
          <Badge variant="outline" className="ml-auto">
            {option.stationCount}
          </Badge>
        )}
      </Button>
    ));
  };

  return (
    <div className="mb-1">
      <Button
        variant="ghost"
        className="w-full justify-between px-2 py-2"
        onClick={onToggle}
      >
        <span className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          {title}
        </span>
        {expanded ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
      
      {expanded && (
        <div className="mt-1">
          {filterType !== 'popular' && (
            <div className="px-2 py-1">
              <input
                type="text"
                placeholder={`Search ${title.toLowerCase()}...`}
                className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
          
          <ScrollArea className="h-40">
            <div className="flex flex-col py-1">
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                </div>
              ) : (
                renderItems()
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}