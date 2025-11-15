import { useState } from "react";
import { PortalHeader } from "@/components/layout/PortalHeader";
import { PortalSidebar } from "@/components/layout/PortalSidebar";
import { mockOrderRows, OrderRow, OrderStatus } from "@/data/mockOrders";
import { toast } from "sonner";

const OrderRows = () => {
  const [orderRows, setOrderRows] = useState<OrderRow[]>(mockOrderRows);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const updateStatus = (newStatus: OrderStatus) => {
    if (selectedRows.size === 0) {
      toast("Please select at least one row");
      return;
    }
    
    setOrderRows(prev => prev.map(row => 
      selectedRows.has(row.id) ? { ...row, status: newStatus } : row
    ));
    toast(`${selectedRows.size} row(s) marked as ${newStatus}`);
    setSelectedRows(new Set());
  };

  const handleExport = () => {
    toast("Excel export simulated");
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <PortalHeader />
      
      <div className="flex flex-1 w-full">
        <PortalSidebar />
        
        <main className="flex-1 p-4">
          <div className="mb-4 pb-2 border-b-2 border-border flex items-center justify-between">
            <h2 className="text-sm font-bold">Order from Dashboard</h2>
            <div className="flex gap-2 text-xs">
              <button className="px-2 py-1 border-2 border-border bg-secondary hover:bg-muted rounded-none">
                (c)
              </button>
              <button className="px-2 py-1 border-2 border-border bg-secondary hover:bg-muted rounded-none">
                €
              </button>
            </div>
          </div>

          <div className="mb-4 p-3 bg-card border-2 border-border">
            <div className="mb-2 text-xs font-semibold">Search filters</div>
            <div className="grid grid-cols-4 gap-2 mb-3 text-xs">
              <input type="text" placeholder="Company" className="px-2 py-1 border-2 border-border bg-input rounded-none text-xs" />
              <input type="text" placeholder="Order number" className="px-2 py-1 border-2 border-border bg-input rounded-none text-xs" />
              <input type="text" placeholder="Material code" className="px-2 py-1 border-2 border-border bg-input rounded-none text-xs" />
              <input type="text" placeholder="Owner" className="px-2 py-1 border-2 border-border bg-input rounded-none text-xs" />
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs border-2 border-border bg-primary text-primary-foreground rounded-none hover:bg-primary/90">
                SEARCH
              </button>
              <button className="px-3 py-1 text-xs border-2 border-border bg-secondary rounded-none hover:bg-muted">
                RESET
              </button>
              <button className="px-3 py-1 text-xs border-2 border-border bg-secondary rounded-none hover:bg-muted">
                ADVANCED
              </button>
              <button className="px-3 py-1 text-xs border-2 border-border bg-secondary rounded-none hover:bg-muted">
                MASSIVE UPLOAD
              </button>
            </div>
          </div>

          <div className="mb-2 flex gap-2">
            <button 
              onClick={() => updateStatus('Read')}
              className="px-3 py-1 text-xs border-2 border-border bg-secondary rounded-none hover:bg-muted font-semibold"
            >
              READ
            </button>
            <button 
              onClick={() => updateStatus('Working')}
              className="px-3 py-1 text-xs border-2 border-border bg-secondary rounded-none hover:bg-muted font-semibold"
            >
              SAVE
            </button>
            <button 
              onClick={() => updateStatus('Confirmed')}
              className="px-3 py-1 text-xs border-2 border-border bg-secondary rounded-none hover:bg-muted font-semibold"
            >
              CONFIRM
            </button>
            <button 
              onClick={() => updateStatus('Negotiation')}
              className="px-3 py-1 text-xs border-2 border-border bg-secondary rounded-none hover:bg-muted font-semibold"
            >
              MASSIVE UPDATE
            </button>
            <button className="px-3 py-1 text-xs border-2 border-border bg-secondary rounded-none hover:bg-muted font-semibold">
              CLOSING PROPOSAL
            </button>
          </div>

          <div className="overflow-x-auto border-2 border-table-border">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-table-header">
                  <th className="border border-table-border px-1 py-1 text-left font-semibold">Order Number</th>
                  <th className="border border-table-border px-1 py-1 text-left font-semibold">Row Number</th>
                  <th className="border border-table-border px-1 py-1 text-left font-semibold">Status</th>
                  <th className="border border-table-border px-1 py-1 text-left font-semibold">Material code</th>
                  <th className="border border-table-border px-1 py-1 text-left font-semibold">Price</th>
                  <th className="border border-table-border px-1 py-1 text-left font-semibold">Quantity</th>
                </tr>
              </thead>
              <tbody className="bg-card">
                {orderRows.map((row) => (
                  <tr 
                    key={row.id}
                    className={`hover:bg-muted cursor-pointer ${selectedRows.has(row.id) ? 'bg-muted' : ''}`}
                    onClick={() => toggleRow(row.id)}
                  >
                    <td className="border border-table-border px-1 py-1">{row.orderNumber}</td>
                    <td className="border border-table-border px-1 py-1">{row.rowNumber}</td>
                    <td className="border border-table-border px-1 py-1">{row.status}</td>
                    <td className="border border-table-border px-1 py-1">{row.materialCode}</td>
                    <td className="border border-table-border px-1 py-1">{row.price}</td>
                    <td className="border border-table-border px-1 py-1">{row.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 text-xs border-2 border-border bg-secondary rounded-none hover:bg-muted font-semibold">
              ORDER ROW SUMMARY
            </button>
            <button className="px-3 py-1 text-xs border-2 border-border bg-secondary rounded-none hover:bg-muted font-semibold">
              COPY
            </button>
            <button 
              onClick={handleExport}
              className="px-3 py-1 text-xs border-2 border-border bg-secondary rounded-none hover:bg-muted font-semibold"
            >
              EXPORT LIST
            </button>
          </div>

          <div className="mt-4 p-3 bg-card border-2 border-border">
            <div className="text-xs font-bold mb-2">Order Row Summary</div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="border border-table-border p-2">
                <div className="font-semibold">Total Rows</div>
                <div className="flex justify-between mt-1">
                  <span>Published</span>
                  <span className="font-semibold">12</span>
                  <span className="font-semibold">24%</span>
                </div>
              </div>
              <div className="border border-table-border p-2">
                <div className="font-semibold">In Progress</div>
                <div className="flex justify-between mt-1">
                  <span>Working</span>
                  <span className="font-semibold">8</span>
                  <span className="font-semibold">16%</span>
                </div>
              </div>
              <div className="border border-table-border p-2">
                <div className="font-semibold">Completed</div>
                <div className="flex justify-between mt-1">
                  <span>Confirmed</span>
                  <span className="font-semibold">30</span>
                  <span className="font-semibold">60%</span>
                </div>
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              <div className="flex-1 border border-table-border p-2">
                <div className="font-semibold">Selection Summary</div>
                <div className="flex justify-between mt-1">
                  <span>Selected</span>
                  <span>0 rows</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 p-3 bg-card border-2 border-border text-xs">
            <div className="font-bold mb-1">Statistics</div>
            <div className="grid grid-cols-4 gap-2">
              <div>Published <span className="font-semibold">12</span></div>
              <div>Read <span className="font-semibold">8</span></div>
              <div>Working <span className="font-semibold">15</span></div>
              <div>Negotiation <span className="font-semibold">7</span></div>
              <div>Confirmed <span className="font-semibold">30</span></div>
              <div>Cancelled <span className="font-semibold">3</span></div>
              <div>&nbsp;</div>
              <div>Total <span className="font-semibold">75</span></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderRows;
