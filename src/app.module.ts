import { Module } from '@nestjs/common';
import { AlphaModule } from './modules/alpha.module';

@Module({
  imports: [AlphaModule]
})
export class AppModule {}
