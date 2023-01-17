export type Urls = {
  getAll: string;
  getById: string;
  create: string;
  delete: string;
  edit: string;
};

export type GetAllReponse = {
  client: string;
  colors: string;
  createdAt: string;
  logo: string;
  primaryColor: string;
  status: string;
  title: string;
  updatedAt: string;
  _id: string;
};

export type ApiResponse = {
  message: string;
  isError: boolean;
}