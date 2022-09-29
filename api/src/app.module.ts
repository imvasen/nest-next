import { Module } from '@nestjs/common';

import { AppController } from '@api/app.controller';
import { AuthModule } from '@api/auth/auth.module';
import { AppService } from '@api/app.service';
import { CommonModule } from '@api/common';

@Module({
  imports: [CommonModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
