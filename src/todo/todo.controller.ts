import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { User } from '@prisma/client';
import { TodoDto } from './dto';
import { TodoService } from './todo.service';
import { GetUser} from '../auth/decorator'

@UseGuards(AuthGuard('jwt'))
@Controller('api/v1')
export class TodoController {
  constructor(private todoService: TodoService){}

  @Post('todos')
  todos(@Body() dto: TodoDto, @GetUser() user: User){
    return this.todoService.addTodo(dto, user);
  }

  // @Get('todo')
  // todo(@Req() req: Request) {
  //   return 'Todo-list';
  // }
  
  @Delete('todos/:id')
  async deletePost(@Param('id') id: string) {
    return this.todoService.deleteTodo(id);
  }
}
