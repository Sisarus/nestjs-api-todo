import { Injectable } from "@nestjs/common/decorators";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';

import { ForbiddenException } from "@nestjs/common";

@Injectable()
export class AuthService{
  constructor(private prisma: PrismaService){}

  async signup(dto: AuthDto){
    //generate the password hash
    const password = await argon.hash(dto.password);
    //save the new user in the db
    try { const user = await this.prisma.user.create({
      data:{
        email: dto.email,
        password 
      },
    });
      //return the saved user
      delete user.password;
      return user;
    } catch(error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Email is already in use');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto){
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });
    // if user doesnt exist throw exception
    if(!user) throw new ForbiddenException('Email or password incorrect');
    // compare password
    const pwMatches = await argon.verify(user.password, dto.password);
    // if password incorret throw exeption
    if(!pwMatches) throw new ForbiddenException('Email or password incorrect');

    // send back the user
    delete user.password;
    return user;
  }
}