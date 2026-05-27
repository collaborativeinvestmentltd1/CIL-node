import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { firstName: string; lastName: string; email: string; password: string; role: string }) {
    const result = await this.authService.register({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password,
      role: body.role as any,
    });
    return {
      success: true,
      data: result,
      message: 'User registered successfully',
    };
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const result = await this.authService.login(body.email, body.password);
    return {
      success: true,
      data: result,
      message: 'Login successful',
    };
  }

  @Post('oauth/google')
  async loginWithGoogle(@Body() body: {
    email: string;
    firstName: string;
    lastName: string;
    picture?: string;
    googleId: string;
  }) {
    const result = await this.authService.loginWithOAuth({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      picture: body.picture,
      provider: 'google',
      providerId: body.googleId,
    });
    return {
      success: true,
      data: result,
      message: 'OAuth login successful',
    };
  }

  @Post('oauth/linkedin')
  async loginWithLinkedIn(@Body() body: {
    email: string;
    firstName: string;
    lastName: string;
    picture?: string;
    linkedInId: string;
  }) {
    const result = await this.authService.loginWithOAuth({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      picture: body.picture,
      provider: 'linkedin',
      providerId: body.linkedInId,
    });
    return {
      success: true,
      data: result,
      message: 'OAuth login successful',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req: any) {
    return {
      success: true,
      data: { user: req.user },
      message: 'User profile retrieved',
    };
  }
}
