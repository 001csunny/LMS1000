import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@CurrentUser() user: { id: number }) {
    return this.usersService.findMe(user.id);
  }

  @Put('me')
  updateMe(
    @CurrentUser() user: { id: number },
    @Body() body: { username?: string; email?: string; speechToken?: string },
  ) {
    return this.usersService.updateMe(user.id, body);
  }

  @Patch('me/password')
  updatePassword(
    @CurrentUser() user: { id: number },
    @Body() body: { currentPassword: string; newPassword: string },
  ) {
    return this.usersService.updatePassword(
      user.id,
      body.currentPassword,
      body.newPassword,
    );
  }

  @Patch('me/xp')
  addXp(
    @CurrentUser() user: { id: number },
    @Body('amount') amount: number,
  ) {
    return this.usersService.addXp(user.id, amount);
  }

  @Patch('me/streak')
  incrementStreak(@CurrentUser() user: { id: number }) {
    return this.usersService.incrementStreak(user.id);
  }

  @Get('leaderboard')
  getLeaderboard() {
    return this.usersService.getLeaderboard();
  }

  // Admin only: view all users
  @Get()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  findAll() {
    return this.usersService.findAll();
  }

  // Admin only: create new user
  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }
}
