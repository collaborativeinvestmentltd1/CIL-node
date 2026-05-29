import { Injectable, ConflictException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcryptjs';

export type UserRole = 'tenant' | 'landlord' | 'agent' | 'realEstate' | 'admin';

export type AppUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
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

  async createUser(payload: { firstName: string; lastName: string; email: string; password: string; role: UserRole }) {
    const existing = await this.findByEmail(payload.email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(payload.password, 10);
    const user: AppUser = {
      id: randomUUID(),
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email.toLowerCase(),
      passwordHash,
      role: payload.role,
      createdAt: new Date().toISOString(),
    };
    this.users.push(user);
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.passwordHash);
    return valid ? user : null;
  }
}
