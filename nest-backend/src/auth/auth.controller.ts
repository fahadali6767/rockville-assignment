import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signupUser(@Body() bodyData: any) {
    let user = await this.authService.signup({
      email: bodyData.email,
      role: bodyData.role,
      password: bodyData.password,
      dateOfBirth: bodyData?.dateOfBirth,
      address: bodyData?.address,
      name: bodyData?.name,
      profileImage: bodyData?.profileImage,
    });
    return user;
  }

  @Post('/login')
  async login(@Body() bodyData:any){
    if(!bodyData?.email || !bodyData?.password){
      throw new NotFoundException('User account not found'); 
    }
    let loggedInUser=this.authService.loginWithEmail(bodyData?.email,bodyData?.password)
    return loggedInUser
  }
}
