import { Controller, Post, Param, UploadedFile, UseInterceptors, Body, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('landlord', 'admin')
@Controller()
export class DocumentsController {
  constructor(private s3: S3Service) {}

  @Post('landlords/:landlordId/documents/presign')
  async presign(@Request() req: any, @Param('landlordId') landlordId: string, @Body() body: { filename: string; contentType?: string }) {
    if (req.user.role !== 'admin' && req.user.sub !== landlordId) {
      throw new UnauthorizedException('Access denied');
    }
    const key = `landlords/${landlordId}/${Date.now()}_${body.filename}`;
    const url = await this.s3.createPresignKey(key, body.contentType || 'application/octet-stream');
    return { uploadUrl: url, key };
  }

  @Post('landlords/:landlordId/documents')
  @UseInterceptors(FileInterceptor('file'))
  upload(@Request() req: any, @Param('landlordId') landlordId: string, @UploadedFile() file: any) {
    if (req.user.role !== 'admin' && req.user.sub !== landlordId) {
      throw new UnauthorizedException('Access denied');
    }
    const url = `/uploads/${file?.filename || file?.originalname || 'unknown'}`;
    return { id: file?.filename || Date.now().toString(), url, originalName: file?.originalname };
  }
}
