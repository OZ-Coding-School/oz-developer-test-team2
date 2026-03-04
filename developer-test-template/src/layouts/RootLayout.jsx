import { RainAnimation } from '@/components/common';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="from-bg-default relative flex min-h-screen items-center justify-center bg-linear-to-b to-white p-6">
      {/* Content Layer */}
      <div className="relative">
        <Outlet />
      </div>
      {/* Rain Layer */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <RainAnimation />
      </div>
    </div>
  );
}
