import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="bg-bg-default flex min-h-screen justify-center p-6">
      <div className="w-full max-w-[520px]">
        <Outlet />
      </div>
    </div>
  );
}
