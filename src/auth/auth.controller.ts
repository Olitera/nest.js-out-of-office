import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UserService,
  ) {}

  @Post('login')
  async login(@Body() data: { login: string; password: string }, @Res() res) {
    const user = await this.usersService.getUserByLogin(data.login);
    const accessToken = this.authService.generateAccessToken({
      userId: user.id,
      login: user.login,
    });
    const refreshToken = this.authService.generateRefreshToken({
      userId: user.id,
      login: user.login,
    });
    res.status(200).send({ accessToken, refreshToken });
  }

  // @Post('signup')
  // async signup(
  //   @Body() data: { login: string; password: string; roles: string },
  //   @Res() res,
  // ) {
  //   const user = await this.usersService.createUser(data);
  //   res.status(200).send(user);
  // }

  @Post('signup/hr')
  async signupHr(
    @Body() data: { login: string; password: string },
    @Res() res,
  ) {
    const roles = 'HR_MANAGER';
    try {
      const user = await this.usersService.createUser({ ...data, roles });
      res.status(200).send(user);
    } catch (e) {
      if (/Unique/.test(e.message)) {
        res
          .status(403)
          .send({ message: 'User already exists', statusCode: 403 });
      }
      throw Error(e.message);
    }
  }

  @Post('signup/manager')
  async signupManager(
    @Body() data: { login: string; password: string },
    @Res() res,
  ) {
    const roles = 'PROJECT_MANAGER';
    const user = await this.usersService.createUser({ ...data, roles });
    res.status(200).send(user);
  }

  @Post('signup/employee')
  async signupEmployee(
    @Body() data: { login: string; password: string },
    @Res() res,
  ) {
    const roles = 'EMPLOYEE';
    const user = await this.usersService.createUser({ ...data, roles });
    res.status(200).send(user);
  }

  @Post('signup/admin')
  async signupAdmin(
    @Body() data: { login: string; password: string },
    @Res() res,
  ) {
    const roles = 'ADMIN';
    const user = await this.usersService.createUser({ ...data, roles });
    res.status(200).send(user);
  }
}
