export interface SupplierProfile {
  supplierName: string;
  address: string;
  vatNumber: string;
  companyId: string;
  iban: string;
  bic: string;
  defaultPaymentTerms: string;
}

export const mockSupplierProfile: SupplierProfile = {
  supplierName: 'OPTICAL SUPPLIES SRL',
  address: 'Via Roma 123, 20100 Milano, Italy',
  vatNumber: 'IT12345678901',
  companyId: 'SIRET: 123 456 789 00012',
  iban: 'IT60X0542811101000000123456',
  bic: 'BPMOIT22XXX',
  defaultPaymentTerms: 'Net 30 days',
};
