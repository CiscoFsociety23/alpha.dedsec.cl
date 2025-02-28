import { Module } from '@nestjs/common';
import { AlphaModule } from './modules/alpha.module';
import { AuthModule } from './modules/auth.module';

@Module({
  imports: [AlphaModule, AuthModule]
})
export class AppModule {}
