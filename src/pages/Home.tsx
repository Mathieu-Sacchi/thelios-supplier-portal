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
            <div className="mb-2 text-xs font-semibold">Sonsword fillters</div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block mb-1 font-semibold">Company</label>
                <input type="text" className="w-full px-2 py-1 border-2 border-border bg-input rounded-none text-xs" />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Order: number</label>
                <input type="text" className="w-full px-2 py-1 border-2 border-border bg-input rounded-none text-xs" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-widget border-2 border-widget-border p-4">
              <div className="text-xs font-semibold mb-2">New orders to conciruur particalip confirimed</div>
              <div className="text-3xl font-bold text-center py-4">{newOrders}</div>
            </div>
            <div className="bg-widget border-2 border-widget-border p-4">
              <div className="text-xs font-semibold mb-2">Order rows in Atnpication ordorated by Purchas depo</div>
              <div className="text-3xl font-bold text-center py-4">{working}</div>
            </div>
            <div className="bg-widget border-2 border-widget-border p-4">
              <div className="text-xs font-semibold mb-2">Order rows in sappication socpcosed by my Appller</div>
              <div className="text-3xl font-bold text-center py-4">{inNegotiation}</div>
            </div>
            <div className="bg-widget border-2 border-widget-border p-4">
              <div className="text-xs font-semibold mb-2">Orders with accerarelm devillloary-dephs</div>
              <div className="text-3xl font-bold text-center py-4">{withDeviations}</div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-card border-2 border-border">
            <div className="text-xs font-bold mb-2">Reters with accoming divilleery dates</div>
            <div className="text-xs leading-relaxed">
              Expolitior is Boate In Ases Hirwe das dfasse adtulies. Resom in they In Fiqilone and Fnactions the sdosito conromasson coums.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
