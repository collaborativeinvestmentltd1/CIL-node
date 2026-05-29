import { Injectable } from '@nestjs/common';

export type Tenant = {
  id: string;
  name: string;
  unit: string;
  lastPaymentDate?: string;
  documents?: string[];
  balance?: number;
};

export type Property = {
  id: string;
  title: string;
  location: string;
  description?: string;
  price?: number;
  type?: string;
  units?: string;
  status?: 'active' | 'archived';
};

export type Payment = {
  id: string;
  landlordId: string;
  tenantId: string;
  propertyId?: string;
  amount: number;
  date: string;
  reference?: string;
  status: 'pending' | 'paid' | 'failed';
};

export type Message = {
  id: string;
  audience: 'all' | 'tenant';
  tenantId?: string;
  title: string;
  message: string;
  createdAt: string;
  expiresAt?: string;
};

export type TenantAgreement = {
  id: string;
  tenantId: string;
  landlordId: string;
  title: string;
  status: 'active' | 'pending' | 'signed' | 'archived';
  summary: string;
  updatedAt: string;
};

export type TenantRequest = {
  id: string;
  tenantId: string;
  landlordId: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'open' | 'closed';
};

export type LandlordProfile = {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
};

@Injectable()
export class LandlordService {
  private tenants: Record<string, Tenant[]> = {};
  private properties: Record<string, Property[]> = {};
  private payments: Record<string, Payment[]> = {};
  private messages: Record<string, Message[]> = {};
  private profiles: Record<string, LandlordProfile> = {};
  private tenantLandlords: Record<string, string[]> = {};
  private tenantAgreements: Record<string, TenantAgreement[]> = {};
  private tenantRequests: Record<string, TenantRequest[]> = {};

  constructor() {
    // seed example data for local development
    this.tenants['landlord-1'] = [
      { id: 't1', name: 'Jane Doe', unit: 'Unit 3A', lastPaymentDate: '2026-05-02', balance: 0 },
      { id: 't2', name: 'Kemi A.', unit: 'Unit 5B', lastPaymentDate: '2026-05-10', balance: 120000 },
    ];
    this.properties['landlord-1'] = [
      { id: 'p1', title: 'Maple Apartments', location: 'Ikeja', description: '3-bed apartments with secure parking', price: 85000, type: 'Apartment', units: '15', status: 'active' },
      { id: 'p2', title: 'Riverside Villas', location: 'Lekki', description: 'Luxury villas with waterfront access', price: 220000, type: 'Villa', units: '8', status: 'active' },
    ];
    this.payments['landlord-1'] = [
      { id: 'pay_1', landlordId: 'landlord-1', tenantId: 't1', propertyId: 'p1', amount: 185000, date: '2026-05-02', reference: 'PSK_1234', status: 'paid' },
    ];
    this.messages['landlord-1'] = [
      { id: 'm1', audience: 'all', title: 'Maintenance Notice', message: 'Water outage scheduled for Sunday 4th June.', createdAt: new Date().toISOString(), expiresAt: '2026-06-05' },
    ];
    this.tenantLandlords['t1'] = ['landlord-1'];
    this.tenantLandlords['t2'] = ['landlord-1'];
    this.tenantAgreements['t1'] = [
      {
        id: 'a1',
        tenantId: 't1',
        landlordId: 'landlord-1',
        title: 'Unit 3A lease',
        status: 'active',
        summary: '12-month lease, 2-bed property, rent paid through June',
        updatedAt: '2026-05-02',
      },
    ];
    this.tenantAgreements['t2'] = [
      {
        id: 'a2',
        tenantId: 't2',
        landlordId: 'landlord-1',
        title: 'Unit 5B tenancy',
        status: 'active',
        summary: '6-month lease with utilities included',
        updatedAt: '2026-05-10',
      },
    ];
    this.tenantRequests['t1'] = [];
    this.tenantRequests['t2'] = [];
  }

  getTenants(landlordId: string) {
    return this.tenants[landlordId] || [];
  }

  getTenant(landlordId: string, tenantId: string) {
    return (this.tenants[landlordId] || []).find((tenant) => tenant.id === tenantId) || null;
  }

  getProperties(landlordId: string) {
    return this.properties[landlordId] || [];
  }

  getPropertyById(propertyId: string) {
    const allProperties = Object.values(this.properties).flat();
    return allProperties.find((property) => property.id === propertyId) || null;
  }

  isPropertyOwnedBy(landlordId: string, propertyId: string) {
    return (this.properties[landlordId] || []).some((property) => property.id === propertyId);
  }

  createProperty(landlordId: string, payload: Partial<Property>) {
    const p: Property = {
      id: `p_${Date.now()}`,
      title: payload.title || 'Untitled Property',
      location: payload.location || '',
      description: payload.description,
      price: payload.price,
      type: payload.type,
      units: payload.units,
      status: 'active',
    };
    if (!this.properties[landlordId]) this.properties[landlordId] = [];
    this.properties[landlordId].push(p);
    return p;
  }

