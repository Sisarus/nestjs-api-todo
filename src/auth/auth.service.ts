import { Injectable } from "@nestjs/common/decorators";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService{
  constructor(private prisma: PrismaService){}
  signin(){
    return 'signup';
  }

  signup(){
    return 'signup ka';
  }
}