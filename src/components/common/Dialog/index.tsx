import React, { useRef, useCallback } from "react";
import Button from "../Button";
import {
  Dialog as DialogUI,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  submitAction?: (params: any) => void;
  cancelText?: string;
  submitText?: string;
  children?: React.ReactNode;
  fit?: boolean;
  titleOff?: boolean;
}

const Dialog: React.FC<IProps> = ({
  triggerElement,
  title,
  description,
  cancelText,
  submitAction,
  submitText,
  children,
  fit,
  titleOff,
}) => {
  const closeBtn = useRef<HTMLButtonElement | null>(null);

  const handleClose = useCallback(() => {
    if (closeBtn.current) closeBtn.current.click();
  }, []);

  const handleSubmit = () => {
    if (!submitAction) return;

    submitAction(handleClose);
  };

  return (
    <DialogUI>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent
        className={twMerge("sm:max-w-[425px]", fit && "max-w-fit sm:max-w-fit min-w-fit")}
      >
        {(title || description) && (
          <DialogHeader>
            {(title && !(titleOff)) && <DialogTitle className="py-2">{title}</DialogTitle>}
        {titleOff && <div className="w-full h-0.5 bg-zinc-900 opacity-20"></div>}
            {description && (
              <DialogDescription className="py-2">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        {children}
        {(cancelText || submitAction) && (
          <DialogFooter>
            <div className="w-full">
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

            {submitAction && (
              <Button
                type="submit"
                onClick={handleSubmit}
                text={submitText}
                className="w-fit py-2 px-4 text-sm ring-2 ring-orange-600 disabled:ring-zinc-400"
                variant="filled"
              />
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </DialogUI>
  );
};
export default Dialog;
