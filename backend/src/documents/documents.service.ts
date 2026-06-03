import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { AppUser } from '../users/users.service';

export type DocumentCategory =
  | 'verification'
  | 'property'
  | 'lease'
  | 'agent'
  | 'maintenance'
  | 'financial';

export type DocumentStatus = 'draft' | 'submitted' | 'approved' | 'rejected';

export type StoredDocument = {
  id: string;
  name: string;
  category: DocumentCategory;
  url: string;
  ownerId: string;
  uploaderId: string;
  relatedTenantId?: string;
  relatedPropertyId?: string;
  createdAt: string;
  status: DocumentStatus;
};

@Injectable()
export class DocumentsService {
  private documents: StoredDocument[] = [];
  private allowedCategories: DocumentCategory[] = [
    'verification',
    'property',
    'lease',
    'agent',
    'maintenance',
    'financial',
  ];

  validateCategory(category: string): DocumentCategory {
    if (!this.allowedCategories.includes(category as DocumentCategory)) {
      throw new BadRequestException('Invalid document category');
    }
    return category as DocumentCategory;
  }

  createDocument(payload: {
    name: string;
    category: string;
    url: string;
    ownerId: string;
    uploaderId: string;
    relatedTenantId?: string;
    relatedPropertyId?: string;
  }) {
    const category = this.validateCategory(payload.category);
    const document: StoredDocument = {
      id: `doc_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
      name: payload.name,
      category,
      url: payload.url,
      ownerId: payload.ownerId,
      uploaderId: payload.uploaderId,
      relatedTenantId: payload.relatedTenantId,
      relatedPropertyId: payload.relatedPropertyId,
      createdAt: new Date().toISOString(),
      status: 'submitted',
    };
    this.documents.push(document);
    return document;
  }

  getDocumentsForUser(user: AppUser, category?: string) {
    const categoryValue = category ? this.validateCategory(category) : undefined;
    if (user.role === 'admin') {
      return this.documents.filter((doc) => (categoryValue ? doc.category === categoryValue : true));
    }

    return this.documents.filter((doc) => {
      if (categoryValue && doc.category !== categoryValue) return false;
      if (doc.ownerId === user.id || doc.uploaderId === user.id) return true;
      if (user.role === 'landlord' && doc.category === 'property' && doc.ownerId === user.id) return true;
      if (user.role === 'tenant' && doc.relatedTenantId === user.id) return true;
      if (user.role === 'agent' && doc.category === 'agent' && doc.uploaderId === user.id) return true;
      if (user.role === 'operations' && doc.category === 'maintenance') return true;
      if (user.role === 'finance' && doc.category === 'financial') return true;
      return false;
    });
  }
}
