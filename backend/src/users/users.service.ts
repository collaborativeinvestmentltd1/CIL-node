import { Injectable, ConflictException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcryptjs';

export type UserRole = 'tenant' | 'landlord' | 'agent' | 'realEstate' | 'admin' | 'operations' | 'finance';

export type AppUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName?: string;
  companyWebsite?: string;
  dateOfBirth?: string;
  gender?: string;
  country?: string;
  state?: string;
  lga?: string;
  address?: string;
  nin?: string;
  bvn?: string;
  verificationStatus?: 'pending' | 'verified' | 'rejected';
  employer?: string;
  occupation?: string;
  incomeRange?: string;
  nextOfKin?: string;
  guarantor?: string;
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

  async createUser(payload: { firstName: string; lastName: string; email: string; password: string; role: UserRole; phone?: string; companyName?: string; companyWebsite?: string; dateOfBirth?: string; gender?: string; country?: string; state?: string; lga?: string; address?: string; nin?: string; bvn?: string; employer?: string; occupation?: string; incomeRange?: string; nextOfKin?: string; guarantor?: string; }) {
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
      phone: payload.phone,
      companyName: payload.companyName,
      companyWebsite: payload.companyWebsite,
      dateOfBirth: payload.dateOfBirth,
      gender: payload.gender,
      country: payload.country,
      state: payload.state,
      lga: payload.lga,
      address: payload.address,
      nin: payload.nin,
      bvn: payload.bvn,
      employer: payload.employer,
      occupation: payload.occupation,
      incomeRange: payload.incomeRange,
      nextOfKin: payload.nextOfKin,
      guarantor: payload.guarantor,
      verificationStatus: 'pending',
      passwordHash,
      role: payload.role,
      createdAt: new Date().toISOString(),
    };
    this.users.push(user);
    return user;
  }

  async updateUserProfile(id: string, updates: Partial<Omit<AppUser, 'id' | 'email' | 'passwordHash' | 'role' | 'createdAt'>>) {
    const user = await this.findById(id);
    if (!user) return null;
    Object.assign(user, updates);
    if (updates.nin || updates.bvn || updates.dateOfBirth || updates.address) {
      user.verificationStatus = user.verificationStatus || 'pending';
    }
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.passwordHash);
    return valid ? user : null;
  }
}
