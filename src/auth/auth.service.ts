import { Injectable } from "@nestjs/common/decorators";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';

@Injectable()
export class AuthService{
  constructor(private prisma: PrismaService){}

  signup(dto: AuthDto){
    //generate the password hash

    const hash = argon.hash(dto.password);
    

    //save the new user in the db

    //return the saved user
    return 'signup ka';
  }

  signin(dto: AuthDto){
    return 'signup';
  }
}