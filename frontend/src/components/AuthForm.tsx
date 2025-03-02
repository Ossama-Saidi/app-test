// src/components/AuthForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AuthForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, isRegister: boolean) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Validation côté client pour l'inscription
    if (isRegister) {
      const password = data.password as string;
      const confirmPassword = data.confirmPassword as string;

      if (password !== confirmPassword) {
        toast.error('Les mots de passe ne correspondent pas.');
        setIsLoading(false);
        return;
      }
    }
    // Préparer les données à envoyer au serveur
    const payload = {
      nom: data.nom,
      prenom: data.prenom,
      telephone: data.telephone,
      email: data.email,
      password: data.password,
      role: isRegister ? role : undefined, // Envoyer le rôle uniquement lors de l'inscription
    };
    
    try {
      const endpoint = isRegister
        ? 'http://localhost:3001/auth/register' // Endpoint d'inscription
        : 'http://localhost:3001/auth/login'; // Endpoint de connexion

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(isRegister ? 'Inscription réussie !' : 'Connexion réussie !');
        router.push('/'); // Rediriger vers la page Home
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Une erreur est survenue.');
      }
    } catch (error) {
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Connexion</TabsTrigger>
        <TabsTrigger value="register">Inscription</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <form className="space-y-6" onSubmit={(e) => handleSubmit(e, false)}>
          <div>
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              disabled={isLoading}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                disabled={isLoading}
                className="mt-1 pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Chargement...' : 'Se connecter'}
            </Button>
          </div>
        </form>
      </TabsContent>
      <TabsContent value="register">
        <form className="space-y-6" onSubmit={(e) => handleSubmit(e, true)}>
          <div>
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="nom"
              name="nom"
              type="text"
              required
              disabled={isLoading}
              className="mt-1"
              placeholder='Nom'
            />
            <Input
              id="prenom"
              name="prenom"
              type="text"
              required
              disabled={isLoading}
              className="mt-1"
              placeholder='Prénom'
            />
          </div>
          <div>
            <Label htmlFor="email">Numéro de téléphone</Label>
            <Input
              id="telephone"
              name="telephone"
              type="text"
              required
              disabled={isLoading}
              className="mt-1"
              placeholder='+212612345678'
            />
          </div>
          <div>
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              disabled={isLoading}
              className="mt-1"
              placeholder='nom@exemple.com'
            />
          </div>
          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                disabled={isLoading}
                className="mt-1 pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirmez le mot de passe</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                disabled={isLoading}
                className="mt-1 pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div>
            <Label htmlFor="role">Votre Rôle</Label>
            <Select onValueChange={(value) => setRole(value)} required>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sélectionnez un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ETUDIANT">Etudiant</SelectItem>
                <SelectItem value="PROFESSEUR">Professeur</SelectItem>
                <SelectItem value="ADMINISTRATEUR">Administrateur</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Chargement...' : "S'inscrire"}
            </Button>
          </div>
        </form>
      </TabsContent>
    </Tabs>
  );
}