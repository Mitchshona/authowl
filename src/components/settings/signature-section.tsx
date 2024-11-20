import { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

interface Signature {
  signatureId: number;
  signatureName: string;
}

interface SignatureSectionProps {
  signatures: Signature[];
  defaultSignatureId: number | null;
  onAddSignature: (name: string) => Promise<Signature | undefined>;
  onRemoveSignature: (signatureId: number) => Promise<void>;
}

export default function SignatureSection({
  signatures,
  defaultSignatureId,
  onAddSignature,
  onRemoveSignature
}: SignatureSectionProps) {
  const [selectedSignature, setSelectedSignature] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSignatureName, setNewSignatureName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (signatures.length > 0) {
      if (defaultSignatureId !== null) {
        setSelectedSignature(defaultSignatureId.toString());
      } else if (!signatures.find(sig => sig.signatureId.toString() === selectedSignature)) {
        setSelectedSignature(signatures[0].signatureId.toString());
      }
    } else {
      setSelectedSignature("");
    }
  }, [signatures, defaultSignatureId]);

  const handleAddSignature = async () => {
    if (!newSignatureName) return;
    setIsLoading(true);
    setError(null);
    try {
      const newSignature = await onAddSignature(newSignatureName);
      if (newSignature) {
        setSelectedSignature(newSignature.signatureId.toString());
      }
      setIsDialogOpen(false);
      setNewSignatureName("");
    } catch (err) {
      setError("Failed to add signature. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveSignature = async () => {
    if (!selectedSignature) return;
    setIsLoading(true);
    setError(null);
    try {
      await onRemoveSignature(parseInt(selectedSignature));
      setSelectedSignature("");
    } catch (err) {
      setError("Failed to remove signature. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const getSelectedSignatureName = () => {
    const selected = signatures.find(sig => sig.signatureId.toString() === selectedSignature);
    return selected ? selected.signatureName : "Select signature";
  };

  return (
    <div className="grid grid-cols-[400px_1fr] border-b-[1px] border-[#C3C9CD66] pb-4">
      <div className="flex flex-col gap-[4px]">
        <Label className="typography-label-medium-medium text-[#364A59]">
          Signature
        </Label>
        <p className="typography-label-medium-regular text-[#5E6E7A]">
          Create signatures for report sign offs.
        </p>
      </div>

      <div className="flex flex-col gap-[14px]">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="flex items-center gap-4">
          <Select
            value={selectedSignature}
            onValueChange={(value) => {
              console.log("Selected value:", value);
              if (value === "add-new") {
                setIsDialogOpen(true);
              } else {
                setSelectedSignature(value);
              }
            }}
          >
            <SelectTrigger className="w-full max-w-[200px]">
              <SelectValue>{getSelectedSignatureName()}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {signatures.map((sig) => (
                <SelectItem key={sig.signatureId} value={sig.signatureId.toString()}>
                  {sig.signatureName} {sig.signatureId === defaultSignatureId ? " (Default)" : ""}
                </SelectItem>
              ))}
              <SelectItem value="add-new">
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add new signature
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRemoveSignature}
            disabled={isLoading || !selectedSignature || selectedSignature === defaultSignatureId?.toString()}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Signature</DialogTitle>
              <DialogDescription>
                Enter a name for your new signature.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="signature-name">Signature Name</Label>
                <Input
                  id="signature-name"
                  value={newSignatureName}
                  onChange={(e) => setNewSignatureName(e.target.value)}
                  placeholder="e.g., Official Signature"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSignature} disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Signature'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}