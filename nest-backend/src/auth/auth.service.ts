import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config'; // Import ConfigService


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService, // 2. Inject JwtService
    private configService: ConfigService, // Inject ConfigService
  ) {}

  private generateToken(user: any): string {
    const payload = { userId: user._id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }
  async verifyToken(token) {
    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      const payload = await this.jwtService.verifyAsync(token, {
        secret,
      });
      return payload;
    } catch (error) {
      console.log(error);
    }
  }

  async signup({
    email,
    role,
    address,
    name,
    dateOfBirth,
    profileImage,
    password,
  }) {
    let user = await this.usersService.getUserByEmail(email, true);
    if (user) throw new UnauthorizedException('User already exists');
    if (!user) {
      user = await this.usersService.createUser({
        email,
        role,
        address,
        name,
        dateOfBirth,
        profileImage,
        password,
      });
    }
    // 3. Generate a token upon successful signup
    const token = this.generateToken(user);
    const userWithoutPassword = await this.usersService.getUserByID(user._id);
    return {
      user: userWithoutPassword,
      token,
      message: 'User successfully registered',
    };
  }

  async loginWithEmail(email, password) {
    const user = await this.usersService.getUserByEmail(email, true);
    if (!user) throw new NotFoundException('User account not found');

    if (!(await user.matchPassword(password)))
      throw new UnauthorizedException('Incorrect email or password');

    const token = this.generateToken(user);
    const userWithoutPassword = await this.usersService.getUserByID(user._id);
    return {
      user: userWithoutPassword,
      token,
      message: 'User loggedin successfully',
    };
  }
}
