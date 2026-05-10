import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { cn } from "@/lib/utils"

type DropdownProps<T extends string> = {
    items: T[];
    value: T;
    onChange: (value: T) => void;
    placeholder?: string;
    className?: string;
} 

const Dropdown = <T extends string>({items, value, onChange, placeholder, className}: DropdownProps<T>) => {
    return (
    <Combobox
      items={items}
      value={value}
      onValueChange={(val) => {
        if (val !== null) onChange(val);
      }}
    >
      <ComboboxInput className={cn("text-foreground/80", className)} placeholder={placeholder} />
      <ComboboxContent>
        <ComboboxEmpty>No items found</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export default Dropdown