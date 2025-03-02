// src/app/(auth)/login/page.tsx
// Page de connexion (login)

import AuthForm from '@/components/AuthForm';

export default function LoginPage() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Bienvenue sur Notre communaité EHEI-Connect
          </h2>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}