import { GetAllReponse } from "./api/types";

export type GetAllState = Omit<GetAllReponse, "updatedAt">;

export type FormDataState = {
  title: string;
  client: string;
  status: string;
  colors: string;
  logo: string;
};
