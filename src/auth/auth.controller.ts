import { Controller, Post } from "@nestjs/common/decorators";
import { sign } from "crypto";
import { AuthService } from "./auth.service";

@Controller('api/v1')
export class AuthController {
  constructor(private authService: AuthService){}

  @Post('signup')
  signup() {
    return this.authService.signup;
  }

  @Post('signin')
  signin(){
    return this.authService.signin;
  }
}