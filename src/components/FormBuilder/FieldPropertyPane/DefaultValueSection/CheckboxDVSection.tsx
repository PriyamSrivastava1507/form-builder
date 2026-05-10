import type { CheckboxField} from '@/types/field'
import { Switch } from '../../../ui/switch'
import { useFormStore } from '@/store/form.store'

type CheckboxDVSectionProps = {
    field: CheckboxField
}

const CheckboxDVSection = ({field}: CheckboxDVSectionProps) => {
    const updateField = useFormStore(state=>state.updateField);

    const onUpdate = (updates: Partial<CheckboxField>) => {
      updateField(field.id, updates);
    }

    
  return (
    <div className="py-2 pr-2 my-1">
        <div className="flex items-center gap-3 mt-2">
            <label htmlFor={field.id+"-default-value"} className='text-sm text-muted-foreground'>Set as default</label>
            <div className='flex items-center gap-2'>
                <Switch
                    id={field.id+"-default-value"}
                    className="mr-1.5"
                    checked={field.defaultValue}
                    onCheckedChange={(checked) => onUpdate({ defaultValue: checked})}
                />
                <p className="text-sm text-muted-foreground">{field.defaultValue ? "True" : "False"}</p>
            </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
            * This value will be set as default value for the field when the form code is generated
        </p>
    </div>
  )
}

export default CheckboxDVSection