import { MainLayout } from '@/components/layouts/main-layout';
import { StationGrid } from '@/components/stations/station-grid';

export default function Home() {
  return (
    <MainLayout>
      <StationGrid />
    </MainLayout>
  );
}