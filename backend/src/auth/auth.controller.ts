import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.register(body);
    res.cookie('cil_access_token', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });
    return { user: result.user };
  }

  @Post('login')
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(body.email, body.password);
    res.cookie('cil_access_token', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });
    return { user: result.user };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('cil_access_token');
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req: any) {
    return { user: req.user };
  }
}
