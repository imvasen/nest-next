import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { cache, typeorm } from '@api/config';

@Module({
  imports: [CacheModule.register(cache), TypeOrmModule.forRoot(typeorm)],
})
export class CommonModule {}
