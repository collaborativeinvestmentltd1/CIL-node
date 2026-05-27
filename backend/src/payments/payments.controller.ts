import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { createHmac } from 'crypto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('webhook')
  async webhook(@Req() req: Request, @Res() res: Response) {
    const sig = (req.headers['x-paystack-signature'] as string) || '';
    const secret = process.env.PAYSTACK_SECRET || '';
    const raw = (req as any).rawBody || '';
    const computed = createHmac('sha512', secret).update(raw).digest('hex');
    if (!secret || sig !== computed) {
      return res.status(400).json({ error: 'invalid signature' });
    }

    const event = req.body;
    const processed = await this.paymentsService.handleWebhookEvent(event);

    if (!processed) {
      return res.json({ status: 'ignored' });
    }

    return res.json({ status: 'ok' });
  }
}
