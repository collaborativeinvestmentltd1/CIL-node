import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { LandlordService } from './landlord.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('landlord', 'admin')
@Controller('landlords')
export class LandlordController {
  constructor(private service: LandlordService) {}

  @Get(':landlordId/tenants')
  getTenants(@Param('landlordId') landlordId: string) {
    const tenants = this.service.getTenants(landlordId);
    return { tenants, meta: { total: tenants.length } };
  }

  @Get(':landlordId/tenants/:tenantId')
  getTenant(@Param('landlordId') landlordId: string, @Param('tenantId') tenantId: string) {
    const tenant = this.service.getTenant(landlordId, tenantId);
    return { tenant };
  }

  @Get(':landlordId/tenants/:tenantId/payments')
  getTenantPayments(@Param('landlordId') landlordId: string, @Param('tenantId') tenantId: string) {
    return { payments: this.service.getTenantPayments(landlordId, tenantId) };
  }

  @Get(':landlordId/properties')
  getProperties(@Param('landlordId') landlordId: string) {
    return { properties: this.service.getProperties(landlordId) };
  }

  @Get('properties/:propertyId')
  getProperty(@Param('propertyId') propertyId: string) {
    const property = this.service.getPropertyById(propertyId);
    return { property };
  }

  @Post(':landlordId/properties')
  createProperty(@Param('landlordId') landlordId: string, @Body() body: any) {
    return this.service.createProperty(landlordId, body);
  }

  @Patch(':landlordId/properties/:propertyId')
  updateProperty(@Param('landlordId') landlordId: string, @Param('propertyId') propertyId: string, @Body() body: any) {
    const updated = this.service.updateProperty(landlordId, propertyId, body);
    return { property: updated };
  }

  @Post(':landlordId/properties/:propertyId/archive')
  archiveProperty(@Param('landlordId') landlordId: string, @Param('propertyId') propertyId: string) {
    const success = this.service.deleteProperty(landlordId, propertyId);
    return { success };
  }

  @Get(':landlordId/payments')
  getPayments(@Param('landlordId') landlordId: string, @Query('from') from?: string, @Query('to') to?: string) {
    const payments = this.service.getPayments(landlordId);
    const filtered = payments.filter((payment) => {
      if (from && payment.date < from) return false;
      if (to && payment.date > to) return false;
      return true;
    });
    return { payments: filtered, meta: { total: filtered.length } };
  }

  @Get(':landlordId/messages')
  getMessages(@Param('landlordId') landlordId: string, @Query('audience') audience?: 'all' | 'tenant', @Query('tenantId') tenantId?: string) {
    return { messages: this.service.getMessages(landlordId, audience, tenantId) };
  }

  @Post(':landlordId/messages')
  postMessage(@Param('landlordId') landlordId: string, @Body() body: any) {
    return this.service.postMessage(landlordId, body);
  }

  @Get(':landlordId/rank')
  getRank(@Param('landlordId') landlordId: string) {
    return this.service.computeRank(landlordId);
  }
}
