import { Injectable } from '@nestjs/common';

export type TenantProfile = {
  userId: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  unit?: string;
  balance?: number;
  documents?: string[];
};

@Injectable()
export class TenantsService {
  private tenants: Record<string, TenantProfile> = {};

  createTenantProfile(payload: { userId: string; firstName: string; lastName: string; email: string }) {
    const profile: TenantProfile = {
      userId: payload.userId,
      id: payload.userId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      createdAt: new Date().toISOString(),
      balance: 0,
      documents: [],
    };
    this.tenants[payload.userId] = profile;
    return profile;
  }

  getTenantByUserId(userId: string) {
    return this.tenants[userId] || null;
  }

  addDocument(userId: string, url: string) {
    const tenant = this.tenants[userId];
    if (!tenant) return null;
    tenant.documents = tenant.documents || [];
    tenant.documents.push(url);
    return tenant;
  }
}
