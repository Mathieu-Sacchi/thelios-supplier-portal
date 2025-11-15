import { PortalHeader } from "@/components/layout/PortalHeader";
import { PortalSidebar } from "@/components/layout/PortalSidebar";

const Orders = () => {
  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <PortalHeader />
      
      <div className="flex flex-1 w-full">
        <PortalSidebar />
        
        <main className="flex-1 p-4">
          <div className="mb-4 pb-2 border-b-2 border-border flex items-center justify-between">
            <h2 className="text-sm font-bold">ORDERS DASHBOARD</h2>
            <div className="flex gap-2 text-xs">
              <button className="px-2 py-1 border-2 border-border bg-secondary hover:bg-muted rounded-none">
                EXPORT
              </button>
              <button className="px-2 py-1 border-2 border-border bg-secondary hover:bg-muted rounded-none">
                MASTER VIEW
              </button>
            </div>
          </div>

          <div className="mb-4 p-3 bg-card border-2 border-border">
            <div className="mb-2 text-xs font-semibold">Search filters</div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block mb-1 font-semibold">Company</label>
                <select className="w-full px-2 py-1 border-2 border-border bg-input rounded-none text-xs">
                  <option>Company</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-semibold">Order number</label>
                <input type="text" className="w-full px-2 py-1 border-2 border-border bg-input rounded-none text-xs" />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Date from</label>
                <div className="flex">
                  <input type="text" className="flex-1 px-2 py-1 border-2 border-border bg-input rounded-none text-xs" />
                  <button className="px-2 border-2 border-l-0 border-border bg-secondary text-xs">▼</button>
                </div>
              </div>
              <div>
                <label className="block mb-1 font-semibold">Date to</label>
                <div className="flex">
                  <input type="text" className="flex-1 px-2 py-1 border-2 border-border bg-input rounded-none text-xs" />
                  <button className="px-2 border-2 border-l-0 border-border bg-secondary text-xs">▲</button>
                </div>
              </div>
              <div>
                <label className="block mb-1 font-semibold">Owner</label>
                <div className="flex">
                  <input type="text" className="flex-1 px-2 py-1 border-2 border-border bg-input rounded-none text-xs" />
                  <button className="px-2 border-2 border-l-0 border-border bg-secondary text-xs">▲</button>
                </div>
              </div>
              <div>
                <label className="block mb-1 font-semibold">Buyer</label>
                <div className="flex">
                  <input type="text" className="flex-1 px-2 py-1 border-2 border-border bg-input rounded-none text-xs" />
                  <button className="px-2 border-2 border-l-0 border-border bg-secondary text-xs">A</button>
                </div>
              </div>
              <div>
                <label className="block mb-1 font-semibold">Material code</label>
                <input type="text" className="w-full px-2 py-1 border-2 border-border bg-input rounded-none text-xs" />
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <button className="px-4 py-1 text-xs border-2 border-border bg-primary text-primary-foreground rounded-none hover:bg-primary/90 font-semibold">
                SEARCH
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border-2 border-table-border bg-card">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-table-header">
                  <th className="border border-table-border px-2 py-1 text-left font-semibold">Order ID</th>
                  <th className="border border-table-border px-2 py-1 text-left font-semibold">Status</th>
                  <th className="border border-table-border px-2 py-1 text-left font-semibold">Supplier</th>
                  <th className="border border-table-border px-2 py-1 text-left font-semibold">Material code</th>
                  <th className="border border-table-border px-2 py-1 text-left font-semibold">Owner</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-muted">
                  <td className="border border-table-border px-2 py-1">PO-2024-001</td>
                  <td className="border border-table-border px-2 py-1">Published</td>
                  <td className="border border-table-border px-2 py-1">ACME Corp</td>
                  <td className="border border-table-border px-2 py-1">MAT-001</td>
                  <td className="border border-table-border px-2 py-1">J. Smith</td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="border border-table-border px-2 py-1">PO-2024-002</td>
                  <td className="border border-table-border px-2 py-1">Read</td>
                  <td className="border border-table-border px-2 py-1">Global Industries</td>
                  <td className="border border-table-border px-2 py-1">MAT-002</td>
                  <td className="border border-table-border px-2 py-1">M. Johnson</td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="border border-table-border px-2 py-1">PO-2024-003</td>
                  <td className="border border-table-border px-2 py-1">Confirmed</td>
                  <td className="border border-table-border px-2 py-1">Tech Solutions</td>
                  <td className="border border-table-border px-2 py-1">MAT-003</td>
                  <td className="border border-table-border px-2 py-1">A. Brown</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Orders;
