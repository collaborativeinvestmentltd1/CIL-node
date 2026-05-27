import { Body, Controller, Get, Param, Post, UseGuards, Request, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { TenantsService } from './tenants.service';
import { LandlordService } from '../landlord/landlord.service';

@Controller('tenants')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TenantsController {
  constructor(private tenantsService: TenantsService, private landlordService: LandlordService) {}

  @Get(':tenantId')
  @Roles('tenant', 'admin')
  getTenant(@Param('tenantId') tenantId: string, @Request() req: any) {
    if (req.user.role !== 'admin' && req.user.sub !== tenantId) {
      return { error: 'Unauthorized' };
    }
    const tenant = this.tenantsService.getTenantByUserId(tenantId);
    return { tenant };
  }

  @Get(':tenantId/landlords')
  @Roles('tenant', 'admin')
  getLandlords(@Param('tenantId') tenantId: string, @Request() req: any) {
    if (req.user.role !== 'admin' && req.user.sub !== tenantId) {
      return { error: 'Unauthorized' };
    }
    return { landlords: this.landlordService.getLandlordsForTenant(tenantId) };
  }

  @Get(':tenantId/payments')
  @Roles('tenant', 'admin')
  getPayments(@Param('tenantId') tenantId: string, @Request() req: any, @Query('landlordId') landlordId?: string) {
    if (req.user.role !== 'admin' && req.user.sub !== tenantId) {
      return { error: 'Unauthorized' };
    }
    const payments = this.landlordService.getTenantPaymentsAcrossLandlords(tenantId);
    return { payments: landlordId ? payments.filter((payment) => payment.landlordId === landlordId) : payments };
  }

  @Get(':tenantId/agreements')
  @Roles('tenant', 'admin')
  getAgreements(@Param('tenantId') tenantId: string, @Request() req: any) {
    if (req.user.role !== 'admin' && req.user.sub !== tenantId) {
      return { error: 'Unauthorized' };
    }
    return { agreements: this.landlordService.getTenantAgreements(tenantId) };
  }

  @Post(':tenantId/landlords/:landlordId/messages')
  @Roles('tenant', 'admin')
  sendMessage(@Param('tenantId') tenantId: string, @Param('landlordId') landlordId: string, @Body() body: { subject: string; message: string }, @Request() req: any) {
    if (req.user.role !== 'admin' && req.user.sub !== tenantId) {
      return { error: 'Unauthorized' };
    }
    return this.landlordService.sendTenantRequest(tenantId, landlordId, body);
  }
}
