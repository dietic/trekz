import { FieldValues, UseFormHandleSubmit } from "react-hook-form";

export function createActionHandler<T extends FieldValues>(
  handleSubmit: UseFormHandleSubmit<T>,
  onSubmit: (data: T) => Promise<void> | void,
) {
  return (formData: FormData) => {
    const parsedData = Object.fromEntries(formData.entries()) as T;
    handleSubmit(() => onSubmit(parsedData))();
  };
}
