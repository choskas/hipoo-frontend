import { FormDataState } from "../../types";

export type CustomDrawerProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  formData: FormDataState | null;
  setFormData: (value: any) => void;
  onPostTheme: () => void;
};

export type IsErrorForm = {
  title: boolean;
  client: boolean;
  color: boolean;
  logo: boolean;
  status: boolean;
};
