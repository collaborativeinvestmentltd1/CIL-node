import { Controller, Post, Param, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';

@Controller()
export class DocumentsController {
  constructor(private s3: S3Service) {}

  @Post('landlords/:landlordId/documents/presign')
  async presign(@Param('landlordId') landlordId: string, @Body() body: { filename: string; contentType?: string }) {
    const key = `landlords/${landlordId}/${Date.now()}_${body.filename}`;
    const url = await this.s3.createPresignKey(key, body.contentType || 'application/octet-stream');
    return { uploadUrl: url, key };
  }

  @Post('landlords/:landlordId/documents')
  @UseInterceptors(FileInterceptor('file'))
  upload(@Param('landlordId') landlordId: string, @UploadedFile() file: any) {
    const url = `/uploads/${file?.filename || file?.originalname || 'unknown'}`;
    return { id: file?.filename || Date.now().toString(), url, originalName: file?.originalname };
  }
}
