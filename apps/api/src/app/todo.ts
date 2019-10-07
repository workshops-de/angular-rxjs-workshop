import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface Todo extends InMemoryDBEntity {
  text: string;
  isComplete: string;
}
