import { useState } from "react";
import { Attachment, DocumentType, AttachmentStatus } from "@/types/attachments";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface AttachmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  attachments: Attachment[];
  onAttachmentsChange: (attachments: Attachment[]) => void;
}

export const AttachmentModal = ({ 
  open, 
  onOpenChange, 
  title,
  attachments,
  onAttachmentsChange
}: AttachmentModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [docType, setDocType] = useState<DocumentType>('Invoice');
  const [selectedAttachments, setSelectedAttachments] = useState<Set<string>>(new Set());

  const handleUpload = () => {
    if (!selectedFile) {
      toast("Please select a file");
      return;
    }

    const newAttachment: Attachment = {
      id: Date.now().toString(),
      fileName: selectedFile.name,
      docType,
      uploadedAt: new Date().toISOString(),
      uploadedBy: "SUPPLIER01",
      status: "Draft",
    };

    onAttachmentsChange([...attachments, newAttachment]);
    setSelectedFile(null);
    toast("File uploaded");
  };

  const handleDelete = () => {
    if (selectedAttachments.size === 0) {
      toast("Please select attachments to delete");
      return;
    }
    const filtered = attachments.filter(a => !selectedAttachments.has(a.id));
    onAttachmentsChange(filtered);
    setSelectedAttachments(new Set());
    toast(`${selectedAttachments.size} attachment(s) deleted`);
  };

  const handleStatusChange = (newStatus: AttachmentStatus) => {
    if (selectedAttachments.size === 0) {
      toast("Please select attachments");
      return;
    }
    const updated = attachments.map(a => 
      selectedAttachments.has(a.id) ? { ...a, status: newStatus } : a
    );
    onAttachmentsChange(updated);
    setSelectedAttachments(new Set());
    toast(`${selectedAttachments.size} attachment(s) marked as ${newStatus}`);
  };

  const toggleAttachment = (id: string) => {
    const newSelected = new Set(selectedAttachments);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedAttachments(newSelected);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl rounded-none border-2 border-border">
        <DialogHeader>
          <DialogTitle className="text-sm font-bold">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Upload section */}
          <div className="p-3 bg-card border-2 border-border">
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div>
                <label className="block mb-1 text-xs font-semibold">Choose file</label>
                <input 
                  type="file" 
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="w-full px-2 py-1 border-2 border-border bg-input rounded-none text-xs"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-semibold">Document type</label>
                <select 
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as DocumentType)}
                  className="w-full px-2 py-1 border-2 border-border bg-input rounded-none text-xs"
                >
                  <option value="Invoice">Invoice</option>
                  <option value="Packing list">Packing list</option>
                  <option value="Quality doc">Quality doc</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={handleUpload}
                  className="px-3 py-1 text-xs border-2 border-border bg-primary text-primary-foreground rounded-none hover:bg-primary/90 font-semibold"
                >
                  UPLOAD
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button 
              onClick={handleDelete}
              className="px-3 py-1 text-xs border-2 border-border bg-secondary rounded-none hover:bg-muted font-semibold"
            >
              DELETE
            </button>
            <button 
              onClick={() => handleStatusChange('Published')}
              className="px-3 py-1 text-xs border-2 border-border bg-secondary rounded-none hover:bg-muted font-semibold"
            >
              PUBLISH
            </button>
            <button 
              onClick={() => handleStatusChange('Accepted')}
              className="px-3 py-1 text-xs border-2 border-border bg-secondary rounded-none hover:bg-muted font-semibold"
            >
              ACCEPT
            </button>
            <button 
              onClick={() => onOpenChange(false)}
              className="px-3 py-1 text-xs border-2 border-border bg-secondary rounded-none hover:bg-muted font-semibold ml-auto"
            >
              CLOSE
            </button>
          </div>

          {/* Attachments table */}
          <div className="overflow-x-auto border-2 border-table-border bg-card">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-table-header">
                  <th className="p-1 border-2 border-table-border font-bold text-left w-8">
                    <input type="checkbox" className="rounded-none" />
                  </th>
                  <th className="p-1 border-2 border-table-border font-bold text-left">File name</th>
                  <th className="p-1 border-2 border-table-border font-bold text-left">Document type</th>
                  <th className="p-1 border-2 border-table-border font-bold text-left">Uploaded on</th>
                  <th className="p-1 border-2 border-table-border font-bold text-left">Uploaded by</th>
                  <th className="p-1 border-2 border-table-border font-bold text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {attachments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-2 border-2 border-table-border text-center text-muted-foreground">
                      No attachments
                    </td>
                  </tr>
                ) : (
                  attachments.map((att) => (
                    <tr key={att.id} className="hover:bg-muted/50">
                      <td className="p-1 border-2 border-table-border">
                        <input 
                          type="checkbox" 
                          checked={selectedAttachments.has(att.id)}
                          onChange={() => toggleAttachment(att.id)}
                          className="rounded-none"
                        />
                      </td>
                      <td className="p-1 border-2 border-table-border">
                        <button className="text-primary hover:underline">{att.fileName}</button>
                      </td>
                      <td className="p-1 border-2 border-table-border">{att.docType}</td>
                      <td className="p-1 border-2 border-table-border">
                        {new Date(att.uploadedAt).toLocaleString('en-GB', { 
                          day: '2-digit', 
                          month: '2-digit', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="p-1 border-2 border-table-border">{att.uploadedBy}</td>
                      <td className="p-1 border-2 border-table-border">{att.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
