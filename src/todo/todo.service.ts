import { PrismaService } from "src/prisma/prisma.service";
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { TodoDto } from './dto';
import { Status } from './enum';

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
          status: dto.status,
          userId: user.id
        }
      })
      return {message: 'New Todo : ' + todo.name };
    } catch(error) {
      throw error;
    }
  }

  async findTodosByName(status: Status, user: User){
    if(status.length === 0){
      try {
        const allTodos = await this.prisma.todo.findMany({
          where:{
            userId: user.id
          }
        });

        return allTodos;
      } catch(error) {
        throw error;
      }
    }
    try {
      const todos = await this.prisma.todo.findMany({
        where:{
          status: status,
          userId: user.id
        }
      })
      return todos;
    } catch(error) {
      throw error;
    }
  }

  async updateTodo(todoId: number, dto: TodoDto, user: User){
    try{
      // if right user for todo
      const todoRightOwner= await this.prisma.todo.findFirst({
        where:{
          id: todoId,
          userId: user.id
        }
      })
      // Deny if owner false
      if(todoRightOwner == null) throw new ForbiddenException('Permission denied');

      const todo = await this.prisma.todo.update({
        where:{
          id: todoId
        },
        data: {
          name: dto.name,
          description: dto.description,
          status: dto.status,
        }
      })
      return {message: 'Updated : ' + todo.name};
    } catch(error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == 'P2025') {
          throw new ForbiddenException('Todo is not in Database');
        }
      }
      throw error;
    }
  }

  async deleteTodo(todoId: number, user: User){
    try{
      // if right user for todo
      const todoRightOwner= await this.prisma.todo.findFirst({
        where:{
          id: todoId,
          userId: user.id
        }
      })
      // Deny if owner false
      if(todoRightOwner == null) throw new ForbiddenException('Permission denied');

      const todo = await this.prisma.todo.delete({
        where:{
          id: todoId,
        },
        select: {
          name: true,
        }
      })

      return {message: 'removed todo ' + todo.name};
    } catch(error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == 'P2025') {
          throw new ForbiddenException('Todo is not in Database');
        }
      }
      throw error;
    }

  }
}
