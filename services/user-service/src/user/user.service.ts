import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

  async createUser(data: any) {
    return this.prisma.utilisateur.create({ data });
  }

  async getAllUsers() {
    return this.prisma.utilisateur.findMany();
  }

  async getUserByEmail(email: string) {
    return this.prisma.utilisateur.findUnique({ where: { email } });
  }
}
