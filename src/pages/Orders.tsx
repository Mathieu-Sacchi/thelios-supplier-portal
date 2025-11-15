import { useState } from "react";
import { PortalHeader } from "@/components/layout/PortalHeader";
import { PortalSidebar } from "@/components/layout/PortalSidebar";
import { Attachment } from "@/types/attachments";
import { AttachmentModal } from "@/components/AttachmentModal";
import { Paperclip } from "lucide-react";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'internal' | 'external'>('general');
  const [attachmentsByOrderId, setAttachmentsByOrderId] = useState<Record<string, Attachment[]>>({});
  const [externalAttachmentModalOpen, setExternalAttachmentModalOpen] = useState(false);

  const hasExternalAttachments = (orderId: string) => {
    return (attachmentsByOrderId[orderId]?.length || 0) > 0;
  };

  const handleExternalAttachmentsChange = (attachments: Attachment[]) => {
    if (!selectedOrder) return;
    setAttachmentsByOrderId(prev => ({
      ...prev,
      [selectedOrder]: attachments
    }));
  };
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

          {!selectedOrder ? (
            <div className="overflow-x-auto border-2 border-table-border bg-card">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-table-header">
                    <th className="border border-table-border px-2 py-1 text-left font-semibold w-12">Attach</th>
                    <th className="border border-table-border px-2 py-1 text-left font-semibold">Order ID</th>
                    <th className="border border-table-border px-2 py-1 text-left font-semibold">Status</th>
                    <th className="border border-table-border px-2 py-1 text-left font-semibold">Supplier</th>
                    <th className="border border-table-border px-2 py-1 text-left font-semibold">Material code</th>
                    <th className="border border-table-border px-2 py-1 text-left font-semibold">Owner</th>
                  </tr>
                </thead>
                <tbody>
                  {['4500012345', '4500012346', '4500012347'].map((orderId) => (
                    <tr key={orderId} className="hover:bg-muted">
                      <td className="border border-table-border px-2 py-1">
                        {hasExternalAttachments(orderId) && (
                          <Paperclip className="w-3 h-3" />
                        )}
                      </td>
                      <td className="border border-table-border px-2 py-1">
                        <button 
                          onClick={() => setSelectedOrder(orderId)}
                          className="text-primary hover:underline"
                        >
                          {orderId}
                        </button>
                      </td>
                      <td className="border border-table-border px-2 py-1">
                        {orderId === '4500012345' ? 'Published' : orderId === '4500012346' ? 'Confirmed' : 'Working'}
                      </td>
                      <td className="border border-table-border px-2 py-1">OPTICAL SUPPLIES SRL</td>
                      <td className="border border-table-border px-2 py-1">
                        {orderId === '4500012345' ? 'SGCC' : orderId === '4500012346' ? 'SGSC' : 'SGCS'}
                      </td>
                      <td className="border border-table-border px-2 py-1">
                        {orderId === '4500012345' ? 'Jean Dupont' : orderId === '4500012346' ? 'Marie Laurent' : 'Marco Rossi'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="border-2 border-border bg-card">
              <div className="flex items-center justify-between p-2 border-b-2 border-border">
                <h3 className="text-sm font-bold">Order {selectedOrder}</h3>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="px-2 py-1 text-xs border-2 border-border bg-secondary rounded-none hover:bg-muted"
                >
                  BACK TO LIST
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b-2 border-border">
                <button
                  onClick={() => setActiveTab('general')}
                  className={`px-4 py-2 text-xs font-semibold border-r-2 border-border rounded-none ${
                    activeTab === 'general' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-muted'
                  }`}
                >
                  General data
                </button>
                <button
                  onClick={() => setActiveTab('internal')}
                  className={`px-4 py-2 text-xs font-semibold border-r-2 border-border rounded-none ${
                    activeTab === 'internal' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-muted'
                  }`}
                >
                  Internal attachments
                </button>
                <button
                  onClick={() => setActiveTab('external')}
                  className={`px-4 py-2 text-xs font-semibold rounded-none ${
                    activeTab === 'external' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-muted'
                  }`}
                >
                  External attachments
                </button>
              </div>

              {/* Tab content */}
              <div className="p-4">
                {activeTab === 'general' && (
                  <div className="text-xs">
                    <p className="mb-2"><span className="font-semibold">Order number:</span> {selectedOrder}</p>
                    <p className="mb-2"><span className="font-semibold">Supplier:</span> OPTICAL SUPPLIES SRL</p>
                    <p className="mb-2"><span className="font-semibold">Status:</span> Published</p>
                    <p className="mb-2"><span className="font-semibold">Owner:</span> Jean Dupont</p>
                  </div>
                )}

                {activeTab === 'internal' && (
                  <div className="overflow-x-auto border-2 border-table-border bg-card">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="bg-table-header">
                          <th className="border border-table-border px-2 py-1 text-left font-semibold">File name</th>
                          <th className="border border-table-border px-2 py-1 text-left font-semibold">Document type</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-muted">
                          <td className="border border-table-border px-2 py-1">
                            <button className="text-primary hover:underline">Purchase_order.pdf</button>
                          </td>
                          <td className="border border-table-border px-2 py-1">Purchase Order</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'external' && (
                  <div>
                    <div className="mb-3 flex gap-2">
                      <button 
                        onClick={() => setExternalAttachmentModalOpen(true)}
                        className="px-3 py-1 text-xs border-2 border-border bg-primary text-primary-foreground rounded-none hover:bg-primary/90 font-semibold"
                      >
                        MANAGE ATTACHMENTS
                      </button>
                    </div>
                    <div className="overflow-x-auto border-2 border-table-border bg-card">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-table-header">
                            <th className="border border-table-border px-2 py-1 text-left font-semibold">File name</th>
                            <th className="border border-table-border px-2 py-1 text-left font-semibold">Document type</th>
                            <th className="border border-table-border px-2 py-1 text-left font-semibold">Uploaded on</th>
                            <th className="border border-table-border px-2 py-1 text-left font-semibold">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(attachmentsByOrderId[selectedOrder] || []).length === 0 ? (
                            <tr>
                              <td colSpan={4} className="border border-table-border px-2 py-1 text-center text-muted-foreground">
                                No external attachments
                              </td>
                            </tr>
                          ) : (
                            (attachmentsByOrderId[selectedOrder] || []).map((att) => (
                              <tr key={att.id} className="hover:bg-muted">
                                <td className="border border-table-border px-2 py-1">
                                  <button className="text-primary hover:underline">{att.fileName}</button>
                                </td>
                                <td className="border border-table-border px-2 py-1">{att.docType}</td>
                                <td className="border border-table-border px-2 py-1">
                                  {new Date(att.uploadedAt).toLocaleString('en-GB', { 
                                    day: '2-digit', 
                                    month: '2-digit', 
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </td>
                                <td className="border border-table-border px-2 py-1">{att.status}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      <AttachmentModal
        open={externalAttachmentModalOpen}
        onOpenChange={setExternalAttachmentModalOpen}
        title="External attachments"
        attachments={selectedOrder ? (attachmentsByOrderId[selectedOrder] || []) : []}
        onAttachmentsChange={handleExternalAttachmentsChange}
      />
    </div>
  );
};

export default Orders;
