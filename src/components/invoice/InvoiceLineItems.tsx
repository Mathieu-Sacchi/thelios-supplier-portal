import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InvoiceLine } from "@/data/invoiceTypes";

interface InvoiceLineItemsProps {
  invoiceLines: InvoiceLine[];
  setInvoiceLines: (lines: InvoiceLine[]) => void;
  onBack: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
}

export const InvoiceLineItems = ({
  invoiceLines,
  setInvoiceLines,
  onBack,
  onNext,
  onSaveDraft,
}: InvoiceLineItemsProps) => {
  const updateLine = (index: number, field: keyof InvoiceLine, value: any) => {
    const updated = [...invoiceLines];
    updated[index] = { ...updated[index], [field]: value };
    setInvoiceLines(updated);
  };

  const copyPOQtyToInvoice = () => {
    const updated = invoiceLines.map(line =>
      line.included ? { ...line, invoiceQuantity: line.orderedQuantity } : line
    );
    setInvoiceLines(updated);
  };

  const copyPOPriceToInvoice = () => {
    const updated = invoiceLines.map(line =>
      line.included ? { ...line, invoiceUnitPrice: line.poUnitPrice } : line
    );
    setInvoiceLines(updated);
  };

  const calculateSum = () => {
    return invoiceLines
      .filter(line => line.included)
      .reduce((sum, line) => sum + line.lineTotalIncludingTax, 0);
  };

  return (
    <div>
      <div className="border border-border bg-card p-3 mb-3">
        <div className="text-xs font-semibold mb-2 bg-muted/50 p-1 border border-border">
          LINE ITEMS - COMPARE PO WITH INVOICE
        </div>
        <div className="text-xs mb-2 text-muted-foreground">
          Check the box to include a line in the invoice, then enter the quantities and prices from your invoice PDF.
        </div>
        <div className="mb-2 flex gap-2">
          <Button size="sm" variant="outline" onClick={copyPOQtyToInvoice}>
            COPY PO QTY → INVOICE QTY (SELECTED)
          </Button>
          <Button size="sm" variant="outline" onClick={copyPOPriceToInvoice}>
            COPY PO PRICE → INVOICE PRICE (SELECTED)
          </Button>
        </div>
      </div>

      <div className="border border-border bg-card overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-muted border-b border-border">
              <th className="p-2 border-r border-border font-semibold text-center" colSpan={7}>
                FROM PURCHASE ORDER (Read-only)
              </th>
              <th className="p-2 border-r border-border font-semibold text-center" colSpan={6}>
                FROM INVOICE (Enter manually)
              </th>
            </tr>
            <tr className="bg-muted/50 border-b border-border">
              <th className="text-left p-2 border-r border-border font-semibold w-8">Incl.</th>
              <th className="text-left p-2 border-r border-border font-semibold">Line No.</th>
              <th className="text-left p-2 border-r border-border font-semibold">Item Code</th>
              <th className="text-left p-2 border-r border-border font-semibold">Description</th>
              <th className="text-right p-2 border-r border-border font-semibold">Ordered Qty</th>
              <th className="text-left p-2 border-r border-border font-semibold">UM</th>
              <th className="text-right p-2 border-r border-border font-semibold">PO Price</th>
              <th className="text-right p-2 border-r border-border font-semibold">Inv. Qty</th>
              <th className="text-right p-2 border-r border-border font-semibold">Inv. Price</th>
              <th className="text-right p-2 border-r border-border font-semibold">Discount %</th>
              <th className="text-left p-2 border-r border-border font-semibold">Tax Code</th>
              <th className="text-right p-2 font-semibold">Line Total Incl. Tax</th>
            </tr>
          </thead>
          <tbody>
            {invoiceLines.map((line, index) => (
              <tr key={line.id} className="border-b border-border hover:bg-muted/50">
                <td className="p-2 border-r border-border text-center">
                  <input
                    type="checkbox"
                    checked={line.included}
                    onChange={(e) => updateLine(index, 'included', e.target.checked)}
                    className="cursor-pointer"
                  />
                </td>
                <td className="p-2 border-r border-border bg-muted/30">{line.lineNo}</td>
                <td className="p-2 border-r border-border bg-muted/30">{line.itemCode}</td>
                <td className="p-2 border-r border-border bg-muted/30">{line.description}</td>
                <td className="p-2 border-r border-border bg-muted/30 text-right">{line.orderedQuantity}</td>
                <td className="p-2 border-r border-border bg-muted/30">{line.unitOfMeasure}</td>
                <td className="p-2 border-r border-border bg-muted/30 text-right">{line.poUnitPrice.toFixed(2)}</td>
                <td className="p-2 border-r border-border">
                  <Input
                    type="number"
                    value={line.invoiceQuantity}
                    onChange={(e) => updateLine(index, 'invoiceQuantity', parseFloat(e.target.value) || 0)}
                    className="h-6 text-xs w-20"
                    disabled={!line.included}
                  />
                </td>
                <td className="p-2 border-r border-border">
                  <Input
                    type="number"
                    step="0.01"
                    value={line.invoiceUnitPrice}
                    onChange={(e) => updateLine(index, 'invoiceUnitPrice', parseFloat(e.target.value) || 0)}
                    className="h-6 text-xs w-20"
                    disabled={!line.included}
                  />
                </td>
                <td className="p-2 border-r border-border">
                  <Input
                    type="number"
                    step="0.01"
                    value={line.discountPercent}
                    onChange={(e) => updateLine(index, 'discountPercent', parseFloat(e.target.value) || 0)}
                    className="h-6 text-xs w-16"
                    disabled={!line.included}
                  />
                </td>
                <td className="p-2 border-r border-border">
                  <select
                    value={line.taxCode}
                    onChange={(e) => updateLine(index, 'taxCode', e.target.value)}
                    className="h-6 text-xs w-24 border border-input bg-background px-1"
                    disabled={!line.included}
                  >
                    <option value="VAT20">VAT 20%</option>
                    <option value="VAT10">VAT 10%</option>
                    <option value="VAT5">VAT 5%</option>
                    <option value="VAT0">VAT 0%</option>
                  </select>
                </td>
                <td className="p-2">
                  <Input
                    type="number"
                    step="0.01"
                    value={line.lineTotalIncludingTax}
                    onChange={(e) => updateLine(index, 'lineTotalIncludingTax', parseFloat(e.target.value) || 0)}
                    className="h-6 text-xs w-24"
                    disabled={!line.included}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 border border-border bg-muted/30 p-3">
        <div className="text-xs font-semibold">
          Sum of Invoice Line Totals: {calculateSum().toFixed(2)} EUR
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          (This is calculated from the line items above. It may differ from your header totals - just for reference.)
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
  );
};
