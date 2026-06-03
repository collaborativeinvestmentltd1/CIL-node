import { Body, Controller, Get, Param, Post, Request, UnauthorizedException, UseGuards, Query } from '@nestjs/common';
import { S3Service } from './s3.service';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('tenant', 'landlord', 'agent', 'admin', 'operations', 'finance')
@Controller()
export class DocumentsController {
  constructor(private s3: S3Service, private documentsService: DocumentsService) {}

  @Post('documents/presign')
  async presign(@Request() req: any, @Body() body: { filename: string; contentType?: string; category: string }) {
    if (!body.filename || !body.category) {
      throw new UnauthorizedException('Filename and category are required');
    }
    const key = `${body.category}/${req.user.sub}/${Date.now()}_${body.filename}`;
    const url = await this.s3.createPresignKey(key, body.contentType || 'application/octet-stream');
    return { uploadUrl: url, key, category: body.category };
  }

  @Post('documents')
  async createDocument(
    @Request() req: any,
    @Body()
    body: {
      name: string;
      url: string;
      category: string;
      relatedTenantId?: string;
      relatedPropertyId?: string;
    },
  ) {
    if (!body.name || !body.url || !body.category) {
      throw new UnauthorizedException('Document name, url, and category are required');
    }
    const document = this.documentsService.createDocument({
      name: body.name,
      category: body.category,
      url: body.url,
      ownerId: req.user.sub,
      uploaderId: req.user.sub,
      relatedTenantId: body.relatedTenantId,
      relatedPropertyId: body.relatedPropertyId,
    });
    return { document };
  }

  @Get('documents')
  async getDocuments(@Request() req: any, @Query('category') category?: string) {
    return { documents: this.documentsService.getDocumentsForUser(req.user, category) };
  }

  @Post('landlords/:landlordId/documents/presign')
  async legacyPresign(@Request() req: any, @Param('landlordId') landlordId: string, @Body() body: { filename: string; contentType?: string; category?: string }) {
    if (req.user.role !== 'admin' && req.user.sub !== landlordId) {
      throw new UnauthorizedException('Access denied');
    }
    const key = `${body.category || 'property'}/${landlordId}/${Date.now()}_${body.filename}`;
    const url = await this.s3.createPresignKey(key, body.contentType || 'application/octet-stream');
    return { uploadUrl: url, key, category: body.category || 'property' };
  }
}
