import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type DatePickerProps = {
    id?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const DatePicker = ({ id, value, onChange, placeholder = "Select date", className }: DatePickerProps) => {
    const [open, setOpen] = React.useState(false)
    const selected = value ? new Date(value) : undefined

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    variant="outline"
                    className={cn(
                        "justify-start font-normal w-full text-xs h-8 bg-surface-overlay/60 border-border/20 hover:border-primary/50 transition-all duration-200",
                        !selected && "text-foreground/60",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 size-3 text-foreground-muted" />
                    {selected ? format(selected, "PPP") : placeholder}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                    mode="single"
                    selected={selected}
                    defaultMonth={selected}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                        onChange(date ? format(date, "yyyy-MM-dd") : "")
                        setOpen(false)
                    }}
                />
            </PopoverContent>
        </Popover>
    )
}

export { DatePicker }
