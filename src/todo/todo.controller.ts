import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { TodoDto } from './dto';
import { TodoService } from './todo.service';

@Controller('api/v1')
export class TodoController {
  constructor(private todoService: TodoService){}

  @UseGuards(AuthGuard('jwt'))
  @Post('todos')
  todos(@Body() dto: TodoDto){
    return this.todoService.todo(dto);
  }

  // @Get('todo')
  // todo(@Req() req: Request) {
  //   return 'Todo-list';
  // }
  
  
}
