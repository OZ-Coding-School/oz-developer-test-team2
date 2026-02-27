import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,var(--color-bg-default)_0%,#ffffff_100%)]">
      <div className="w-full max-w-[520px]">
        <Outlet />
      </div>
    </div>
  );
}
