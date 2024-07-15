import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
// import { EmployeeService } from '../employee/employee.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UserService,
    // private employeeService: EmployeeService
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

  @Post('signup')
  async signup(@Body() data: { login: string; password: string; roles: string }, @Res() res) {

    const user = await this.usersService.createUser(data);

    res.status(200).send(user);

  }

  @Post('signup/hr')
  async signupHr(@Body() data: { login: string; password: string }, @Res() res) {

    const roles = 'HR_MANAGER';

    const user = await this.usersService.createUser({ ...data, roles });

    res.status(200).send(user);
  }



}
