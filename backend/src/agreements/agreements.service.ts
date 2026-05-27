import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';

export type Agreement = {
  id: string;
  landlordId: string;
  agentId: string;
  propertyId: string;
  commissionPercentage: number;
  paymentTiming: 'after_first_payment' | 'after_full_payment';
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  startDate: string;
  endDate?: string;
  terms?: string;
  createdAt: string;
  updatedAt?: string;
};

@Injectable()
export class AgreementsService {
  private agreements: Agreement[] = [];

  async createAgreement(payload: {
    landlordId: string;
    agentId: string;
    propertyId: string;
    commissionPercentage: number;
    paymentTiming: 'after_first_payment' | 'after_full_payment';
    terms?: string;
  }) {
    if (payload.commissionPercentage < 0 || payload.commissionPercentage > 100) {
      throw new BadRequestException('Commission percentage must be between 0 and 100');
    }

    const agreement: Agreement = {
      id: randomUUID(),
      landlordId: payload.landlordId,
      agentId: payload.agentId,
      propertyId: payload.propertyId,
      commissionPercentage: payload.commissionPercentage,
      paymentTiming: payload.paymentTiming,
      status: 'pending',
      startDate: new Date().toISOString(),
      terms: payload.terms,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.agreements.push(agreement);
    return agreement;
  }

  async getAgreement(id: string) {
    const agreement = this.agreements.find((a) => a.id === id);
    if (!agreement) throw new NotFoundException('Agreement not found');
    return agreement;
  }

  async getAgreementsByAgent(agentId: string) {
    return this.agreements.filter((a) => a.agentId === agentId);
  }

  async getAgreementsByLandlord(landlordId: string) {
    return this.agreements.filter((a) => a.landlordId === landlordId);
  }

  async getAgreementsByProperty(propertyId: string) {
    return this.agreements.filter((a) => a.propertyId === propertyId);
  }

  async acceptAgreement(id: string) {
    const agreement = await this.getAgreement(id);
    agreement.status = 'accepted';
    agreement.updatedAt = new Date().toISOString();
    return agreement;
  }

  async rejectAgreement(id: string) {
    const agreement = await this.getAgreement(id);
    agreement.status = 'rejected';
    agreement.updatedAt = new Date().toISOString();
    return agreement;
  }

  async completeAgreement(id: string) {
    const agreement = await this.getAgreement(id);
    agreement.status = 'completed';
    agreement.endDate = new Date().toISOString();
    agreement.updatedAt = new Date().toISOString();
    return agreement;
  }

  async updateAgreement(id: string, updates: Partial<Agreement>) {
    const agreement = await this.getAgreement(id);
    Object.assign(agreement, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    return agreement;
  }
}
