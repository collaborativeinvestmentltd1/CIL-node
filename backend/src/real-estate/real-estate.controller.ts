import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { RealEstateService } from './real-estate.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('real-estate')
export class RealEstateController {
  constructor(private realEstateService: RealEstateService) {}

  @Post('register')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('realEstate')
  async registerCompany(
    @Request() req,
    @Body() payload: {
      companyName: string;
      registrationNumber: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      country: string;
      website?: string;
      commissionPercentage?: number;
    },
  ) {
    const company = await this.realEstateService.createCompany({
      userId: req.user.id,
      email: req.user.email,
      ...payload,
    });
    return {
      success: true,
      data: company,
      message: 'Real estate company registered',
    };
  }

  @Get('company')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('realEstate')
  async getMyCompany(@Request() req) {
    const company = await this.realEstateService.getCompanyByUserId(req.user.id);
    return {
      success: true,
      data: company,
      message: 'Company retrieved',
    };
  }

  @Get(':id')
  async getCompany(@Param('id') id: string) {
    const company = await this.realEstateService.getCompanyById(id);
    return {
      success: true,
      data: company,
      message: 'Company retrieved',
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('realEstate')
  async updateCompany(
    @Param('id') id: string,
    @Body() updates: Partial<any>,
  ) {
    const company = await this.realEstateService.updateCompany(id, updates);
    return {
      success: true,
      data: company,
      message: 'Company updated',
    };
  }

  @Post(':id/kyc-documents')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('realEstate')
  async uploadKYCDocuments(
    @Param('id') id: string,
    @Body() payload: {
      businessRegistration?: string;
      taxId?: string;
      identification?: string;
    },
  ) {
    const company = await this.realEstateService.uploadKYCDocuments(id, payload);
    return {
      success: true,
      data: company,
      message: 'KYC documents uploaded',
    };
  }

  @Post(':id/bank-details')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('realEstate')
  async setBankDetails(
    @Param('id') id: string,
    @Body() payload: {
      accountName: string;
      accountNumber: string;
      bankName: string;
    },
  ) {
    const company = await this.realEstateService.setBankDetails(id, payload);
    return {
      success: true,
      data: company,
      message: 'Bank details updated',
    };
  }

  @Get()
  async getAllCompanies() {
    const companies = await this.realEstateService.getAllCompanies();
    return {
      success: true,
      data: companies,
      message: 'Companies retrieved',
    };
  }

  @Get('approved')
  async getApprovedCompanies() {
    const companies = await this.realEstateService.getApprovedCompanies();
    return {
      success: true,
      data: companies,
      message: 'Approved companies retrieved',
    };
  }

  @Get('admin/pending-kyc')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async getPendingKYC() {
    const companies = await this.realEstateService.getPendingKYC();
    return {
      success: true,
      data: companies,
      message: 'Pending KYC retrieved',
    };
  }

  @Patch(':id/approve-kyc')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async approveKYC(@Param('id') id: string) {
    const company = await this.realEstateService.approveKYC(id);
    return {
      success: true,
      data: company,
      message: 'KYC approved',
    };
  }

  @Patch(':id/reject-kyc')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async rejectKYC(@Param('id') id: string) {
    const company = await this.realEstateService.rejectKYC(id);
    return {
      success: true,
      data: company,
      message: 'KYC rejected',
    };
  }
}
