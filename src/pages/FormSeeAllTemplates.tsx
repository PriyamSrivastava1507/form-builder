import { TEMPLATE_CATEGORIES, getTemplatesByCategory } from "@/constants/templates";
import DefaultTemplatesItem from "@/components/FormHome/DefaultTemplatesItem";

const FormSeeAllTemplates = () => {
  return (
    <div className="w-full h-[calc(100vh-var(--spacing-navbar))] p-8 max-w-7xl mx-auto overflow-y-auto custom-scrollbar pb-24">
      <div className="flex flex-col gap-12">
        {TEMPLATE_CATEGORIES.map((category) => {
          const templates = getTemplatesByCategory(category);
          if (templates.length === 0) return null;

          return (
            <section key={category} className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">{category}</h2>
              <div className="flex flex-wrap gap-8">
                {templates.map((template) => (
                  <DefaultTemplatesItem key={template.id} template={template} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default FormSeeAllTemplates;
