import { useFormStore } from "@/store/form.store";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

type RepositionSectionProps = {
    selectedId: string;
    selectedIndex: number;
    fieldsLength: number;
}

/**
 * @component
 * Provides UI controls in the properties pane to manually reposition a field on the canvas.
 * Allows moving the field up, down, or to a specific numeric position.
 * @param {RepositionSectionProps} props - Component props
 * @param {string} props.selectedId - The ID of the selected field
 * @param {number} props.selectedIndex - The current index of the selected field
 * @param {number} props.fieldsLength - The total number of fields on the canvas
 */
const RepositionSection = ({selectedId, selectedIndex, fieldsLength}: RepositionSectionProps) => {

  const reorderFields = useFormStore(state=>state.reorderFields);
  
  const [reorderPosition, setReorderPosition] = useState<string>("");

  const handlePositionChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value;
    setReorderPosition(value);
  }

  const handleMoveToPosition = ()=>{

    if(reorderPosition === ""){
        return;
    }

    const position = Number(reorderPosition);

    if(Number.isNaN(position)){
        setReorderPosition("");
        return;
    }

    if(position < 1){
        setReorderPosition(String(1));
        reorderFields(selectedIndex, 0);
    }else if(position > fieldsLength){
        setReorderPosition(String(fieldsLength));
        reorderFields(selectedIndex, fieldsLength-1);
    }else{
        setReorderPosition(String(position));
        reorderFields(selectedIndex, position-1);
    }
  }

  const handleMoveUp = ()=>{
    reorderFields(selectedIndex, selectedIndex-1);
  }

  const handleMoveDown = ()=>{
    reorderFields(selectedIndex, selectedIndex+1);
  }

  useEffect(() => {
      if (!selectedId) return;
      const el = document.querySelector(`[data-field-id="${selectedId}"]`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, [selectedId, selectedIndex]);

  return (
    <div className="px-2 pt-1 mb-5 pb-6 border-b-[1.5px] border-border/80">
       <h3 className="text-sm font-semibold text-foreground-muted">REPOSITION</h3>
       <div className="mt-4 xl:flex xl:gap-5 xl:items-center">
            <button 
                id="moveUp" 
                type="button" 
                className="xl:w-[45%] lg:w-[60%] xl:mb-0 lg:mb-3 px-1 py-2 flex gap-1 justify-center items-center text-foreground/70 cursor-pointer rounded-md border border-foreground/70 hover:border-primary-secondary/15 hover:scale-105 hover:text-primary-secondary hover:bg-primary/15 active:scale-95 transition-all transition-duration-150"
                onClick={handleMoveUp}
            >
                <ChevronUp size={14} strokeWidth={2.5}/>
                <span className="text-xs font-semibold mr-1">
                    Move Up
                </span>
            </button>
            <button 
                id="moveDown" 
                type="button" 
                className="xl:w-[45%] lg:w-[60%] px-1 py-2 flex gap-1 justify-center items-center text-foreground/70 cursor-pointer rounded-md border border-foreground/70 hover:border-primary-secondary/15 hover:scale-105 hover:text-primary-secondary hover:bg-primary/15 active:scale-95 transition-all transition-duration-150"
                onClick={handleMoveDown}
            >
                <ChevronDown size={14} strokeWidth={2.5}/>
                <span className="text-xs font-semibold mr-0.5">
                    Move Down
                </span>
            </button>
        </div>
        <div className="mt-6">
            <p className="text-sm font-semibold text-foreground-muted">Current Position : <span className="text-foreground/80">{selectedIndex+1}</span></p>
        </div> 
        <div className="mt-3">
            <label htmlFor="position" className="block mb-2 text-sm font-semibold text-foreground-muted">Move to Position</label>
            <div className="w-full flex gap-2">
                <input 
                    type="text" 
                    id="position" 
                    placeholder="Eg. 2" 
                    value={reorderPosition} 
                    onChange={handlePositionChange}
                    className="w-[60%] px-1 py-1 rounded-sm border-b-[1.5px] bg-surface-overlay/60 outline-none text-foreground/80 text-xs border border-border/20 placeholder:text-foreground/60 hover:border-primary/50 focus:border-primary/50 transition-all duration-200" 
                />
                <button 
                    type="button" 
                    className="w-[25%] p-1 text-foreground/70 cursor-pointer rounded-md border border-foreground/70 hover:border-primary-secondary/15 hover:scale-105 hover:text-primary-secondary hover:bg-primary/15 active:scale-95 transition-all transition-duration-150"
                    onClick={handleMoveToPosition}>
                    Move
                </button>
            </div>
            <p className="text-xs text-muted-foreground mt-5">* Enter position number between {1} to {fieldsLength}</p>
            <p className="text-xs text-muted-foreground mt-2">* Invalid values will be clipped to nearest valid position</p>
        </div> 
    </div>
  )
}

export default RepositionSection