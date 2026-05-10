import { useState } from "react"
import { useSearchParams } from "react-router";
import SortOptionsDropDown from "./SortOptionsDropDown";
import { ArrowDownAZIcon, ArrowUpAZIcon } from "lucide-react";
import UserTemplateListItem from "./UserTemplateListItem";
import type { TemplateCollectionParsed } from "@/types/output";

const UserTemplates = () => {
  const [sortOption, setSortOption] = useState<"Date Modified" | "Name">("Date Modified");
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">("descending");

  const sortOptions: ("Date Modified" | "Name")[] = ["Date Modified", "Name"];

  const [templates, setTemplates] = useState<TemplateCollectionParsed>(JSON.parse(localStorage.getItem("templates") || '{}'));
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  let sortedTemplates:TemplateCollectionParsed = templates;

  if (sortOption==="Date Modified"){
    sortedTemplates = Object.keys(templates).sort((a,b)=>{
      if (sortOrder === "ascending"){
        return new Date(templates[a].lastModified).getTime() - new Date(templates[b].lastModified).getTime();
      } else {
        return new Date(templates[b].lastModified).getTime() - new Date(templates[a].lastModified).getTime();
      }
    }).reduce((acc,key)=>{
      acc[key] = templates[key];
      return acc;
    }, {} as TemplateCollectionParsed);
  } else if (sortOption === "Name"){
    sortedTemplates = Object.keys(templates).sort((a,b)=>{
      if (sortOrder === "ascending"){
        return a.localeCompare(b);
      } else {
        return b.localeCompare(a);
      }
    }).reduce((acc,key)=>{
      acc[key] = templates[key];
      return acc;
    }, {} as TemplateCollectionParsed);
  }

  const handleSortOrder = () => {
    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
  }
  
  let filteredTemplates: TemplateCollectionParsed = sortedTemplates;

  if (searchQuery.trim() !== "") {
    filteredTemplates = Object.keys(sortedTemplates).filter((templateName) => {
      return templateName.toLowerCase().includes(searchQuery.toLowerCase());
    }).reduce((acc, key) => {
      acc[key] = sortedTemplates[key];
      return acc;
    }, {} as TemplateCollectionParsed);
  }

  return (
    <section className="w-full mx-auto mt-16 rounded-xl bg-background border-2 border-border/40">
        <div className="flex justify-between items-center w-full px-4 py-2.5 bg-surface-raised rounded-t-lg border-b-2 border-border/40">
            <div> 
                <h2 className="text-foreground/90 text-sm font-semibold">Saved Templates</h2>
                <p className="text-foreground-muted text-xs">Use your saved templates to create new forms</p>
            </div>
            <div className="flex justify-between items-center gap-3">
                <button onClick={handleSortOrder} className="block p-2 text-foreground/80 bg-surface-raised/60 hover:text-primary-secondary hover:bg-primary/20 hover:scale-105 active:scale-95 transition-all border border-foreground/40 hover:border-primary/25 rounded-md cursor-pointer">
                    {sortOrder === "ascending" ? (
                        <ArrowDownAZIcon className="size-5" strokeWidth={2}/>
                    ) : (
                        <ArrowUpAZIcon className="size-5" strokeWidth={2}/>
                    )}
                </button>
                <SortOptionsDropDown sortOptions={sortOptions} sortOption={sortOption} setSortOption={setSortOption} />
            </div>
        </div>
        <div className="w-full p-3 bg-surface">
            {
                Object.keys(filteredTemplates).length === 0 ? (
                    <>
                        <p className="text-foreground/80 text-center text-lg font-medium pt-8">
                            No Templates Found
                        </p>
                        <p className="text-foreground-muted/90 text-center text-sm pt-2">
                            Create one and save it to use it here. Start by clicking on the <span className="text-primary/90 font-semibold">Create Form</span> Button to create your first form.
                        </p>
                    </>
                ) : (
            Object.keys(filteredTemplates).map((templateName:string) => (
                    <UserTemplateListItem 
                        key={templateName}
                        templateName={templateName}
                        templateData={filteredTemplates[templateName]}
                        setTemplates={setTemplates}
                    />
                )))
            }
        </div>
    </section>
  )
}

export default UserTemplates