import { Injectable, Logger } from '@nestjs/common';
import { LandlordService, Payment } from '../landlord/landlord.service';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(private landlordService: LandlordService) {}

  async handleWebhookEvent(payload: any) {
    const eventType = payload.event || payload.eventType || null;
    const data = payload.data || payload.payload || {};

    if (!eventType) {
      this.logger.warn('Missing Paystack event type');
      return false;
    }

    if (eventType !== 'charge.success' && eventType !== 'transfer.success') {
      this.logger.log(`Paystack event skipped: ${eventType}`);
      return false;
    }

    const metadata = data.metadata || {};
    const landlordId = metadata.landlordId || data.customer?.customer_code || 'landlord-1';
    const tenantId = metadata.tenantId || data.customer?.id || 't1';
    const propertyId = metadata.propertyId || undefined;
    const amount = Number(data.amount || data.settled_amount || 0) / 100;
    const reference = data.reference || data.transaction?.reference || 'unknown';
    const date = data.paid_at || data.createdAt || new Date().toISOString();

    const payment: Payment = {
      id: `pay_${Date.now()}`,
      tenantId,
      propertyId,
      amount,
      date,
      reference,
      status: 'paid',
    };

    this.landlordService.addPayment(landlordId, payment);
    this.logger.log(`Recorded payment for landlord=${landlordId} tenant=${tenantId} amount=${amount}`);
    return true;
  }
}
