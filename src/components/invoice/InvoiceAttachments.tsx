import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InvoiceAttachment } from "@/data/invoiceTypes";
import { toast } from "sonner";

interface InvoiceAttachmentsProps {
  attachments: InvoiceAttachment[];
  setAttachments: (attachments: InvoiceAttachment[]) => void;
  onBack: () => void;
  onSubmit: () => void;
  onSaveDraft: () => void;
}

export const InvoiceAttachments = ({
  attachments,
  setAttachments,
  onBack,
  onSubmit,
  onSaveDraft,
}: InvoiceAttachmentsProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<'Invoice PDF' | 'Packing list' | 'Other'>('Invoice PDF');
  const [confirmed, setConfirmed] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }

    const newAttachment: InvoiceAttachment = {
      id: `att-${Date.now()}`,
      fileName: selectedFile.name,
      documentType: documentType,
      uploadedAt: new Date().toISOString(),
    };

    setAttachments([...attachments, newAttachment]);
    setSelectedFile(null);
    // Reset the file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
    toast.success("File uploaded");
  };

  const handleDelete = (id: string) => {
    setAttachments(attachments.filter(att => att.id !== id));
    toast.success("Attachment deleted");
  };

  const handleSubmit = () => {
    if (!confirmed) {
      toast.error("Please confirm that the data is correct");
      return;
    }
    onSubmit();
  };

  const hasInvoicePDF = attachments.some(att => att.documentType === 'Invoice PDF');

  return (
    <div>
      <div className="border border-border bg-card p-3 mb-3">
        <div className="text-xs font-semibold mb-2 bg-muted/50 p-1 border border-border">
          UPLOAD ATTACHMENTS
        </div>
        <div className="text-xs mb-3 text-muted-foreground">
          Please attach the invoice PDF and any other relevant documents (packing lists, etc.)
        </div>

        <div className="grid grid-cols-3 gap-3 mb-3">
          <div>
            <label className="text-xs block mb-1">Select File:</label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="h-7 text-xs w-full border border-input bg-background px-2 file:mr-2 file:h-5 file:border-0 file:bg-muted file:px-2 file:text-xs"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
            {selectedFile && (
              <div className="text-xs text-muted-foreground mt-1">
                {selectedFile.name}
              </div>
            )}
          </div>
          <div>
            <label className="text-xs block mb-1">Document Type:</label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value as any)}
              className="h-7 text-xs w-full border border-input bg-background px-2"
            >
              <option value="Invoice PDF">Invoice PDF</option>
              <option value="Packing list">Packing list</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button size="sm" onClick={handleUpload}>
              UPLOAD
            </Button>
          </div>
        </div>

        {attachments.length > 0 && (
          <div className="border border-border bg-background mt-3">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="text-left p-2 border-r border-border font-semibold">File Name</th>
                  <th className="text-left p-2 border-r border-border font-semibold">Type</th>
                  <th className="text-left p-2 border-r border-border font-semibold">Uploaded At</th>
                  <th className="text-left p-2 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {attachments.map((att) => (
                  <tr key={att.id} className="border-b border-border">
                    <td className="p-2 border-r border-border">{att.fileName}</td>
                    <td className="p-2 border-r border-border">{att.documentType}</td>
                    <td className="p-2 border-r border-border">
                      {new Date(att.uploadedAt).toLocaleString()}
                    </td>
                    <td className="p-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDelete(att.id)}
                      >
                        DELETE
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!hasInvoicePDF && (
        <div className="border border-border bg-yellow-50 p-2 mb-3 text-xs text-yellow-900">
          ⚠ Warning: You must attach at least one "Invoice PDF" before submitting.
        </div>
      )}

      <div className="border border-border bg-card p-3 mb-3">
        <label className="flex items-start text-xs cursor-pointer">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-0.5 mr-2"
          />
          <span>
            I confirm that the data entered matches the purchase order and the invoice document.
          </span>
        </label>
      </div>

      <div className="mt-3 flex gap-2">
        <Button size="sm" variant="outline" onClick={onBack}>
          BACK
        </Button>
        <Button size="sm" variant="outline" onClick={onSaveDraft}>
          SAVE DRAFT
        </Button>
        <Button 
          size="sm" 
          onClick={handleSubmit}
          disabled={!hasInvoicePDF || !confirmed}
        >
          SUBMIT INVOICE
        </Button>
      </div>
    </div>
  );
};
