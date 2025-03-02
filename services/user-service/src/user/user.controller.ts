import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async createUser(@Body() data: any) {
      return this.userService.createUser(data);
    }
  
    @Get(':email')
    async getUtilisateur(@Param('email') email: string) {
      return this.userService.getUserByEmail(email);
    }
  
    @Get()
    async getAllUsers() {
      return this.userService.getAllUsers();
    }
}
