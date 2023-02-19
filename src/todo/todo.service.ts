import { PrismaService } from "src/prisma/prisma.service";
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { TodoDto } from './dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService,){}

  async addTodo(dto: TodoDto, user: User){
    //add data to db
    try {
      const todo = await this.prisma.todo.create({
        data: {
          name: dto.name,
          description: dto.description,
          status: 'NotStarted',
          userId: user.id
        }
      })
      return {message: 'New Todo : ' + todo.name };
    } catch(error) {
      throw error;
    }
  }

  async deleteTodo(id: string){

    try{
      const todoId = Number(id);
      const todo = await this.prisma.todo.delete({
        where:{
          id: todoId
        }
      })
    } catch(error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == 'P2025') {
          throw new ForbiddenException('Todo is not in Database');
        }
      }
      throw error;
    }

    return {message: 'removed ' + id};
  }
}
