import { Injectable } from '@nestjs/common';
import { PasswordDto } from './dto';

@Injectable()
export class UserService {
  changePassword(dto: PasswordDto){
    return 'Muutos onnistui ' + dto.password;
  }
}
