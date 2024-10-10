export interface IApiError {
  response: {
    data: {
      error: string;
      field: string;
    };
  };
}
