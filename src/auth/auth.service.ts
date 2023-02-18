import { Injectable } from "@nestjs/common/decorators";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";

@Injectable()
export class AuthService{
  constructor(private prisma: PrismaService){}

  signup(dto: AuthDto){
    return 'signup ka';
  }

  signin(dto: AuthDto){
    return 'signup';
  }
}