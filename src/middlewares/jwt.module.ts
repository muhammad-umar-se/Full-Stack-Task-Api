import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { jwtConstants } from '../utils/constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants?.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  exports: [JwtModule],
})
export class JwtAuthModule {}
