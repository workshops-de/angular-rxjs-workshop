import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Put
} from '@nestjs/common';
import * as faker from 'faker';
import { Todo } from './todo';

@Controller()
export class TodoController {
  constructor(private readonly todosInMemory: InMemoryDBService<Todo>) {
    this.initializeFakeData();
    this.every3Seconds(() => this.changeFakeData());
  }

  @Get()
  async todos() {
    await this.takeABreak();
    this.flipCoin();

    return this.todosInMemory.getAll();
  }

  @Put(':id')
  async update(@Body() todo: Todo) {
    await this.takeABreak();

    this.flipCoin();
    this.todosInMemory.update(todo);
    return Promise.resolve(this.todosInMemory.get(todo.id));
  }

  private initializeFakeData() {
    this.todosInMemory.create({
      id: '1',
      text: 'Buy 🥛',
      isComplete: true,
      isPinned: true
    });
    this.todosInMemory.create({
      id: '2',
      text: 'Go 🏃‍♀️',
      isComplete: false,
      isPinned: false
    });
    this.todosInMemory.create({
      id: '3',
      text: 'Build 🏡️',
      isComplete: true,
      isPinned: false
    });
  }

  private flipCoin() {
    if (faker.random.boolean()) {
      throw new HttpException(
        {
          status: HttpStatus.SERVICE_UNAVAILABLE,
          error: 'Sorry, the chance is 50:50 that a request succeeds.'
        },
        503
      );
    }
  }

  private takeABreak(): Promise<void> {
    const between1To3Seconds = faker.random.number({ min: 1000, max: 3000 });

    return new Promise((resolve) =>
      setTimeout(() => resolve(), between1To3Seconds)
    );
  }

  private changeFakeData() {
    [4, 5, 6, 7].forEach((id) =>
      this.todosInMemory.update({
        id: `${id}`,
        text: `⏱ ${faker.random.arrayElement([
          'make ⛱',
          'read 📚',
          'eat 🥒',
          'hug 👨‍👩‍👧‍👧'
        ])}`,
        isComplete: faker.random.boolean(),
        isPinned: faker.random.boolean()
      })
    );
  }

  private every3Seconds(fn: () => void) {
    setInterval(() => fn(), 3000);
  }
}
