import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtAuthModule } from '../middlewares/jwt.module';

import { databaseConfig } from '../config/database';

import { UsersController } from './controller/users.controller';

import { UsersService } from './service/users.service';

import { User, UserSchemaFactory } from './users.schema';

@Module({
  imports: [
    databaseConfig,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchemaFactory }]),
    JwtAuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, Logger],
})
export class UserModule {}
