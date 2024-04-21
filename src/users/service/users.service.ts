import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserDocument, User } from '../users.schema';

import { UserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly logger: Logger,
  ) {}

  async create(userDto: UserDto): Promise<UserDocument> {
    try {
      const hashedPassword = await bcrypt.hash(userDto.password, 10);
      const createdUser = new this.userModel({
        ...userDto,
        password: hashedPassword,
      });
      return createdUser.save();
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`);
      throw error;
    }
  }

  async findOne(email: string): Promise<UserDocument | undefined> {
    try {
      return await this.userModel.findOne({ email }).exec();
    } catch (error) {
      this.logger.error(`Error finding user: ${error.message}`);
      throw error;
    }
  }
}
