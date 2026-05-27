export type Tenant = {
  id: string;
  name: string;
  unit: string;
  lastPaymentDate?: string;
  docs?: string[];
};

export type TenantAgreement = {
  id: string;
  tenantId: string;
  landlordId: string;
  title: string;
  summary: string;
  status: 'active' | 'pending' | 'signed' | 'archived';
  updatedAt: string;
};

export type Landlord = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  landlordId?: string;
  payments?: Payment[];
  agreements?: TenantAgreement[];
};

export type Property = {
  id?: string;
  title: string;
  location: string;
  units?: string;
  price?: string;
  type?: string;
};

export type Message = {
  id?: string;
  audience: "all" | "tenant";
  tenantId?: string;
  title: string;
  message: string;
  expiresAt?: string;
};

export type Payment = {
  id?: string;
  landlordId?: string;
  tenantId: string;
  propertyId?: string;
  amount: number;
  date: string;
  reference?: string;
};
