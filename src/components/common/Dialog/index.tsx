import React, { useRef, useCallback, ReactElement } from "react";
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
// import { get } from "http";
// import { useQueryClient } from "@tanstack/react-query";

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
  const handleClose = useCallback(() => {
    if (closeBtn.current) closeBtn.current.click();
    // const queryClient = useQueryClient();
    // const queryKey = getQuery();

    // queryClient.invalidateQueries(queryKey);
  }, []);

  const renderChildrenWithProps = () => {
    if (!children) return <></>;
    return React.cloneElement(children as ReactElement, {
      handleClose,
    });
  };

  const dialogTitleId = title ? "dialog-title" : undefined;
  const dialogDescriptionId = description ? "dialog-description" : undefined;

  return (
    <DialogUI>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent
        className={twMerge(
          "sm:max-w-[425px] ",
          fit && "max-w-fit sm:max-w-fit min-w-fit"
        )}
        aria-labelledby={dialogTitleId}
        aria-describedby={dialogDescriptionId}
      >
        {/* tem q ter se n da erro no console */}
        <DialogTitle className="hidden" />
        {/* isso aqui em cima  */}
        <DialogHeader>
          {title && !titleOff && (
            <>
              <DialogTitle className="py-2" id={dialogTitleId}>
                {title}
              </DialogTitle>
              <div className="h-0.5 bg-zinc-200 col-span-2"></div>
            </>
          )}
          {description && (
            <DialogDescription className="py-2">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

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
