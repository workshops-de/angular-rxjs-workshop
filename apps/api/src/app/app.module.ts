import { Module } from '@nestjs/common';

import { TodoController } from './todo.controller';
import { AppService } from './app.service';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  imports: [InMemoryDBModule.forRoot()],
  controllers: [TodoController],
  providers: [AppService],
})
export class AppModule {}
