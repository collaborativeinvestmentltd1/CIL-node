import { Injectable, ConflictException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcryptjs';

export type UserRole = 'tenant' | 'landlord' | 'admin' | 'agent' | 'realEstate';

export type AppUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash?: string;
  profilePicture?: string;
  role: UserRole;
  oauthProvider?: string; // 'google', 'linkedin', etc.
  oauthId?: string; // ID from OAuth provider
  kycStatus?: 'pending' | 'approved' | 'rejected'; // For real estates
  createdAt: string;
  updatedAt?: string;
};

@Injectable()
export class UsersService {
  private users: AppUser[] = [];

  async findByEmail(email: string) {
    return this.users.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async findById(id: string) {
    return this.users.find((user) => user.id === id) || null;
  }

  async createUser(payload: { 
    firstName: string; 
    lastName: string; 
    email: string; 
    password?: string; 
    role: UserRole;
    oauthProvider?: string;
    oauthId?: string;
    profilePicture?: string;
  }) {
    const existing = await this.findByEmail(payload.email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = payload.password ? await bcrypt.hash(payload.password, 10) : undefined;
    const user: AppUser = {
      id: randomUUID(),
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email.toLowerCase(),
      ...(passwordHash && { passwordHash }),
      ...(payload.profilePicture && { profilePicture: payload.profilePicture }),
      role: payload.role,
      ...(payload.oauthProvider && { oauthProvider: payload.oauthProvider }),
      ...(payload.oauthId && { oauthId: payload.oauthId }),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.users.push(user);
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) return null;
    if (!user.passwordHash) return null; // OAuth users don't have passwords
    const valid = await bcrypt.compare(password, user.passwordHash);
    return valid ? user : null;
  }

  async findOrCreateOAuthUser(profile: {
    email: string;
    firstName: string;
    lastName: string;
    picture?: string;
    provider: string;
    providerId: string;
  }) {
    let user = await this.findByEmail(profile.email);
    if (user) {
      // If user exists but doesn't have this OAuth provider, add it
      if (!user.oauthProvider) {
        user.oauthProvider = profile.provider;
        user.oauthId = profile.providerId;
        if (profile.picture) {
          user.profilePicture = profile.picture;
        }
      }
      return user;
    }
    // Create new user from OAuth (role will be set after user selection)
    return this.createUser({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      profilePicture: profile.picture,
      oauthProvider: profile.provider,
      oauthId: profile.providerId,
      role: 'tenant', // Default role, user can change later
    });
  }
}
