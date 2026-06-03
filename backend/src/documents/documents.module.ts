import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { S3Service } from './s3.service';

@Module({
  controllers: [DocumentsController],
  providers: [S3Service, DocumentsService],
  exports: [S3Service, DocumentsService],
})
export class DocumentsModule {}
