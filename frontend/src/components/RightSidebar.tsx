// Barre latérale droite
// src/components/RightSidebar.tsx
export default function RightSidebar() {
    return (
      <aside className="w-64 bg-white shadow-sm p-4">
        <h2 className="text-lg font-bold mb-4">Suggestions</h2>
        <div className="space-y-4">
          {/* Suggestion 1 */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div>
              <p className="font-semibold">Jean Dupont</p>
              <p className="text-sm text-gray-500">10 amis en commun</p>
            </div>
          </div>
  
          {/* Suggestion 2 */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div>
              <p className="font-semibold">Marie Curie</p>
              <p className="text-sm text-gray-500">5 amis en commun</p>
            </div>
          </div>
        </div>
      </aside>
    );
  }