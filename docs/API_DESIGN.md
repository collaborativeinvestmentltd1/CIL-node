# API Design Specification

## Base URL

- Development: `http://localhost:3001`
- Production: `https://api.cil.ng`

## Authentication

All endpoints (except public auth routes) require:

```
Authorization: Bearer {accessToken}
```

## Response Format

### Success Response

```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "error": "ErrorCode",
  "message": "Human-readable error message",
  "statusCode": 400
}
```

## Endpoints

### Auth

**POST /auth/signup**
Register new user

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "userType": "tenant" // "tenant" | "corporate" | "admin"
}
```

Response:
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {...}
}
```

**POST /auth/login**
Authenticate existing user

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**POST /auth/refresh**
Get new access token using refresh token

```json
{
  "refreshToken": "eyJhbGc..."
}
```

**POST /auth/reset-password**
Request password reset

```json
{
  "email": "user@example.com"
}
```

### Users

**GET /users/profile**
Get current user profile (requires auth)

**PATCH /users/profile**
Update user profile

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "phone": "+234912345678"
}
```

### Properties

**GET /properties**
List properties with filters

Query params:
- `page`: 1 (default)
- `limit`: 12 (default)
- `type`: "apartment" | "house" | ...
- `location`: "Lagos"
- `priceMin`: 0
- `priceMax`: 1000000
- `beds`: 3
- `sort`: "createdAt" | "price"
- `order`: "asc" | "desc"

**GET /properties/{id}**
Get property details

**POST /properties** (admin only)
Create property

```json
{
  "title": "Modern 3-Bed Apartment",
  "description": "Spacious apartment in Ikoyi",
  "type": "apartment",
  "price": 500000,
  "location": "Ikoyi, Lagos",
  "bedrooms": 3,
  "bathrooms": 2,
  "images": ["url1", "url2"],
  "status": "available"
}
```

**PATCH /properties/{id}** (admin only)
Update property

**DELETE /properties/{id}** (admin only)
Delete property

### Applications

**GET /applications**
List applications (filters by user role)

Query params:
- `page`, `limit`, `status`, `propertyId`

**GET /applications/{id}**
Get application details

**POST /applications**
Create tenant application

```json
{
  "propertyId": "uuid",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+234912345678",
  "address": "123 Main St",
  "employmentStatus": "employed",
  "monthlyIncome": 500000,
  "moveInDate": "2024-06-01",
  "meansOfIdentification": "driver_license",
  "identificationUrl": "https://cloudinary.com/..."
}
```

**PATCH /applications/{id}/approve** (admin only)
Approve application

**PATCH /applications/{id}/reject** (admin only)
Reject application with reason

```json
{
  "reason": "Income verification failed"
}
```

### Payments

**GET /payments**
List payments for current user

**POST /payments**
Initiate payment

```json
{
  "tenantId": "uuid",
  "propertyId": "uuid",
  "amount": 500000,
  "month": "2024-06"
}
```

Response includes Paystack authorization URL

**GET /payments/verify/{reference}**
Verify payment with Paystack

**GET /payments/receipt/{id}**
Download payment receipt

### Service Requests

**GET /service-requests**
List service requests

**GET /service-requests/{id}**
Get request details

**POST /service-requests**
Create service request

```json
{
  "propertyId": "uuid",
  "description": "Broken water tap in bathroom",
  "images": ["https://cloudinary.com/..."],
  "priority": "normal" // "low" | "normal" | "high"
}
```

**PATCH /service-requests/{id}**
Update request (status, notes)

```json
{
  "status": "in_progress",
  "notes": "Maintenance scheduled for tomorrow"
}
```

## Error Codes

- `400` - Bad Request (validation failed)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate email, etc.)
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error

## Rate Limiting

- Unauthenticated: 10 requests/minute
- Authenticated: 100 requests/minute

## Pagination

```
page (default: 1)
limit (default: 12, max: 100)

Response includes:
{
  "data": [...],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 12,
    "pages": 13
  }
}
```
