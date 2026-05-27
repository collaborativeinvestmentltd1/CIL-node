import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

export type AgentProfile = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  commissionPercentage: number; // Default commission percentage
  bio?: string;
  verificationStatus: 'unverified' | 'verified' | 'rejected';
  totalListingsViewd?: number;
  totalPropertiesListed?: number;
  rating?: number; // Out of 5
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
export class AgentsService {
  private agents: AgentProfile[] = [];

  async createAgentProfile(payload: {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    commissionPercentage?: number;
    phone?: string;
  }) {
    const agent: AgentProfile = {
      id: randomUUID(),
      userId: payload.userId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      commissionPercentage: payload.commissionPercentage || 5, // Default 5%
      verificationStatus: 'unverified',
      totalListingsViewd: 0,
      totalPropertiesListed: 0,
      rating: 0,
      numberOfReviews: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.agents.push(agent);
    return agent;
  }

  async getAgentProfile(userId: string) {
    return this.agents.find((agent) => agent.userId === userId) || null;
  }

  async updateAgentProfile(userId: string, updates: Partial<AgentProfile>) {
    const agent = await this.getAgentProfile(userId);
    if (!agent) throw new NotFoundException('Agent not found');
    
    Object.assign(agent, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    return agent;
  }

  async setCommissionPercentage(userId: string, percentage: number) {
    if (percentage < 0 || percentage > 100) {
      throw new Error('Commission percentage must be between 0 and 100');
    }
    return this.updateAgentProfile(userId, { commissionPercentage: percentage });
  }

  async setBankDetails(userId: string, bankDetails: AgentProfile['bankDetails']) {
    return this.updateAgentProfile(userId, { bankDetails });
  }

  async getAllAgents() {
    return this.agents;
  }

  async getVerifiedAgents() {
    return this.agents.filter((agent) => agent.verificationStatus === 'verified');
  }
}
