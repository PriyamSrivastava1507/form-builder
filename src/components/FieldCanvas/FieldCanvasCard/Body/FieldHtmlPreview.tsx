import type { FieldSchema } from "@/types/field";

type FieldHtmlPreviewProps = {
    field: FieldSchema;
    localLabel: string;
    localPlaceholder: string;
}

const FieldHtmlPreview = ({field, localLabel, localPlaceholder}: FieldHtmlPreviewProps) => {
  return (
    <div className="mt-auto mb-4 pt-2 absolute bottom-0 right-0">
      <div className="text-foreground-secondary/50 text-xs font-mono select-none text-right">
        {field.type === "select" ? (
          <>
            {"<label for=\"id\">"}
            <span className="text-foreground/50">{localLabel || 'label'}</span>
            {"</label>"}
            <br />
            {"<select id=\"id\" name=\"name\""}
            {field.disabled && <span className="text-foreground/50"> disabled</span>}
            {">...</select>"}
          </>
        ) : (field.type === "checkboxGroup" || field.type === "radioGroup") ? (
          <>
            {"<fieldset>"}
            <br />
            {"  <legend>"}
            <span className="text-foreground/50">{localLabel || 'label'}</span>
            {"</legend>"}
            <br />
            {"  <label>"}
            <span className="text-foreground/50">option</span>
            {"</label>"}
            <br />
            {"  <input type="}
            <span className="text-foreground/50">
              {field.type === "radioGroup" ? '"radio"' : '"checkbox"'}
            </span>
            {" name=\"name\" value=\"value\"/>"}
            <br />
            {"</fieldset>"}
          </>
        ) : (
          <>
            {"<label for=\"id\">"}
            <span className="text-foreground/50">{localLabel || 'label'}</span>
            {"</label>"}
            <br />
            {"<input id=\"id\" name=\"name\" type="}
            <span className="text-foreground/50">
              {field.type === 'text' ? `"${field.subtype}"` : `"${field.type}"`}
            </span>
            {(field.type === 'text' || field.type === 'textarea') && (
              <>
                {" placeholder="}
                <span className="text-foreground/50">
                  {localPlaceholder ? `"${localPlaceholder}"` : '""'}
                </span>
              </>
            )}
            {field.disabled && (
              <span className="text-foreground/50"> disabled</span>
            )}
            {" />"}
          </>
        )}
      </div>
    </div>
  )
}

export default FieldHtmlPreview