import Dropdown from "@/components/ui/dropdown";

type SortOptionsDropDownProps = {
    sortOptions:  ("Date Modified" | "Name")[];
    sortOption: "Date Modified" | "Name";
    setSortOption: (sortOption: "Date Modified" | "Name") => void;
}

/**
 * @component
 * A simple dropdown component for selecting the sort criteria (e.g., Date Modified vs Name).
 * @param {SortOptionsDropDownProps} props - Component props
 * @param {("Date Modified" | "Name")[]} props.sortOptions - Available sort options
 * @param {"Date Modified" | "Name"} props.sortOption - Currently selected sort option
 * @param {(sortOption: "Date Modified" | "Name") => void} props.setSortOption - Function to update the sort option
 */
const SortOptionsDropDown = ({sortOptions, sortOption, setSortOption}: SortOptionsDropDownProps) => {
    return(
        <Dropdown items={sortOptions} value={sortOption} onChange={setSortOption} className="h-[39px] bg-surface-raised/60 border border-foreground/40"/>
    )
    
}

export default SortOptionsDropDown