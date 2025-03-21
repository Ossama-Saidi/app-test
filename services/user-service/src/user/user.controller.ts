import { Controller, Get, Param, UseGuards, Req, Put, Body, Post, Delete, Patch, UseInterceptors, BadRequestException, UploadedFile, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ChangePasswordDto, ModifyUserDto } from 'src/auth/dto/auth.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { JwtAuthGuard } from 'src/auth/JWT/jwt-auth.guard';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Get user profile
   * @param req - Request object containing user information
   */
  @Get('profil')
  @UseGuards(AuthGuard('jwt'))
  async getUserProfile(@Req() req: Request) {
    const userId = req.user['id']; // Assuming the JWT payload contains the user ID
    const user = await this.userService.getUserById(userId);

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    return { success: true, data: user };
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Put('profil')
  async updateProfile(@Req() req, @Body() updateUserDto: ModifyUserDto) {
    //console.log('Request received:', req.user);
    //console.log('Update data:', updateUserDto);
    
    return this.userService.updateUser(req.user.id, updateUserDto);
  }

  /**
   * Get user by email
   * @param email - User email
   */
  @Get(':email')
  @UseGuards(AuthGuard('jwt'))
  async getUser(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  /**
   * Get all users
   */
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Put('modify')
  @UseGuards(AuthGuard('jwt'))
  async modify(@Req() req: Request, @Body() updateData: ModifyUserDto) {
    return this.userService.modify(req.user['id'], updateData);
  }

  @Put('change-password')
  @UseGuards(AuthGuard('jwt'))
  async changePassword(@Req() req: Request, @Body() data: ChangePasswordDto) {
    return this.userService.changePassword(req.user['id'], data.oldPassword, data.newPassword);
  }

  /**
   * Send a friendship invitation
   * @param req - Request object containing user information
   * @param receiverId - Receiver's user ID
   */
  @Post('friendship/send')
  @UseGuards(AuthGuard('jwt'))
  async sendFriendshipInvitation(@Req() req: Request, @Body('receiverId') receiverId: number) {
    return this.userService.sendFriendshipInvitation(req.user['id'], receiverId);
  }

  /**
   * Accept a friendship invitation
   * @param req - Request object containing user information
   * @param senderId - Sender's user ID
   */
  @Post('friendship/accept')
  @UseGuards(AuthGuard('jwt'))
  async acceptFriendship(@Req() req: Request, @Body('senderId') senderId: number) {
    return this.userService.acceptFriendship(req.user['id'], senderId);
  }

  /**
   * Reject a friendship invitation
   * @param req - Request object containing user information
   * @param senderId - Sender's user ID
   */
  @Post('friendship/reject')
  @UseGuards(AuthGuard('jwt'))
  async rejectFriendship(@Req() req: Request, @Body('senderId') senderId: number) {
    return this.userService.rejectFriendship(req.user['id'], senderId);
  }

  /**
   * Delete a friend
   * @param req - Request object containing user information
   * @param friendId - Friend's user ID
   */
  @Delete('friendship/delete')
  @UseGuards(AuthGuard('jwt'))
  async deleteFriend(@Req() req: Request, @Body('friendId') friendId: number) {
    return this.userService.deleteFriend(req.user['id'], friendId);
  }

  /**
   * Block a friend
   * @param req - Request object containing user information
   * @param friendId - Friend's user ID
   */
  @Post('friendship/block')
  @UseGuards(AuthGuard('jwt'))
  async blockFriend(@Req() req: Request, @Body('friendId') friendId: number) {
    return this.userService.blockFriend(req.user['id'], friendId);
  }

 // Endpoint to enable user account
 @Patch(':id/enable')
 async enableAccount(@Param('id') userId: number) {
   return this.userService.enableAccount(userId);
 }

 // Endpoint to disable user account
 @Patch(':id/disable')
 async disableAccount(@Param('id') userId: number) {
   return this.userService.disableAccount(userId);
 } 

 @Post('/uploadBanner')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('images')) // 'image' is the field name for the file
  async uploadBanner(@Req() req: Request, // Access the request object
  @UploadedFile() file: Express.Multer.File,) {
    try {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }
      const userId = req.user.id;
      const fileUrl = await this.userService.uploadBanner(userId, file);
      return { success: true, message: 'Banner uploaded successfully', url: fileUrl };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('/uploadProfile')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('images')) // 'image' is the field name for the file
  async uploadProfile(@Req() req: Request,
  @UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }
      const userId = req.user.id;
      const fileUrl = await this.userService.uploadProfile(userId, file);
      return { success: true, message: 'Profile photo uploaded successfully', url: fileUrl };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

