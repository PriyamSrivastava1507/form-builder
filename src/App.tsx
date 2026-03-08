import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { FieldPalette } from './components/FieldPalette/FieldPalette';
import { LAYOUT_CLASSES } from './constants/layout';
import { useFormStore } from './store/formStore';

export const App = () => {
  const fields = useFormStore((state) => state.fields);

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-zinc-950 text-zinc-100">
        <FieldPalette />
        <main className="flex-1 p-8 overflow-y-auto">
          {fields.length === 0 ? (
            <div className="h-full flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500">
              Drag or click fields to build your form
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-4">
              <h2 className="text-xl font-semibold mb-6">Form Canvas ({fields.length} {fields.length === 1 ? 'field' : 'fields'})</h2>
              {fields.map(field => (
                <div key={field.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                  <div className="text-sm font-medium text-zinc-300">{field.label}</div>
                  <div className="text-xs text-zinc-500 mt-1">ID: {field.id} • Type: {field.type}</div>
                </div>
              ))}
            </div>
          )}
        </main>
        <aside className={`${LAYOUT_CLASSES.sidebarWidth} border-l border-zinc-800`}></aside>
      </div>
    </ErrorBoundary>
  );
};