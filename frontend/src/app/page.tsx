// Page d'accueil (home)
// src/app/page.tsx
import Sidebar from '@/components/Sidebar';
import Feed from '@/components/Feed';
import RightSidebar from '@/components/RightSidebar';

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4">
        <Feed />
      </main>
      <RightSidebar />
    </div>
  );
}