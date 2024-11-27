import React, { useRef, useCallback, ReactElement, useState } from "react";
import Button from "../Button";
import {
  Dialog as DialogUI,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { twMerge } from "tailwind-merge";

interface IProps {
  triggerElement: React.ReactNode;
  title?: string;
  description?: string;
  cancelText?: string;
  submitText?: string;
  children?: React.ReactNode;
  fit?: boolean;
  titleOff?: boolean;
  submitable?: boolean;
}

const Dialog: React.FC<IProps> = ({
  triggerElement,
  title,
  description,
  cancelText,
  submitable,
  children,
  fit,
  titleOff,
}) => {
  const closeBtn = useRef<HTMLButtonElement | null>(null);
  //const [query, setQuery] = useState("");
  const handleClose = useCallback(() => {
    if (closeBtn.current) closeBtn.current.click();
    // setQuery("");
  }, []);

  const renderChildrenWithProps = () => {
    if (!children) return <></>;
    return React.cloneElement(children as ReactElement, {
      handleClose,
    });
  };

  return (
    <DialogUI>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent
        className={twMerge(
          "sm:max-w-[425px] ",
          fit && "max-w-fit sm:max-w-fit min-w-fit"
        )}
      >
        {(title || description) && (
          <DialogHeader>
            {title && !titleOff && (
              <>
                {" "}
                <DialogTitle className="py-2">{title}</DialogTitle>{" "}
                <div className="h-0.5 bg-zinc-200 col-span-2"></div>
              </>
            )}
            {titleOff && (
              <div className="w-full h-0.5 bg-zinc-900 opacity-20"></div>
            )}
            {description && (
              <DialogDescription className="py-2">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        {renderChildrenWithProps()}
        {(cancelText || submitable) && (
          <div className="absolute left-6 bottom-6">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                text={cancelText}
                ref={closeBtn}
                className={twMerge(
                  "w-fit py-2 px-4 text-sm",
                  !cancelText && "hidden"
                )}
              />
            </DialogClose>
          </div>
        )}
      </DialogContent>
    </DialogUI>
  );
};
export default Dialog;
