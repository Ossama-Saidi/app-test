// Fil d'actualités central
// src/components/Feed.tsx

import { Button } from '@/components/ui/button';

export default function Feed() {
    return (
      <div className="space-y-6">
        {/* Zone de création de publication */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <textarea
            placeholder="Quoi de neuf ?"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <Button className="mt-2">Publier</Button>
        </div>
  
        {/* Liste des publications */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">Fil d'actualités</h2>
          <div className="space-y-4">
            {/* Exemple de publication */}
            <div className="border p-4 rounded-lg">
              <p>Ceci est une publication de test.</p>
            </div>
            <div className="border p-4 rounded-lg">
              <p>Une autre publication intéressante.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }