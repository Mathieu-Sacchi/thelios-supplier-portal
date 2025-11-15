export type DocumentType = 'Invoice' | 'Packing list' | 'Quality doc' | 'Other';
export type AttachmentStatus = 'Draft' | 'Published' | 'Accepted';

export interface Attachment {
  id: string;
  fileName: string;
  docType: DocumentType;
  uploadedAt: string;
  uploadedBy: string;
  status: AttachmentStatus;
  fileUrl?: string;
}
