import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { S3Service } from './s3.service';

@Module({
  controllers: [DocumentsController],
  providers: [S3Service],
  exports: [S3Service],
})
export class DocumentsModule {}
