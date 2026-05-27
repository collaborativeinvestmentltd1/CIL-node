import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { randomUUID } from 'crypto';

export type RealEstateCompany = {
  id: string;
  userId: string;
  companyName: string;
  registrationNumber: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  website?: string;
  logo?: string;
  kycStatus: 'pending' | 'approved' | 'rejected';
  kycDocuments?: {
    businessRegistration?: string;
    taxId?: string;
    identification?: string;
  };
  commissionPercentage: number; // CIL takes this percentage
  status: 'active' | 'inactive' | 'suspended';
  totalProperties?: number;
  totalAgents?: number;
  rating?: number;
  numberOfReviews?: number;
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
  createdAt: string;
  updatedAt?: string;
};

@Injectable()
export class RealEstateService {
  private companies: RealEstateCompany[] = [];

  async createCompany(payload: {
    userId: string;
    companyName: string;
    registrationNumber: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    website?: string;
    commissionPercentage?: number;
  }) {
    // Check if registration number already exists
    const existing = this.companies.find(
      (c) => c.registrationNumber === payload.registrationNumber,
    );
    if (existing) {
      throw new ConflictException('Registration number already registered');
    }

    const company: RealEstateCompany = {
      id: randomUUID(),
      userId: payload.userId,
      companyName: payload.companyName,
      registrationNumber: payload.registrationNumber,
      email: payload.email,
      phone: payload.phone,
      address: payload.address,
      city: payload.city,
      state: payload.state,
      country: payload.country,
      website: payload.website,
      kycStatus: 'pending',
      commissionPercentage: payload.commissionPercentage || 15, // Default 15%
      status: 'inactive',
      totalProperties: 0,
      totalAgents: 0,
      rating: 0,
      numberOfReviews: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.companies.push(company);
    return company;
  }

  async getCompanyByUserId(userId: string) {
    return this.companies.find((c) => c.userId === userId) || null;
  }

  async getCompanyById(id: string) {
    const company = this.companies.find((c) => c.id === id);
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async updateCompany(id: string, updates: Partial<RealEstateCompany>) {
    const company = await this.getCompanyById(id);
    Object.assign(company, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    return company;
  }

  async uploadKYCDocuments(
    id: string,
    documents: RealEstateCompany['kycDocuments'],
  ) {
    return this.updateCompany(id, { kycDocuments: documents });
  }

  async setBankDetails(
    id: string,
    bankDetails: RealEstateCompany['bankDetails'],
  ) {
    return this.updateCompany(id, { bankDetails });
  }

  async approveKYC(id: string) {
    const company = await this.getCompanyById(id);
    company.kycStatus = 'approved';
    company.status = 'active';
    company.updatedAt = new Date().toISOString();
    return company;
  }

  async rejectKYC(id: string) {
    const company = await this.getCompanyById(id);
    company.kycStatus = 'rejected';
    company.updatedAt = new Date().toISOString();
    return company;
  }

  async getAllCompanies() {
    return this.companies;
  }

  async getApprovedCompanies() {
    return this.companies.filter((c) => c.kycStatus === 'approved');
  }

  async getPendingKYC() {
    return this.companies.filter((c) => c.kycStatus === 'pending');
  }
}
