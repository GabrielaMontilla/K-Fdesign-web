import { Outlet } from 'react-router';
import { Header } from './header';
import { Footer } from './footer';
import { Toaster } from './ui/sonner';

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
