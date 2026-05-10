import CreateForm from "@/components/FormHome/CreateForm"
import CreateFormFromJson from "@/components/FormHome/CreateFormFromJson"
import DefaultTemplates from "@/components/FormHome/DefaultTemplates"
import UserTemplates from "@/components/FormHome/UserTemplates/UserTemplates"
import MobileLanding from "@/components/MobileLanding"

const FormRootPage = () => {
  return (
    <>
      <MobileLanding />
      <section className="h-[calc(100vh-var(--spacing-navbar))] w-full px-28 py-8">
          <div className="w-full flex items-center gap-12">
            <CreateForm />
            <CreateFormFromJson />
            <DefaultTemplates />
          </div>
          <UserTemplates />
      </section>
    </>
  )
}

export default FormRootPage