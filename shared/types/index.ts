// User Types
export type UserRole = "admin" | "corporate" | "tenant" | "visitor";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// Property Types
export type PropertyType =
  | "apartment"
  | "house"
  | "duplex"
  | "office"
  | "commercial";
export type PropertyStatus = "available" | "occupied" | "maintenance";

export interface Property {
  id: string;
  title: string;
  description: string;
  propertyType: PropertyType;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  status: PropertyStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Tenant Application Types
export type ApplicationStatus =
  | "pending"
  | "under_review"
  | "approved"
  | "rejected";

export interface TenantApplication {
  id: string;
  tenantId: string;
  propertyId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  employmentStatus: string;
  monthlyIncome: number;
  moveInDate: Date;
  meansOfIdentification: string;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Payment Types
export type PaymentStatus = "pending" | "completed" | "failed";

export interface Payment {
  id: string;
  tenantId: string;
  propertyId: string;
  amount: number;
  status: PaymentStatus;
  reference: string;
  paystackId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Service Request Types
export type ServiceRequestStatus = "pending" | "in_progress" | "resolved";

export interface ServiceRequest {
  id: string;
  tenantId: string;
  propertyId: string;
  description: string;
  images: string[];
  status: ServiceRequestStatus;
  createdAt: Date;
  updatedAt: Date;
}
