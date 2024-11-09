import React from "react";
import {
  Accordion as AccordionUI,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Field {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  fields: Field[];
}

const Accordion: React.FC<AccordionProps> = ({ fields }) => {
  return (
    <div>
      <AccordionUI type="single" collapsible className="w-full">
        {fields.map((field, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{field.title}</AccordionTrigger>
            <AccordionContent>{field.content}</AccordionContent>
          </AccordionItem>
        ))}
      </AccordionUI>
    </div>
  );
};

export default Accordion;
