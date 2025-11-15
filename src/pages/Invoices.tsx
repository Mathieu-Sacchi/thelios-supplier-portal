import { Link } from "react-router-dom";
import { PortalHeader } from "@/components/layout/PortalHeader";
import { PortalSidebar } from "@/components/layout/PortalSidebar";
import { Button } from "@/components/ui/button";
import { mockInvoices } from "@/data/invoiceTypes";

const Invoices = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PortalHeader />
      <div className="flex flex-1">
        <PortalSidebar />
        <main className="flex-1 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-sm font-bold">INVOICES LIST</h1>
            <Link to="/invoices/create">
              <Button size="sm" variant="outline">
                CREATE INVOICE FROM PO
              </Button>
            </Link>
          </div>

          <div className="border border-border bg-card">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="text-left p-2 border-r border-border font-semibold">Invoice No.</th>
                  <th className="text-left p-2 border-r border-border font-semibold">PO No.</th>
                  <th className="text-left p-2 border-r border-border font-semibold">Invoice Date</th>
                  <th className="text-left p-2 border-r border-border font-semibold">Status</th>
                  <th className="text-right p-2 font-semibold">Total Incl. Tax</th>
                </tr>
              </thead>
              <tbody>
                {mockInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-4 text-muted-foreground">
                      No invoices found. Click "CREATE INVOICE FROM PO" to create your first invoice.
                    </td>
                  </tr>
                ) : (
                  mockInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-border hover:bg-muted/50">
                      <td className="p-2 border-r border-border">{invoice.invoiceNumber}</td>
                      <td className="p-2 border-r border-border">{invoice.poNumber}</td>
                      <td className="p-2 border-r border-border">{invoice.invoiceDate}</td>
                      <td className="p-2 border-r border-border">
                        <span className={invoice.status === 'Submitted' ? 'font-semibold' : ''}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="p-2 text-right">{invoice.totalIncludingTax.toFixed(2)} {invoice.currency}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Invoices;
