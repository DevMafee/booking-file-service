import { Module } from '@nestjs/common';
import { ReadModuleList } from './read-module-list';

@Module({
  imports: [...ReadModuleList],
  controllers: [],
  providers: [],
})
export class ReadAppModule {}
