import { FileTerminal, Layout, Code2, ToggleLeft, Shield, Save, Layers, ArrowRight, Github, Linkedin, Mail } from "lucide-react";

const MobileLanding = () => {
  return (
    <div className="fixed inset-0 z-100 bg-background text-foreground overflow-y-auto scrollbar-custom lg:hidden">
      {/* 1. Navbar */}
      <nav className="flex items-center gap-2 px-4 md:px-8 py-5 border-b border-border/50 bg-surface">
        <FileTerminal className="text-primary size-6" />
        <span className="font-bold text-lg tracking-wide">Codiform</span>
      </nav>

      <div className="px-4 md:px-8 pb-12">
        {/* 2. Hero */}
        <section className="mt-12 md:mt-20">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Build React forms without the boilerplate
          </h1>
          <p className="mt-6 text-base md:text-lg text-foreground-secondary leading-relaxed">
            Codiform lets you drag fields onto a canvas, set up your validation rules, and instantly get clean React form code. No more writing the same form setup over and over.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 text-primary text-sm font-medium opacity-90">
            Open on a desktop or laptop to start building <ArrowRight className="size-4" />
          </div>
        </section>

        {/* 3. Video */}
        <section className="mt-16 md:mt-24">
          <div className="w-full max-w-2xl mx-auto rounded-xl border border-border/50 bg-surface overflow-hidden shadow-card relative">
            <video 
              src="/video/demo.mp4" 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-auto block"
            />
          </div>
          <p className="mt-4 text-center text-sm text-foreground-muted">
            Watch the full form-to-code workflow in 30 seconds
          </p>
        </section>

        {/* 4. Features */}
        <section className="mt-20 md:mt-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Feature 1 */}
            <div className="bg-surface p-6 rounded-lg border border-border/40">
              <Layout className="text-primary size-6 mb-4" />
              <h3 className="text-lg font-semibold mb-2">15 Field Types</h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                We include 15 different field types like text, dropdowns, and date pickers. You get every field you need to build a complete form.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-surface p-6 rounded-lg border border-border/40">
              <Code2 className="text-primary size-6 mb-4" />
              <h3 className="text-lg font-semibold mb-2">4 Library Combos</h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                You can choose React Hook Form or Formik. Then pair it with either Zod or Yup for validation.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-surface p-6 rounded-lg border border-border/40">
              <ToggleLeft className="text-primary size-6 mb-4" />
              <h3 className="text-lg font-semibold mb-2">TypeScript & JavaScript</h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                Codiform generates both TypeScript and JavaScript code. You can switch between them with a single click.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="bg-surface p-6 rounded-lg border border-border/40">
              <Shield className="text-primary size-6 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Built-in Validation</h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                You can set rules for required fields, min and max lengths, and patterns. It also lets you add custom error messages for each rule.
              </p>
            </div>
            {/* Feature 5 */}
            <div className="bg-surface p-6 rounded-lg border border-border/40">
              <Save className="text-primary size-6 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Save Templates</h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                You can save your form layouts as templates to use again later. You can also export them as JSON and import them back anytime.
              </p>
            </div>
            {/* Feature 6 */}
            <div className="bg-surface p-6 rounded-lg border border-border/40">
              <Layers className="text-primary size-6 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Clean Generated Code</h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                The code Codiform generates is properly formatted and ready to paste into your project. It includes all your imports, validation schemas, default values, and error handling.
              </p>
            </div>
          </div>
        </section>

        {/* 5. How it works */}
        <section className="mt-20 md:mt-28">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">How it works</h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="shrink-0 size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="text-lg font-semibold mb-1">Pick your fields</h4>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  Click any field type from the sidebar to add it to your form. You can add text inputs, dropdowns, checkboxes, date pickers and more.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="text-lg font-semibold mb-1">Set it up</h4>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  Click a field to edit its label, placeholder text and validation rules. You can make fields required, set min and max lengths, and add custom error messages.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="text-lg font-semibold mb-1">Get your code</h4>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  Choose your preferred library and language, then click Generate Code. Copy the output and paste it straight into your React project.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Screenshots */}
        <section className="mt-20 md:mt-28">
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">See it in action</h2>
            <p className="text-sm md:text-base text-foreground-secondary leading-relaxed max-w-2xl">
              Take a look at the interface and the actual code snippets it generates. Everything is designed to be clean, simple, and ready for your project.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { src: "/screenshots/01-homepage.png", alt: "The main dashboard where you manage your form templates" },
              { src: "/screenshots/02-builderpage.png", alt: "Drag and drop form builder canvas" },
              { src: "/screenshots/03-schemacode.png", alt: "Generated Zod validation schema" },
              { src: "/screenshots/04-formcode.png", alt: "Generated React Hook Form code" },
              { src: "/screenshots/05-jsonschema.png", alt: "Exported JSON schema for your form" },
              { src: "/screenshots/06-fullcode.png", alt: "Complete production-ready code output" },
              { src: "/screenshots/07-previewpage.png", alt: "Live interactive preview of your form" },
              { src: "/screenshots/08-replace-confirmation.png", alt: "Safety prompt before replacing templates" },
              { src: "/screenshots/09-delete-confirmation.png", alt: "Safety prompt before deleting forms" },
              { src: "/screenshots/10-createformfromjson.png", alt: "Import existing forms via JSON schema" }
            ].map((shot, idx) => (
              <div key={idx} className="w-full rounded-xl border border-border/50 bg-surface overflow-hidden shadow-card flex flex-col">
                <img 
                  src={shot.src} 
                  alt={shot.alt} 
                  className="w-full h-auto block border-b border-border/20"
                  loading="lazy"
                />
                <div className="p-3 bg-surface-raised mt-auto">
                  <p className="text-sm font-medium text-foreground-secondary">{shot.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Footer */}
        <footer className="mt-20 pt-8 border-t border-border/40 text-center">
          <p className="text-sm text-foreground-muted mb-1">Codiform. Built by Priyam Srivastava.</p>
          <div className="flex items-center gap-4 justify-center mt-2 mb-4">
            <a href="https://github.com/PriyamSrivastava1507" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
              <Github size={18} className="text-foreground-muted hover:text-foreground transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/priyam-srivastava-cse/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
              <Linkedin size={18} className="text-foreground-muted hover:text-foreground transition-colors" />
            </a>
            <a href="mailto:priyam.srivastava1575@gmail.com" aria-label="Send an Email">
              <Mail size={18} className="text-foreground-muted hover:text-foreground transition-colors" />
            </a>
          </div>
          <p className="text-xs text-foreground-subtle">A desktop-only developer tool. Best experienced on a laptop or desktop.</p>
        </footer>
      </div>
    </div>
  );
};

export default MobileLanding;
