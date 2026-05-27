import { Module } from '@nestjs/common';
import { LandlordModule } from './landlord/landlord.module';
import { PaymentsModule } from './payments/payments.module';
import { DocumentsModule } from './documents/documents.module';
import { AuthModule } from './auth/auth.module';
import { TenantsModule } from './tenants/tenants.module';
import { AgentsModule } from './agents/agents.module';
import { AgreementsModule } from './agreements/agreements.module';
import { RealEstateModule } from './real-estate/real-estate.module';

@Module({
  imports: [
    AuthModule,
    LandlordModule,
    PaymentsModule,
    DocumentsModule,
    TenantsModule,
    AgentsModule,
    AgreementsModule,
    RealEstateModule,
  ],
})
export class AppModule {}
