import Dropdown from "@/components/ui/dropdown";

type SortOptionsDropDownProps = {
    sortOptions:  ("Date Modified" | "Name")[];
    sortOption: "Date Modified" | "Name";
    setSortOption: (sortOption: "Date Modified" | "Name") => void;
}

const SortOptionsDropDown = ({sortOptions, sortOption, setSortOption}: SortOptionsDropDownProps) => {
    return(
        <Dropdown items={sortOptions} value={sortOption} onChange={setSortOption} className="h-[39px] bg-surface-raised/60 border border-foreground/40"/>
    )
    
}

export default SortOptionsDropDown