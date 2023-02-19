import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { TodoDto } from './dto';

@Injectable()
export class TodoService {
  todo(dto: TodoDto, user: User){
    return 'toto onnistui ' + dto + ' ' + user.id;
  }
}
