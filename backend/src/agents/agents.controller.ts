import { Controller, Get, Post, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('agents')
export class AgentsController {
  constructor(private agentsService: AgentsService) {}

  @Post('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('agent')
  async createProfile(
    @Request() req,
    @Body() payload: {
      phone?: string;
      commissionPercentage?: number;
    },
  ) {
    const profile = await this.agentsService.createAgentProfile({
      userId: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      ...payload,
    });
    return {
      success: true,
      data: profile,
      message: 'Agent profile created',
    };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('agent')
  async getProfile(@Request() req) {
    const profile = await this.agentsService.getAgentProfile(req.user.id);
    return {
      success: true,
      data: profile,
      message: 'Agent profile retrieved',
    };
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('agent')
  async updateProfile(
    @Request() req,
    @Body() updates: Partial<any>,
  ) {
    const profile = await this.agentsService.updateAgentProfile(req.user.id, updates);
    return {
      success: true,
      data: profile,
      message: 'Agent profile updated',
    };
  }

  @Post('commission')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('agent')
  async setCommissionPercentage(
    @Request() req,
    @Body() payload: { percentage: number },
  ) {
    const profile = await this.agentsService.setCommissionPercentage(
      req.user.id,
      payload.percentage,
    );
    return {
      success: true,
      data: profile,
      message: 'Commission percentage updated',
    };
  }

  @Post('bank-details')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('agent')
  async setBankDetails(
    @Request() req,
    @Body() payload: {
      accountName: string;
      accountNumber: string;
      bankName: string;
    },
  ) {
    const profile = await this.agentsService.setBankDetails(req.user.id, payload);
    return {
      success: true,
      data: profile,
      message: 'Bank details updated',
    };
  }

  @Get()
  async getAllAgents() {
    const agents = await this.agentsService.getAllAgents();
    return {
      success: true,
      data: agents,
      message: 'Agents retrieved',
    };
  }

  @Get('verified')
  async getVerifiedAgents() {
    const agents = await this.agentsService.getVerifiedAgents();
    return {
      success: true,
      data: agents,
      message: 'Verified agents retrieved',
    };
  }
}
