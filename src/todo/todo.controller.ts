import { Body, Controller, Post } from '@nestjs/common';
import { TodoDto } from './dto';
import { TodoService } from './todo.service';

@Controller('api/v1')
export class TodoController {
  constructor(private todoService: TodoService){}

  @Post('todos')
  todos(@Body() dto: TodoDto){
    return this.todoService.todo(dto);
  }
  
}
