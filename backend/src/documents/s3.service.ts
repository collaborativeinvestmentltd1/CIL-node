import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private client: S3Client;
  private bucket: string;

  constructor() {
    this.bucket = process.env.S3_BUCKET || 'cil-dev-uploads';
    this.client = new S3Client({ region: process.env.S3_REGION || 'us-east-1' });
  }

  async createPresignKey(key: string, contentType = 'application/octet-stream') {
    const cmd = new PutObjectCommand({ Bucket: this.bucket, Key: key, ContentType: contentType });
    const url = await getSignedUrl(this.client, cmd, { expiresIn: 60 * 10 });
    return url;
  }
}