  updateProperty(landlordId: string, propertyId: string, update: Partial<Property>) {
    const properties = this.properties[landlordId] || [];
    const property = properties.find((item) => item.id === propertyId);
    if (!property) return null;
    Object.assign(property, update);
    return property;
  }

  deleteProperty(landlordId: string, propertyId: string) {
    if (!this.properties[landlordId]) return false;
    this.properties[landlordId] = this.properties[landlordId].map((item) =>
      item.id === propertyId ? { ...item, status: 'archived' } : item,
    );
    return true;
  }

  initializeLandlordAccount(landlordId: string, payload: { firstName: string; lastName: string; email: string }) {
    if (this.profiles[landlordId]) {
      return this.profiles[landlordId];
    }

    this.profiles[landlordId] = {
      id: landlordId,
      userId: landlordId,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      createdAt: new Date().toISOString(),
    };
    this.tenants[landlordId] = this.tenants[landlordId] || [];
    this.properties[landlordId] = this.properties[landlordId] || [];
    this.payments[landlordId] = this.payments[landlordId] || [];
    this.messages[landlordId] = this.messages[landlordId] || [];
    return this.profiles[landlordId];
  }

  getTenantPayments(landlordId: string, tenantId: string) {
    return (this.payments[landlordId] || []).filter((payment) => payment.tenantId === tenantId);
  }

  getPayments(landlordId: string) {
    return this.payments[landlordId] || [];
  }

  addPayment(landlordId: string, payment: Payment) {
    if (!this.payments[landlordId]) this.payments[landlordId] = [];
    const paymentWithLandlord = { ...payment, landlordId };
    this.payments[landlordId].push(paymentWithLandlord);
    this.registerTenantUnderLandlord(payment.tenantId, landlordId);

    const tenant = this.getTenant(landlordId, payment.tenantId);
    if (tenant) {
      tenant.lastPaymentDate = payment.date;
      tenant.balance = (tenant.balance || 0) - payment.amount;
    }

    return paymentWithLandlord;
  }

  registerTenantUnderLandlord(tenantId: string, landlordId: string) {
    if (!this.tenantLandlords[tenantId]) this.tenantLandlords[tenantId] = [];
    if (!this.tenantLandlords[tenantId].includes(landlordId)) {
      this.tenantLandlords[tenantId].push(landlordId);
    }
  }

  getLandlordsForTenant(tenantId: string) {
    const landlordIds = this.tenantLandlords[tenantId] || [];
    return landlordIds
      .map((landlordId) => ({
        ...this.profiles[landlordId],
        landlordId,
        payments: (this.payments[landlordId] || []).filter((payment) => payment.tenantId === tenantId),
        agreements: this.getTenantAgreementsForLandlord(tenantId, landlordId),
      }))
      .filter((item) => item.id);
  }

  getTenantPaymentsAcrossLandlords(tenantId: string) {
    return Object.values(this.payments)
      .flat()
      .filter((payment) => payment.tenantId === tenantId);
  }

  getTenantAgreements(tenantId: string) {
    return this.tenantAgreements[tenantId] || [];
  }

  getTenantAgreementsForLandlord(tenantId: string, landlordId: string) {
    return (this.tenantAgreements[tenantId] || []).filter((agreement) => agreement.landlordId === landlordId);
  }

  getTenantRequests(tenantId: string) {
    return this.tenantRequests[tenantId] || [];
  }

  sendTenantRequest(tenantId: string, landlordId: string, payload: { subject: string; message: string }) {
    const request: TenantRequest = {
      id: `req_${Date.now()}`,
      tenantId,
      landlordId,
      subject: payload.subject,
      message: payload.message,
      createdAt: new Date().toISOString(),
      status: 'open',
    };
    if (!this.tenantRequests[tenantId]) this.tenantRequests[tenantId] = [];
    this.tenantRequests[tenantId].push(request);
    return request;
  }

  getMessages(landlordId: string, audience?: 'all' | 'tenant', tenantId?: string) {
    const messages = this.messages[landlordId] || [];
    return messages.filter((message) => {
      if (message.audience === 'all') return true;
      if (message.audience === 'tenant' && tenantId) return message.tenantId === tenantId;
      return false;
    });
  }

  postMessage(landlordId: string, payload: Partial<Message>) {
    const message: Message = {
      id: `msg_${Date.now()}`,
      audience: payload.audience || 'all',
      tenantId: payload.tenantId,
      title: payload.title || 'Announcement',
      message: payload.message || '',
      createdAt: new Date().toISOString(),
      expiresAt: payload.expiresAt,
    };
    if (!this.messages[landlordId]) this.messages[landlordId] = [];
    this.messages[landlordId].push(message);
    return message;
  }

  computeRank(landlordId: string) {
    const count = (this.properties[landlordId] || []).filter((item) => item.status === 'active').length;
    if (count >= 10) return { rank: 'Property Manager', propertiesCount: count };
    if (count >= 3) return { rank: 'Portfolio Owner', propertiesCount: count };
    return { rank: 'House Owner', propertiesCount: count };
  }
}
