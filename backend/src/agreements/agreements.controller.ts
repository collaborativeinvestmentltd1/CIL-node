import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AgreementsService } from './agreements.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('agreements')
export class AgreementsController {
  constructor(private agreementsService: AgreementsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('agent', 'landlord')
  async createAgreement(
    @Request() req,
    @Body() payload: {
      landlordId: string;
      agentId: string;
      propertyId: string;
      commissionPercentage: number;
      paymentTiming: 'after_first_payment' | 'after_full_payment';
      terms?: string;
    },
  ) {
    const agreement = await this.agreementsService.createAgreement(payload);
    return {
      success: true,
      data: agreement,
      message: 'Agreement created',
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getAgreement(@Param('id') id: string) {
    const agreement = await this.agreementsService.getAgreement(id);
    return {
      success: true,
      data: agreement,
      message: 'Agreement retrieved',
    };
  }

  @Get('agent/:agentId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('agent')
  async getAgreementsByAgent(@Param('agentId') agentId: string) {
    const agreements = await this.agreementsService.getAgreementsByAgent(agentId);
    return {
      success: true,
      data: agreements,
      message: 'Agent agreements retrieved',
    };
  }

  @Get('landlord/:landlordId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('landlord')
  async getAgreementsByLandlord(@Param('landlordId') landlordId: string) {
    const agreements = await this.agreementsService.getAgreementsByLandlord(landlordId);
    return {
      success: true,
      data: agreements,
      message: 'Landlord agreements retrieved',
    };
  }

  @Get('property/:propertyId')
  @UseGuards(JwtAuthGuard)
  async getAgreementsByProperty(@Param('propertyId') propertyId: string) {
    const agreements = await this.agreementsService.getAgreementsByProperty(propertyId);
    return {
      success: true,
      data: agreements,
      message: 'Property agreements retrieved',
    };
  }

  @Patch(':id/accept')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('landlord')
  async acceptAgreement(@Param('id') id: string) {
    const agreement = await this.agreementsService.acceptAgreement(id);
    return {
      success: true,
      data: agreement,
      message: 'Agreement accepted',
    };
  }

  @Patch(':id/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('landlord')
  async rejectAgreement(@Param('id') id: string) {
    const agreement = await this.agreementsService.rejectAgreement(id);
    return {
      success: true,
      data: agreement,
      message: 'Agreement rejected',
    };
  }

  @Patch(':id/complete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('landlord', 'admin')
  async completeAgreement(@Param('id') id: string) {
    const agreement = await this.agreementsService.completeAgreement(id);
    return {
      success: true,
      data: agreement,
      message: 'Agreement completed',
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('landlord', 'agent')
  async updateAgreement(
    @Param('id') id: string,
    @Body() updates: Partial<any>,
  ) {
    const agreement = await this.agreementsService.updateAgreement(id, updates);
    return {
      success: true,
      data: agreement,
      message: 'Agreement updated',
    };
  }
}
