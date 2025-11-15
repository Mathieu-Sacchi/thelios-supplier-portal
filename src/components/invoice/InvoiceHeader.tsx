import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PurchaseOrder } from "@/data/mockPurchaseOrders";
import { mockSupplierProfile } from "@/data/mockSupplier";

interface InvoiceHeaderProps {
  selectedPO: PurchaseOrder;
  invoiceHeader: any;
  setInvoiceHeader: (header: any) => void;
  onBack: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
}

export const InvoiceHeader = ({
  selectedPO,
  invoiceHeader,
  setInvoiceHeader,
  onBack,
  onNext,
  onSaveDraft,
}: InvoiceHeaderProps) => {
  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <div className="border border-border bg-muted/30 p-3 mb-3">
          <div className="text-xs font-semibold mb-2">SELECTED PURCHASE ORDER (Read-only)</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="font-semibold">PO Number:</span> {selectedPO.poNumber}
            </div>
            <div>
              <span className="font-semibold">PO Date:</span> {selectedPO.poDate}
            </div>
            <div>
              <span className="font-semibold">Buyer:</span> {selectedPO.buyerName}
            </div>
            <div>
              <span className="font-semibold">Currency:</span> {selectedPO.currency}
            </div>
          </div>
        </div>

        <div className="border border-border bg-card p-3">
          <div className="text-xs font-semibold mb-2 bg-muted/50 p-1 border border-border">
            INVOICE HEADER DATA - ENTER MANUALLY
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs block mb-1">
                  Invoice Number: <span className="text-muted-foreground">(Source: invoice)</span>
                </label>
                <Input
                  type="text"
                  value={invoiceHeader.invoiceNumber}
                  onChange={(e) => setInvoiceHeader({ ...invoiceHeader, invoiceNumber: e.target.value })}
                  className="h-7 text-xs"
                  placeholder="Type invoice number from PDF"
                />
              </div>
              <div>
                <label className="text-xs block mb-1">
                  Invoice Date: <span className="text-muted-foreground">(Source: invoice)</span>
                </label>
                <Input
                  type="date"
                  value={invoiceHeader.invoiceDate}
                  onChange={(e) => setInvoiceHeader({ ...invoiceHeader, invoiceDate: e.target.value })}
                  className="h-7 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs block mb-1">
                  Currency: <span className="text-muted-foreground">(Source: invoice)</span>
                </label>
                <select
                  value={invoiceHeader.currency}
                  onChange={(e) => setInvoiceHeader({ ...invoiceHeader, currency: e.target.value })}
                  className="h-7 text-xs w-full border border-input bg-background px-2"
                >
                  <option value="">Select</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
              <div>
                <label className="text-xs block mb-1">
                  Payment Terms: <span className="text-muted-foreground">(Source: invoice)</span>
                </label>
                <Input
                  type="text"
                  value={invoiceHeader.paymentTerms}
                  onChange={(e) => setInvoiceHeader({ ...invoiceHeader, paymentTerms: e.target.value })}
                  className="h-7 text-xs"
                  placeholder="e.g., Net 30 days"
                />
              </div>
            </div>

            <div className="border-t border-border pt-3 mt-3">
              <div className="text-xs font-semibold mb-2">INVOICE TOTALS</div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs block mb-1">
                    Total Before Tax: <span className="text-muted-foreground">(Source: invoice)</span>
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={invoiceHeader.totalBeforeTax}
                    onChange={(e) => setInvoiceHeader({ ...invoiceHeader, totalBeforeTax: parseFloat(e.target.value) || 0 })}
                    className="h-7 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs block mb-1">
                    VAT Amount: <span className="text-muted-foreground">(Source: invoice)</span>
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={invoiceHeader.vatAmount}
                    onChange={(e) => setInvoiceHeader({ ...invoiceHeader, vatAmount: parseFloat(e.target.value) || 0 })}
                    className="h-7 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs block mb-1">
                    Total Including Tax: <span className="text-muted-foreground">(Source: invoice)</span>
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={invoiceHeader.totalIncludingTax}
                    onChange={(e) => setInvoiceHeader({ ...invoiceHeader, totalIncludingTax: parseFloat(e.target.value) || 0 })}
                    className="h-7 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-3 mt-3">
              <div className="text-xs font-semibold mb-2">FROM PURCHASE ORDER</div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs block mb-1">PO Number: (Read-only)</label>
                  <Input
                    type="text"
                    value={selectedPO.poNumber}
                    disabled
                    className="h-7 text-xs bg-muted/30"
                  />
                </div>
                <div>
                  <label className="text-xs block mb-1">Buyer Name: (Read-only)</label>
                  <Input
                    type="text"
                    value={selectedPO.buyerName}
                    disabled
                    className="h-7 text-xs bg-muted/30"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <Button size="sm" variant="outline" onClick={onBack}>
            BACK
          </Button>
          <Button size="sm" variant="outline" onClick={onSaveDraft}>
            SAVE DRAFT
          </Button>
          <Button size="sm" onClick={onNext}>
            NEXT
          </Button>
        </div>
      </div>

      <div className="w-64">
        <div className="border border-border bg-muted/30 p-3 sticky top-3">
          <div className="text-xs font-semibold mb-2">SUPPLIER DETAILS (Read-only)</div>
          <div className="text-xs space-y-1">
            <div>
              <span className="font-semibold">Company:</span><br />
              {mockSupplierProfile.supplierName}
            </div>
            <div>
              <span className="font-semibold">Address:</span><br />
              {mockSupplierProfile.address}
            </div>
            <div>
              <span className="font-semibold">VAT Number:</span><br />
              {mockSupplierProfile.vatNumber}
            </div>
            <div>
              <span className="font-semibold">Company ID:</span><br />
              {mockSupplierProfile.companyId}
            </div>
            <div>
              <span className="font-semibold">IBAN:</span><br />
              {mockSupplierProfile.iban}
            </div>
            <div>
              <span className="font-semibold">BIC:</span><br />
              {mockSupplierProfile.bic}
            </div>
            <div>
              <span className="font-semibold">Default Payment Terms:</span><br />
              {mockSupplierProfile.defaultPaymentTerms}
            </div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground italic">
            Source: supplier master data
          </div>
        </div>
      </div>
    </div>
  );
};
