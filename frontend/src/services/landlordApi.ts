import { Property, Message, Payment } from "@/types/landlord";
import { getToken } from "@/lib/auth";

const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

async function request(path: string, opts: RequestInit = {}) {
  const headers: Record<string, string> = { ...((opts.headers as any) || {}) };
  if (!headers["Content-Type"] && !(opts.body instanceof FormData)) headers["Content-Type"] = "application/json";
  const token = typeof window !== "undefined" ? getToken() : null;
  if (token && !headers["Authorization"]) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, { ...opts, headers, credentials: 'include' });
  if (!res.ok) throw new Error((await res.json()).error || res.statusText);
  return res.json();
}

export async function getLandlordTenants(landlordId: string) {
  return request(`/landlords/${landlordId}/tenants`);
}

export async function getLandlordProperties(landlordId: string) {
  return request(`/landlords/${landlordId}/properties`);
}

export async function createProperty(landlordId: string, payload: Partial<Property>) {
  return request(`/landlords/${landlordId}/properties`, { method: 'POST', body: JSON.stringify(payload) });
}

export async function getTenantDetail(landlordId: string, tenantId: string) {
  return request(`/landlords/${landlordId}/tenants/${tenantId}`);
}

export async function getLandlordPayments(landlordId: string, opts: { from?: string; to?: string } = {}) {
  const q = new URLSearchParams(opts as any).toString();
  return request(`/landlords/${landlordId}/payments${q ? `?${q}` : ''}`);
}

export async function getLandlordMessages(landlordId: string) {
  return request(`/landlords/${landlordId}/messages`);
}

export async function getTenantLandlords(tenantId: string) {
  return request(`/tenants/${tenantId}/landlords`);
}

export async function getTenantAgreements(tenantId: string) {
  return request(`/tenants/${tenantId}/agreements`);
}

export async function getTenantPayments(tenantId: string, landlordId?: string) {
  const q = new URLSearchParams({ landlordId: landlordId || '' } as any).toString();
  return request(`/tenants/${tenantId}/payments${landlordId ? `?${q}` : ''}`);
}

export async function sendTenantMessage(tenantId: string, landlordId: string, payload: { subject: string; message: string }) {
  return request(`/tenants/${tenantId}/landlords/${landlordId}/messages`, { method: 'POST', body: JSON.stringify(payload) });
}

export async function uploadDocument(landlordId: string, file: File, type: string, tenantId?: string) {
  const token = typeof window !== "undefined" ? getToken() : null;
  const presignHeaders: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) presignHeaders.Authorization = `Bearer ${token}`;

  const presignResp = await fetch(`${BASE}/landlords/${landlordId}/documents/presign`, {
    method: 'POST',
    headers: presignHeaders,
    body: JSON.stringify({ filename: file.name, contentType: file.type }),
  });
  if (!presignResp.ok) throw new Error('Failed to get upload URL');
  const { uploadUrl, key } = await presignResp.json();

  const put = await fetch(uploadUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
  if (!put.ok) throw new Error('Upload to storage failed');

  return { key, url: uploadUrl };
}

export async function postMessage(landlordId: string, message: Partial<Message>) {
  return request(`/landlords/${landlordId}/messages`, { method: 'POST', body: JSON.stringify(message) });
}

export async function getRank(landlordId: string) {
  return request(`/landlords/${landlordId}/rank`);
}

export async function getPayments(landlordId: string, opts: { from?: string; to?: string } = {}) {
  const q = new URLSearchParams(opts as any).toString();
  return request(`/landlords/${landlordId}/payments${q ? `?${q}` : ""}`);
}

const landlordApi = {
  getLandlordTenants,
  getLandlordProperties,
  createProperty,
  getTenantDetail,
  getLandlordPayments,
  getLandlordMessages,
  getTenantLandlords,
  getTenantAgreements,
  getTenantPayments,
  sendTenantMessage,
  uploadDocument,
  postMessage,
  getRank,
  getPayments,
};

export default landlordApi;
