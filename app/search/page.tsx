"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layouts/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useStations } from "@/lib/hooks/use-stations";
import { StationCard } from "@/components/stations/station-card";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const {
    data: stations,
    isLoading,
    isError,
  } = useStations({
    search: submitted ? searchQuery : "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Search Stations</h1>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by station name, country, language or tags..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={isLoading || !searchQuery.trim()}>
            Search
          </Button>
        </form>

        <div>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-card p-8 text-center">
              <p className="text-destructive">
                Failed to load search results. Please try again.
              </p>
              <Button onClick={() => setSubmitted(true)}>Try Again</Button>
            </div>
          ) : submitted && stations?.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-card p-8 text-center">
              <p className="text-muted-foreground">
                No stations found matching "{searchQuery}".
              </p>
              <p className="text-sm text-muted-foreground">
                Try with a different search term or browse by category.
              </p>
            </div>
          ) : submitted ? (
            <>
              <p className="mb-4 text-muted-foreground">
                Found {stations?.length || 0} results for "{searchQuery}"
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {stations?.map((station) => (
                  <StationCard key={station.stationuuid} station={station} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-card p-8 text-center">
              <p className="text-muted-foreground">
                Enter a search term to find radio stations.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
