import { PortalHeader } from "@/components/layout/PortalHeader";
import { PortalSidebar } from "@/components/layout/PortalSidebar";
import { mockOrderRows } from "@/data/mockOrders";

const Home = () => {
  const newOrders = mockOrderRows.filter(row => row.status === 'Published').length;
  const inNegotiation = mockOrderRows.filter(row => row.status === 'Negotiation').length;
  const working = mockOrderRows.filter(row => row.status === 'Working').length;
  const withDeviations = mockOrderRows.filter(row => 
    row.confirmedDeliveryDate && row.confirmedDeliveryDate !== row.requestedDeliveryDate
  ).length;

  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <PortalHeader />
      
      <div className="flex flex-1 w-full">
        <PortalSidebar />
        
        <main className="flex-1 p-4">
          <div className="mb-4 pb-2 border-b-2 border-border">
            <h2 className="text-sm font-bold">Dashboard</h2>
          </div>

          <div className="mb-4 p-3 bg-card border-2 border-border">
            <div className="mb-2 text-xs font-semibold">Search filters</div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block mb-1 font-semibold">Company</label>
                <input type="text" className="w-full px-2 py-1 border-2 border-border bg-input rounded-none text-xs" />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Order number</label>
                <input type="text" className="w-full px-2 py-1 border-2 border-border bg-input rounded-none text-xs" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-widget border-2 border-widget-border p-4">
              <div className="text-xs font-semibold mb-2">New orders to confirm or partially confirmed</div>
              <div className="text-3xl font-bold text-center py-4">{newOrders}</div>
            </div>
            <div className="bg-widget border-2 border-widget-border p-4">
              <div className="text-xs font-semibold mb-2">Order rows in negotiation - requested by Purchase dept.</div>
              <div className="text-3xl font-bold text-center py-4">{working}</div>
            </div>
            <div className="bg-widget border-2 border-widget-border p-4">
              <div className="text-xs font-semibold mb-2">Order rows in negotiation - proposed by Supplier</div>
              <div className="text-3xl font-bold text-center py-4">{inNegotiation}</div>
            </div>
            <div className="bg-widget border-2 border-widget-border p-4">
              <div className="text-xs font-semibold mb-2">Orders with deviations in delivery dates</div>
              <div className="text-3xl font-bold text-center py-4">{withDeviations}</div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-card border-2 border-border">
            <div className="text-xs font-bold mb-2">Orders with upcoming delivery dates</div>
            <div className="text-xs leading-relaxed">
              Please review orders with confirmed delivery dates within the next 14 days. Ensure all quantities and specifications are correct before the shipment date.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
