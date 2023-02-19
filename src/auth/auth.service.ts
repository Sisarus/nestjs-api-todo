import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';

import { Injectable, ForbiddenException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService){}

  async signup(dto: AuthDto){
    console.log("his " + dto.password);
    //generate the password hash
    const password = await argon.hash(dto.password);
    //save the new user in the db
    try { const user = await this.prisma.user.create({
      data:{
        email: dto.email,
        password 
      },
    });

    //return jwt-token
    return this.signToken(user.id, user.email);
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

    //return jwt-token
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '15m',
        secret: secret,
      },
    );

    return {
      access_token: token,
    };
  }
}