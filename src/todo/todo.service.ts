import { Injectable } from '@nestjs/common';
import { TodoDto } from './dto';

@Injectable()
export class TodoService {
  todo(dto: TodoDto){
    return 'toto onnistui ' + dto;
  }
}
