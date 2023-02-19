import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { TodoDto } from './dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService,){}

  async todo(dto: TodoDto, user: User){
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
}
