import { Injectable } from '@nestjs/common';
import { Message } from '@rxjs-dos/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
