import { Body, Controller, Get, Param, Patch, Post, Query, Request, UnauthorizedException, UseGuards, NotFoundException } from '@nestjs/common';
import { LandlordService } from './landlord.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('landlord', 'admin')
@Controller('landlords')
export class LandlordController {
  constructor(private service: LandlordService) {}

  private authorizeLandlord(req: any, landlordId: string) {
    if (req.user.role !== 'admin' && req.user.sub !== landlordId) {
      throw new UnauthorizedException('Access denied');
    }
  }

  @Get(':landlordId/tenants')
  getTenants(@Param('landlordId') landlordId: string, @Request() req: any) {
    this.authorizeLandlord(req, landlordId);
    const tenants = this.service.getTenants(landlordId);
    return { tenants, meta: { total: tenants.length } };
  }

  @Get(':landlordId/tenants/:tenantId')
  getTenant(@Param('landlordId') landlordId: string, @Param('tenantId') tenantId: string, @Request() req: any) {
    this.authorizeLandlord(req, landlordId);
    const tenant = this.service.getTenant(landlordId, tenantId);
    if (!tenant) throw new NotFoundException('Tenant not found');
    return { tenant };
  }

  @Get(':landlordId/tenants/:tenantId/payments')
  getTenantPayments(@Param('landlordId') landlordId: string, @Param('tenantId') tenantId: string, @Request() req: any) {
    this.authorizeLandlord(req, landlordId);
    return { payments: this.service.getTenantPayments(landlordId, tenantId) };
  }

  @Get(':landlordId/properties')
  getProperties(@Param('landlordId') landlordId: string, @Request() req: any) {
    this.authorizeLandlord(req, landlordId);
    return { properties: this.service.getProperties(landlordId) };
  }

  @Get('properties/:propertyId')
  getProperty(@Param('propertyId') propertyId: string, @Request() req: any) {
    const property = this.service.getPropertyById(propertyId);
    if (!property) throw new NotFoundException('Property not found');
    if (req.user.role !== 'admin' && !this.service.isPropertyOwnedBy(req.user.sub, propertyId)) {
      throw new UnauthorizedException('Access denied');
    }
    return { property };
  }

  @Post(':landlordId/properties')
  createProperty(@Param('landlordId') landlordId: string, @Request() req: any, @Body() body: any) {
    this.authorizeLandlord(req, landlordId);
    return this.service.createProperty(landlordId, body);
  }

  @Patch(':landlordId/properties/:propertyId')
  updateProperty(@Param('landlordId') landlordId: string, @Param('propertyId') propertyId: string, @Request() req: any, @Body() body: any) {
    this.authorizeLandlord(req, landlordId);
    const updated = this.service.updateProperty(landlordId, propertyId, body);
    return { property: updated };
  }

  @Post(':landlordId/properties/:propertyId/archive')
  archiveProperty(@Param('landlordId') landlordId: string, @Param('propertyId') propertyId: string, @Request() req: any) {
    this.authorizeLandlord(req, landlordId);
    const success = this.service.deleteProperty(landlordId, propertyId);
    return { success };
  }

  @Get(':landlordId/payments')
  getPayments(@Param('landlordId') landlordId: string, @Request() req: any, @Query('from') from?: string, @Query('to') to?: string) {
    this.authorizeLandlord(req, landlordId);
    const payments = this.service.getPayments(landlordId);
    const filtered = payments.filter((payment) => {
      if (from && payment.date < from) return false;
      if (to && payment.date > to) return false;
      return true;
    });
    return { payments: filtered, meta: { total: filtered.length } };
  }

  @Get(':landlordId/messages')
  getMessages(@Param('landlordId') landlordId: string, @Request() req: any, @Query('audience') audience?: 'all' | 'tenant', @Query('tenantId') tenantId?: string) {
    this.authorizeLandlord(req, landlordId);
    return { messages: this.service.getMessages(landlordId, audience, tenantId) };
  }

  @Post(':landlordId/messages')
  postMessage(@Param('landlordId') landlordId: string, @Request() req: any, @Body() body: any) {
    this.authorizeLandlord(req, landlordId);
    return this.service.postMessage(landlordId, body);
  }

  @Get(':landlordId/rank')
  getRank(@Param('landlordId') landlordId: string, @Request() req: any) {
    this.authorizeLandlord(req, landlordId);
    return this.service.computeRank(landlordId);
  }
}
