import {
  Controller,
  Post,
  Body,
  BadRequestException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../service/users.service';

import { UserDto } from '../dto/user.dto';

@Controller('auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  private async generateToken(email: string, userId: string) {
    const payload = { email, sub: userId };
    return this.jwtService.sign(payload);
  }

  private throwError(message: string) {
    throw new BadRequestException(message);
  }

  @Post('sign-up')
  async signUp(@Body() userDto: UserDto) {
    try {
      const existingUser = await this.usersService.findOne(userDto.email);
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const user = await this.usersService.create(userDto);
      const token = await this.generateToken(user.email, user._id);

      return {
        accessToken: token,
        message: 'User created successfully!',
      };
    } catch (error) {
      this.logger.error(`Error signing up user: ${error.message}`);
      throw error;
    }
  }

  @Post('sign-in')
  async signIn(@Body() userDto: UserDto) {
    try {
      const user = await this.usersService.findOne(userDto.email);
      if (!user || !(await bcrypt.compare(userDto.password, user.password))) {
        this.throwError('Invalid email or password !');
      }

      const token = await this.generateToken(user.email, user._id);

      return {
        accessToken: token,
        message: 'User logged in successfully!',
      };
    } catch (error) {
      this.logger.error(`Error signing in user: ${error.message}`);
      throw error;
    }
  }
}
