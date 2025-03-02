// src/components/Header.tsx
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Bell } from 'lucide-react';
import { User } from './user';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-slate-950">
          EHEI Connect
        </Link>

        {/* Barre de recherche */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Rechercher..."
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          {/* Icônes de notification et profil */}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <User />
        </div>
      </div>
    </header>
  );
}