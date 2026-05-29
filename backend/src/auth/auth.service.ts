import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService, AppUser, UserRole } from '../users/users.service';
import { LandlordService } from '../landlord/landlord.service';
import { TenantsService } from '../tenants/tenants.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private landlordService: LandlordService,
    private tenantsService: TenantsService,
  ) {}

  async register(payload: { firstName: string; lastName: string; email: string; password: string; role: UserRole }) {
    const user = await this.usersService.createUser(payload);
    if (payload.role === 'landlord') {
      this.landlordService.initializeLandlordAccount(user.id, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
    if (payload.role === 'tenant') {
      this.tenantsService.createTenantProfile({
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
    return this.buildAuthResponse(user);
  }

  async login(email: string, password: string) {
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.buildAuthResponse(user);
  }

  private buildAuthResponse(user: AppUser) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    };
  }
}
