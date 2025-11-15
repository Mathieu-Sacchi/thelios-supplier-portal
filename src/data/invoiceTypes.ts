export interface Invoice {
  id: string;
  poId: string;
  poNumber: string;
  invoiceNumber: string;
  invoiceDate: string;
  currency: string;
  paymentTerms: string;
  totalBeforeTax: number;
  vatAmount: number;
  totalIncludingTax: number;
  status: 'Draft' | 'Submitted';
  buyerName: string;
  lines: InvoiceLine[];
  attachments: InvoiceAttachment[];
  createdAt: string;
}

export interface InvoiceLine {
  id: string;
  poLineId: string;
  lineNo: number;
  itemCode: string;
  description: string;
  orderedQuantity: number;
  unitOfMeasure: string;
  poUnitPrice: number;
  included: boolean;
  invoiceQuantity: number;
  invoiceUnitPrice: number;
  discountPercent: number;
  taxCode: string;
  lineTotalIncludingTax: number;
}

export interface InvoiceAttachment {
  id: string;
  fileName: string;
  documentType: 'Invoice PDF' | 'Packing list' | 'Other';
  uploadedAt: string;
}

export const mockInvoices: Invoice[] = [];
