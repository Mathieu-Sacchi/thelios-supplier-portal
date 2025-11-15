import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockPurchaseOrders, PurchaseOrder } from "@/data/mockPurchaseOrders";

interface SelectPOProps {
  onSelect: (po: PurchaseOrder) => void;
}

export const SelectPO = ({ onSelect }: SelectPOProps) => {
  const [filters, setFilters] = useState({
    poNumber: '',
    buyerName: '',
    poDateFrom: '',
    poDateTo: '',
  });
  const [filteredPOs, setFilteredPOs] = useState<PurchaseOrder[]>([]);
  const [selectedPOId, setSelectedPOId] = useState<string | null>(null);

  const handleSearch = () => {
    let results = mockPurchaseOrders;

    if (filters.poNumber) {
      results = results.filter(po => po.poNumber.includes(filters.poNumber));
    }
    if (filters.buyerName) {
      results = results.filter(po => 
        po.buyerName.toLowerCase().includes(filters.buyerName.toLowerCase())
      );
    }
    if (filters.poDateFrom) {
      results = results.filter(po => po.poDate >= filters.poDateFrom);
    }
    if (filters.poDateTo) {
      results = results.filter(po => po.poDate <= filters.poDateTo);
    }

    setFilteredPOs(results);
  };

  const handleNext = () => {
    const selected = filteredPOs.find(po => po.id === selectedPOId);
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <div>
      <div className="border border-border bg-card p-3 mb-3">
        <div className="text-xs font-semibold mb-2 bg-muted/50 p-1 border border-border">
          SEARCH PURCHASE ORDERS
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div>
            <label className="text-xs block mb-1">PO Number:</label>
            <Input
              type="text"
              value={filters.poNumber}
              onChange={(e) => setFilters({ ...filters, poNumber: e.target.value })}
              className="h-7 text-xs"
            />
          </div>
          <div>
            <label className="text-xs block mb-1">Buyer Name:</label>
            <Input
              type="text"
              value={filters.buyerName}
              onChange={(e) => setFilters({ ...filters, buyerName: e.target.value })}
              className="h-7 text-xs"
            />
          </div>
          <div>
            <label className="text-xs block mb-1">PO Date From:</label>
            <Input
              type="date"
              value={filters.poDateFrom}
              onChange={(e) => setFilters({ ...filters, poDateFrom: e.target.value })}
              className="h-7 text-xs"
            />
          </div>
          <div>
            <label className="text-xs block mb-1">PO Date To:</label>
            <Input
              type="date"
              value={filters.poDateTo}
              onChange={(e) => setFilters({ ...filters, poDateTo: e.target.value })}
              className="h-7 text-xs"
            />
          </div>
        </div>
        <div className="mt-2">
          <Button size="sm" onClick={handleSearch}>SEARCH</Button>
        </div>
      </div>

      {filteredPOs.length > 0 && (
        <div className="border border-border bg-card">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted border-b border-border">
                <th className="text-left p-2 border-r border-border font-semibold w-8"></th>
                <th className="text-left p-2 border-r border-border font-semibold">PO Number</th>
                <th className="text-left p-2 border-r border-border font-semibold">PO Date</th>
                <th className="text-left p-2 border-r border-border font-semibold">Buyer Name</th>
                <th className="text-left p-2 border-r border-border font-semibold">Status</th>
                <th className="text-right p-2 font-semibold">PO Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredPOs.map((po) => (
                <tr 
                  key={po.id} 
                  className={`border-b border-border hover:bg-muted/50 cursor-pointer ${
                    selectedPOId === po.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setSelectedPOId(po.id)}
                >
                  <td className="p-2 border-r border-border text-center">
                    <input
                      type="radio"
                      checked={selectedPOId === po.id}
                      onChange={() => setSelectedPOId(po.id)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="p-2 border-r border-border">{po.poNumber}</td>
                  <td className="p-2 border-r border-border">{po.poDate}</td>
                  <td className="p-2 border-r border-border">{po.buyerName}</td>
                  <td className="p-2 border-r border-border">{po.status}</td>
                  <td className="p-2 text-right">{po.totalAmount.toFixed(2)} {po.currency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredPOs.length > 0 && (
        <div className="mt-3 flex gap-2">
          <Button size="sm" onClick={handleNext} disabled={!selectedPOId}>
            NEXT
          </Button>
        </div>
      )}
    </div>
  );
};
