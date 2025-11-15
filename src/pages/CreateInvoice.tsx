import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PortalHeader } from "@/components/layout/PortalHeader";
import { PortalSidebar } from "@/components/layout/PortalSidebar";
import { SelectPO } from "@/components/invoice/SelectPO";
import { InvoiceHeader } from "@/components/invoice/InvoiceHeader";
import { InvoiceLineItems } from "@/components/invoice/InvoiceLineItems";
import { InvoiceAttachments } from "@/components/invoice/InvoiceAttachments";
import { PurchaseOrder } from "@/data/mockPurchaseOrders";
import { Invoice, InvoiceLine, InvoiceAttachment, mockInvoices } from "@/data/invoiceTypes";
import { toast } from "sonner";

const CreateInvoice = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [invoiceHeader, setInvoiceHeader] = useState({
    invoiceNumber: '',
    invoiceDate: '',
    currency: '',
    paymentTerms: '',
    totalBeforeTax: 0,
    vatAmount: 0,
    totalIncludingTax: 0,
  });
  const [invoiceLines, setInvoiceLines] = useState<InvoiceLine[]>([]);
  const [attachments, setAttachments] = useState<InvoiceAttachment[]>([]);

  const handleSelectPO = (po: PurchaseOrder) => {
    setSelectedPO(po);
    setInvoiceHeader(prev => ({
      ...prev,
      currency: po.currency,
    }));
    // Initialize invoice lines from PO lines
    const lines: InvoiceLine[] = po.lines.map(line => ({
      id: `inv-line-${line.id}`,
      poLineId: line.id,
      lineNo: line.lineNo,
      itemCode: line.itemCode,
      description: line.description,
      orderedQuantity: line.orderedQuantity,
      unitOfMeasure: line.unitOfMeasure,
      poUnitPrice: line.poUnitPrice,
      included: false,
      invoiceQuantity: 0,
      invoiceUnitPrice: 0,
      discountPercent: 0,
      taxCode: 'VAT20',
      lineTotalIncludingTax: 0,
    }));
    setInvoiceLines(lines);
    setCurrentStep(2);
  };

  const handleSaveDraft = () => {
    if (!selectedPO) return;
    
    const invoice: Invoice = {
      id: `inv-${Date.now()}`,
      poId: selectedPO.id,
      poNumber: selectedPO.poNumber,
      invoiceNumber: invoiceHeader.invoiceNumber,
      invoiceDate: invoiceHeader.invoiceDate,
      currency: invoiceHeader.currency,
      paymentTerms: invoiceHeader.paymentTerms,
      totalBeforeTax: invoiceHeader.totalBeforeTax,
      vatAmount: invoiceHeader.vatAmount,
      totalIncludingTax: invoiceHeader.totalIncludingTax,
      status: 'Draft',
      buyerName: selectedPO.buyerName,
      lines: invoiceLines,
      attachments: attachments,
      createdAt: new Date().toISOString(),
    };

    mockInvoices.push(invoice);
    toast.success("Invoice saved as draft");
  };

  const handleSubmit = () => {
    if (!selectedPO) return;

    const hasInvoicePDF = attachments.some(att => att.documentType === 'Invoice PDF');
    if (!hasInvoicePDF) {
      toast.error("Please attach at least one Invoice PDF before submitting");
      return;
    }

    const invoice: Invoice = {
      id: `inv-${Date.now()}`,
      poId: selectedPO.id,
      poNumber: selectedPO.poNumber,
      invoiceNumber: invoiceHeader.invoiceNumber,
      invoiceDate: invoiceHeader.invoiceDate,
      currency: invoiceHeader.currency,
      paymentTerms: invoiceHeader.paymentTerms,
      totalBeforeTax: invoiceHeader.totalBeforeTax,
      vatAmount: invoiceHeader.vatAmount,
      totalIncludingTax: invoiceHeader.totalIncludingTax,
      status: 'Submitted',
      buyerName: selectedPO.buyerName,
      lines: invoiceLines,
      attachments: attachments,
      createdAt: new Date().toISOString(),
    };

    mockInvoices.push(invoice);
    toast.success("Invoice submitted successfully");
    navigate('/invoices');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PortalHeader />
      <div className="flex flex-1">
        <PortalSidebar />
        <main className="flex-1 p-4">
          <div className="mb-4">
            <h1 className="text-sm font-bold">CREATE INVOICE FROM PO - STEP {currentStep}/4</h1>
          </div>

          {currentStep === 1 && (
            <SelectPO onSelect={handleSelectPO} />
          )}

          {currentStep === 2 && selectedPO && (
            <InvoiceHeader
              selectedPO={selectedPO}
              invoiceHeader={invoiceHeader}
              setInvoiceHeader={setInvoiceHeader}
              onBack={() => setCurrentStep(1)}
              onNext={() => setCurrentStep(3)}
              onSaveDraft={handleSaveDraft}
            />
          )}

          {currentStep === 3 && selectedPO && (
            <InvoiceLineItems
              invoiceLines={invoiceLines}
              setInvoiceLines={setInvoiceLines}
              onBack={() => setCurrentStep(2)}
              onNext={() => setCurrentStep(4)}
              onSaveDraft={handleSaveDraft}
            />
          )}

          {currentStep === 4 && selectedPO && (
            <InvoiceAttachments
              attachments={attachments}
              setAttachments={setAttachments}
              onBack={() => setCurrentStep(3)}
              onSubmit={handleSubmit}
              onSaveDraft={handleSaveDraft}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default CreateInvoice;
