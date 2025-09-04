import { AuthGuard } from './auth-guard.guard';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../users/users.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: {
            verifyToken: jest.fn().mockResolvedValue({ userId: 'someUserId' }),
          },
        },
        {
          provide: UsersService,
          useValue: {
            getUserByID: jest.fn().mockResolvedValue({ id: 'someUserId' }),
          },
        },
      ],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });
});
