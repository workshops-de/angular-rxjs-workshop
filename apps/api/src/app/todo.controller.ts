import { Controller, Get, HttpException } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Todo } from './todo';

@Controller()
export class TodoController {
  constructor(private readonly todosInMemory: InMemoryDBService<Todo>) {
    this.initializeFakeData();
  }

  @Get()
  todos() {
    return this.todosInMemory.getAll();
  }

  @Get()
  todosEmpty() {
    return this.todosInMemory.getAll();
  }

  @Get()
  todosFlaky() {
    return Math.random() > 0.5
      ? this.todosInMemory.getAll()
      : new HttpException();
  }

  @Get()
  todosDelayed() {
    return this.todosInMemory.getAll();
  }

  private initializeFakeData() {
    this.todosInMemory.create({ id: 1, text: 'Buy 🥛' });
    this.todosInMemory.create({ id: 2, text: 'Go 🏃‍♀️' });
    this.todosInMemory.create({ id: 3, text: 'Build 🏡️' });
  }
}
