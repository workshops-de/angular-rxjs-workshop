import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface Todo extends InMemoryDBEntity {
  text: string;
  isComplete: boolean;
  isPinned: boolean;
}
