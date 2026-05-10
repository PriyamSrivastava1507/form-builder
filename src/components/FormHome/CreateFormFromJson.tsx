import { useState } from "react";
import { Braces } from "lucide-react";
import { useFormStore } from "@/store/form.store";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import Modal from "@/components/ui/Modal";

/**
 * @component
 * Renders the "Create From JSON" card and manages its corresponding modal.
 * Allows users to paste a JSON array of fields to initialize a form.
 */
const CreateFormFromJson = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const setFields = useFormStore((state) => state.setFields);
  const clearFields = useFormStore((state) => state.clearFields);
  const setFormName = useFormStore((state) => state.setFormName);

  const handleCreate = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (!Array.isArray(parsed)) {
        toast.error("JSON must be an array of fields.");
        return;
      }
      clearFields();
      // Use structuredClone just like we do with templates to avoid object reference mutation issues
      setFields(structuredClone(parsed));
      setFormName("Untitled Form");
      setOpenModal(false);
      navigate("/builder");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      toast.error("Invalid JSON format.");
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    setJsonInput("");
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-foreground/80 mb-5">Create From JSON</h3> 
      <button
        onClick={() => setOpenModal(true)}
        className="group/create-json-btn h-36 w-60 shrink-0 bg-surface border-border border-[1.5px] rounded-sm flex items-center justify-center hover:border-primary/40 hover:bg-primary/20 transition-all cursor-pointer"
      >
        <Braces size={40} strokeWidth={2} className="text-foreground/80 group-hover/create-json-btn:text-primary-secondary transition-colors duration-200" />
      </button>

      <Modal open={openModal} onClose={handleClose} heading="Create Form From JSON">
        <div className="px-8 pt-3 pb-2">
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className="w-full h-64 resize-none text-sm text-foreground/90 font-normal p-2.5 bg-surface-raised/50 rounded-md outline-2 outline-border/50 focus:outline-primary/50 transition-all duration-100"
          />
        </div>
        <div className="flex gap-4 justify-end bg-surface-raised/20 mt-6 p-4 border-t-[1.5px] border-border/60">
          <button
            type="button"
            aria-label="Cancel"
            onClick={handleClose}
            className="flex items-center w-[90px] justify-center gap-2 p-2 text-foreground/90 bg-surface-raised/80 border-2 border-border/80 hover:text-destructive hover:bg-destructive/10 hover:border-destructive/15 hover:scale-105 active:scale-95 transition-all rounded-md cursor-pointer"
          >
            <span className="text-sm font-medium">Cancel</span>
          </button>
          <button
            type="button"
            aria-label="Create"
            onClick={handleCreate}
            className="flex items-center w-[90px] justify-center gap-2 p-2 text-foreground/90 bg-primary/80 hover:bg-primary/80 hover:scale-105 active:scale-95 transition-all rounded-md cursor-pointer"
          >
            <span className="text-sm font-medium">Create</span>
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateFormFromJson;
