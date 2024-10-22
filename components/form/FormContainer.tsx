"use client";

import { useFormState } from "react-dom";
import { actionFunction, actionState } from "@/utils/types";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

const initialState: actionState = {
  message: "",
  variant: "destructive",
};

function FormContainer({
  action,
  children,
  className,
}: {
  action: actionFunction;
  children: React.ReactNode;
  className?: string;
}) {
  const [state, formAction] = useFormState(action, initialState);

  useEffect(() => {
    if (state.message) {
      toast({
        description: state.message,
        variant: state.variant,
      });
    }
  }, [state]);
  return (
    <form action={formAction} className={className}>
      {children}
    </form>
  );
}
export default FormContainer;
