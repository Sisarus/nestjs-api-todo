import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PasswordDto } from './dto';

@Injectable()
export class UserService {
  changePassword(dto: PasswordDto, user: User){
    return 'Muutos onnistui ' + dto.password + " " + user;
  }
}
