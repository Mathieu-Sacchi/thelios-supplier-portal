export interface PurchaseOrder {
  id: string;
  poNumber: string;
  poDate: string;
  buyerName: string;
  buyerCompany: string;
  status: 'Open' | 'Partially invoiced' | 'Fully invoiced';
  currency: string;
  totalAmount: number;
  lines: PurchaseOrderLine[];
}

export interface PurchaseOrderLine {
  id: string;
  lineNo: number;
  itemCode: string;
  description: string;
  orderedQuantity: number;
  unitOfMeasure: string;
  poUnitPrice: number;
  requestedDeliveryDate: string;
}

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'po1',
    poNumber: '4500012345',
    poDate: '2024-01-20',
    buyerName: 'Marie Laurent',
    buyerCompany: 'THELIOS FR',
    status: 'Open',
    currency: 'EUR',
    totalAmount: 10625.00,
    lines: [
      {
        id: 'po1-line1',
        lineNo: 10,
        itemCode: 'SGCC',
        description: 'Frame material - Acetate Black',
        orderedQuantity: 500,
        unitOfMeasure: 'PCS',
        poUnitPrice: 12.50,
        requestedDeliveryDate: '2024-02-15',
      },
      {
        id: 'po1-line2',
        lineNo: 20,
        itemCode: 'SGSC',
        description: 'Lens CR-39 1.5 UV coating',
        orderedQuantity: 1000,
        unitOfMeasure: 'PCS',
        poUnitPrice: 8.75,
        requestedDeliveryDate: '2024-02-20',
      },
    ],
  },
  {
    id: 'po2',
    poNumber: '4500012346',
    poDate: '2024-01-22',
    buyerName: 'Anna Bianchi',
    buyerCompany: 'THELIOS IT',
    status: 'Open',
    currency: 'EUR',
    totalAmount: 800.00,
    lines: [
      {
        id: 'po2-line1',
        lineNo: 10,
        itemCode: 'SGCS',
        description: 'Hinge component titanium',
        orderedQuantity: 250,
        unitOfMeasure: 'PCS',
        poUnitPrice: 3.20,
        requestedDeliveryDate: '2024-03-01',
      },
    ],
  },
  {
    id: 'po3',
    poNumber: '4500012347',
    poDate: '2024-01-23',
    buyerName: 'Sofia Martinez',
    buyerCompany: 'THELIOS ES',
    status: 'Partially invoiced',
    currency: 'EUR',
    totalAmount: 11850.00,
    lines: [
      {
        id: 'po3-line1',
        lineNo: 30,
        itemCode: 'LENS01',
        description: 'Polarized lens grey',
        orderedQuantity: 750,
        unitOfMeasure: 'PCS',
        poUnitPrice: 15.80,
        requestedDeliveryDate: '2024-02-25',
      },
    ],
  },
  {
    id: 'po4',
    poNumber: '4500012349',
    poDate: '2024-01-25',
    buyerName: 'Klaus Schmidt',
    buyerCompany: 'THELIOS DE',
    status: 'Open',
    currency: 'EUR',
    totalAmount: 1700.00,
    lines: [
      {
        id: 'po4-line1',
        lineNo: 20,
        itemCode: 'NOSE01',
        description: 'Nose pad silicone 18mm',
        orderedQuantity: 2000,
        unitOfMeasure: 'PCS',
        poUnitPrice: 0.85,
        requestedDeliveryDate: '2024-03-10',
      },
    ],
  },
];
