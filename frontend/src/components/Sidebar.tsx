// Barre latérale gauche
// src/components/Sidebar.tsx
import Link from 'next/link';
import { Home, Users, Bookmark, MessageCircle, Settings } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-sm p-4">
      <nav className="space-y-2">
        {/* Accueil */}
        <Link href="/" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
          <Home className="h-5 w-5" />
          <span>Accueil</span>
        </Link>

        {/* Amis */}
        <Link href="/friends" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
          <Users className="h-5 w-5" />
          <span>Amis</span>
        </Link>

        {/* Enregistrés */}
        <Link href="/saved" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
          <Bookmark className="h-5 w-5" />
          <span>Enregistrés</span>
        </Link>

        {/* Messages */}
        <Link href="/messages" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
          <MessageCircle className="h-5 w-5" />
          <span>Messages</span>
        </Link>

        {/* Paramètres */}
        <Link href="/settings" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
          <Settings className="h-5 w-5" />
          <span>Paramètres</span>
        </Link>
      </nav>
    </aside>
  );
}