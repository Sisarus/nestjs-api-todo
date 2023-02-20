import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { User } from '@prisma/client';
import { TodoDto} from './dto';
import { Status } from './enum';
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

  @Get('todos')
  getTodos(@Query('status') status: Status, @GetUser() user: User) {
    return this.todoService.findTodosByName(status, user);
  }

  @Put('todos/:id')
  async updatePost(@Param('id', ParseIntPipe) id: number, @Body() dto: TodoDto, @GetUser() user: User){
    return this.todoService.updateTodo(id, dto, user);
  }
  
  @Delete('todos/:id')
  async deletePost(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.todoService.deleteTodo(id, user);
  }
}
