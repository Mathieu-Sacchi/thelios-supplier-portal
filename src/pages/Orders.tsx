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
            <h2 className="text-sm font-bold">ORDEER KOAS DABBASH</h2>
            <div className="flex gap-2 text-xs">
              <button className="px-2 py-1 border-2 border-border bg-secondary hover:bg-muted rounded-none">
                E9
              </button>
              <button className="px-2 py-1 border-2 border-border bg-secondary hover:bg-muted rounded-none">
                MASTER NAIME
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
                  <th className="border border-table-border px-2 py-1 text-left font-semibold">g:ID</th>
                  <th className="border border-table-border px-2 py-1 text-left font-semibold">RZ</th>
                  <th className="border border-table-border px-2 py-1 text-left font-semibold">SNF</th>
                  <th className="border border-table-border px-2 py-1 text-left font-semibold">Material code</th>
                  <th className="border border-table-border px-2 py-1 text-left font-semibold">Overear</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-muted">
                  <td className="border border-table-border px-2 py-1">.</td>
                  <td className="border border-table-border px-2 py-1">X</td>
                  <td className="border border-table-border px-2 py-1">1</td>
                  <td className="border border-table-border px-2 py-1">SGCC</td>
                  <td className="border border-table-border px-2 py-1">rnmren</td>
                  <td className="border border-table-border px-2 py-1">F</td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="border border-table-border px-2 py-1">.</td>
                  <td className="border border-table-border px-2 py-1">y</td>
                  <td className="border border-table-border px-2 py-1">t</td>
                  <td className="border border-table-border px-2 py-1">SGSC</td>
                  <td className="border border-table-border px-2 py-1">rnmren</td>
                  <td className="border border-table-border px-2 py-1">F</td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="border border-table-border px-2 py-1">.</td>
                  <td className="border border-table-border px-2 py-1">X</td>
                  <td className="border border-table-border px-2 py-1">t</td>
                  <td className="border border-table-border px-2 py-1">SGCS</td>
                  <td className="border border-table-border px-2 py-1">irtmrm</td>
                  <td className="border border-table-border px-2 py-1">F</td>
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
