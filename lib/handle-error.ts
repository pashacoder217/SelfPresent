import { isRedirectError } from "next/dist/client/components/redirect";
import { toast } from "sonner";
import { z } from "zod";

export const getErrorMessage = (err: unknown) => {
  const unKnownError = "Something went wrong, plase try again later!";

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue, index) => {
      return issue.message
    })
    return errors.join("\n");
  } else if (err instanceof Error) {
    return err.message;
  } else if (isRedirectError(err)) {
    throw err;
  } else {
    return unKnownError;
  }
}
export const showErrorToast = (err: unknown) => {
  const errorMessage = getErrorMessage(err);
  return toast.error(errorMessage);
}
