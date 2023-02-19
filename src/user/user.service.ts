import { PrismaService } from "src/prisma/prisma.service";
import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PasswordDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService,){}

  async changePassword(dto: PasswordDto, user: User){

    //get old password
    const userDB = await this.prisma.user.findUnique({
        where: {
          id: user.id,
        }
    })

    //compare old password
    const pwMatches = await argon.verify(userDB.password, dto.oldPassword);
    //throw exception if false
    if(!pwMatches) throw new ForbiddenException('old password incorrect');

    const hashPassword = await argon.hash(dto.newPassword);
    try { const updatePassword = await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashPassword
        },
      })
      return {message: 'Updated password'};
    } catch(error) {
      throw error;
    }
  }
}
