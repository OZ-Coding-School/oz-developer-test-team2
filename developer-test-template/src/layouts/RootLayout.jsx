import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent p-6">
      <div className="w-full max-w-[520px]">
        <Outlet />
      </div>
    </div>
  );
}
