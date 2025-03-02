import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
      private readonly prisma: PrismaService,
      private readonly jwtService: JwtService, // Injection du JwtService
    ) {}

    //private users = []; // In-memory user storage (replace with DB later)

      // Inscription
    async register(data: any): Promise<any> {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      
      const user = await this.prisma.utilisateur.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });
  
      const token = this.generateToken(user);
      return { user, token };
    }

      // Connexion
    async login(email: string, password: string): Promise<any> {
      const user = await this.prisma.utilisateur.findUnique({
        where: { email },
      });
      if (!user) throw new UnauthorizedException('Invalid credentials');

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

      const token = this.generateToken(user);
      return { message: 'Login successful',user, token };
    }

    // Générer un JWT
  private generateToken(user: any): string {
    const payload = { sub: user.id, email: user.email, role: user.role , nom: user.nom};
    return this.jwtService.sign(payload); // Utilisation du JwtService pour signer le token
  }
}