import { Module } from '@nestjs/common';
//import { TypeOrmModule } from '@nestjs/typeorm';

import { PrismaService } from './prisma/prisma.service';

// import { Utilisateur } from './user/user.entity';
// import { Etudiant } from './etudiant/etudiant.entity';
// import { Professeur } from './professeur/professeur.entity';
// import { Administrateur } from './admin/admin.entity';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [
    UserModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
