import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import * as bodyParser from 'body-parser';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // Trust proxy headers (when behind a proxy/load balancer)
  const expressApp = app.getHttpAdapter().getInstance();
  (expressApp as any).set('trust proxy', 1);

  // Configure CORS with an origin whitelist from env
  const origins = (process.env.CORS_ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (origins.length > 0) {
        if (origins.includes(origin)) return callback(null, true);
        return callback(new Error('CORS policy: Origin not allowed'), false);
      }
      if (process.env.NODE_ENV !== 'production') return callback(null, true);
      return callback(new Error('CORS policy: Origin not allowed'), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  app.use(cookieParser());

  // Security headers via Helmet
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", 'https:'],
          imgSrc: ["'self'", 'data:', 'https:'],
          connectSrc: ["'self'", ...(process.env.CORS_ALLOWED_ORIGINS ? process.env.CORS_ALLOWED_ORIGINS.split(',').map(s => s.trim()).filter(Boolean) : [])],
        },
      },
    }) as any,
  );

  // Rate limiting for auth endpoints to mitigate brute-force
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use('/auth', authLimiter);
  app.use(
    bodyParser.json({
      verify: (req: any, _res, buf) => {
        req.rawBody = buf;
      },
    }),
  );

  // Enforce HTTPS in production (redirect HTTP -> HTTPS)
  if (process.env.NODE_ENV === 'production') {
    app.use((req: any, res: any, next: any) => {
      const proto = req.headers['x-forwarded-proto'] || req.protocol;
      if (proto && proto.toLowerCase() !== 'https') {
        const host = req.headers.host;
        const url = `https://${host}${req.url}`;
        return res.redirect(301, url);
      }
      return next();
    });
  }

  const authService = app.get(AuthService);
  await seedDemoAccounts(authService);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`CIL backend running on http://localhost:${port}`);
}

async function seedDemoAccounts(authService: AuthService) {
  const demoAccounts = [
    { firstName: 'Mary', lastName: 'Tenant', email: 'tenant@example.com', password: 'P@ssword123', role: 'tenant' as const },
    { firstName: 'David', lastName: 'Landlord', email: 'landlord@example.com', password: 'P@ssword123', role: 'landlord' as const },
    { firstName: 'Precious', lastName: 'Agent', email: 'agent@example.com', password: 'P@ssword123', role: 'agent' as const },
    { firstName: 'CIL', lastName: 'Partner', email: 'realestate@example.com', password: 'P@ssword123', role: 'realEstate' as const },
  ];

  for (const account of demoAccounts) {
    try {
      await authService.register(account as any);
    } catch (error) {
      // ignore duplicates on restart
    }
  }
}
