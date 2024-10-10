interface IRes {
  field?: string;
  message?: string;
  error?: string;
  data?: Record<string, string> | undefined;
}

export default (err: any): IRes => {
  if (!err?.response?.data) return { error: err };
  const { data } = err.response;
  const { field, message, error } = data;

  const mappedData = { [field]: message ?? error };

  return { field, message, error, data: mappedData };
};
