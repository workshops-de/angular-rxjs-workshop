import { Module } from '@nestjs/common';

import { TodoController } from './todo.controller';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  imports: [InMemoryDBModule.forRoot()],
  controllers: [TodoController]
})
export class AppModule {}
