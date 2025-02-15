import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/constants/data";
import { Question } from "@phosphor-icons/react/dist/ssr";

export default function FAQ() {
  return (
    <>
      <section className="flex flex-col my-44 items-center w-full max-w-7xl px-4 mx-auto">
        <div className="flex flex-col items-center py-4 mb-8 w-full h-60">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-sm bg-accent/30 w-fit border-accent border-2 px-4 py-2 rounded-full font-semibold flex items-center gap-2">
              <Question weight="fill" className="size-4" />
              FAQ
            </h2>
            <div className="text-3xl md:text-5xl text-center font-semibold">
              Frequently Asked
              <br />{" "}
              <span className="bg-gradient-to-br from-primary via-purple-400 to-purple-100 text-transparent bg-clip-text">
                <span className="font-secondary">Questions</span>
              </span>
            </div>
          </div>
          <p className="text-center text-sm mt-4">
            Here are some of the questions that we get asked about PhotoAI.
          </p>
        </div>
        <div className="max-w-3xl mx-auto w-full">
          {/* add shadcn accordion component here */}
          <Accordion type="single" collapsible>
            {faq.map((item, index) => (
              <AccordionItem
                key={index}
                className="px-4 mb-4 rounded-md bg-accent/40"
                value={index.toString()}
              >
                <AccordionTrigger className="text-lg font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
