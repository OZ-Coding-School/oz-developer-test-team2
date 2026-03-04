import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="from-bg-default flex min-h-dvh min-h-screen items-center justify-center bg-linear-to-b to-white p-6">
      <div className="mx-auto w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
