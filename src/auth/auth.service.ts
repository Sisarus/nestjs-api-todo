import { Injectable } from "@nestjs/common/decorators";

@Injectable()
export class AuthService{
  signin(){
    return 'signup';
  }

  signup(){
    return 'signup';
  }
}