import { Module } from '@nestjs/common';
import { LandlordModule } from './landlord/landlord.module';
import { PaymentsModule } from './payments/payments.module';
import { DocumentsModule } from './documents/documents.module';
import { AuthModule } from './auth/auth.module';
import { TenantsModule } from './tenants/tenants.module';

@Module({
  imports: [AuthModule, LandlordModule, PaymentsModule, DocumentsModule, TenantsModule],
})
export class AppModule {}
