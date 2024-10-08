interface IAuth {
  token?: string;
  type?: string;
}

export default function handleConfig(
  config: object,
  oauth: IAuth | undefined = undefined
) {
  let defaultConfig: {
    headers?: {
      "Content-Type"?: string;
      Accept?: string;
      Authorization?: string;
    };
  } = {};
  if (config) defaultConfig = { ...defaultConfig, ...config };
  if (!defaultConfig.headers) defaultConfig.headers = {};

  const headers: {
    "Content-Type": string;
    Accept: string;
    Authorization?: string;
  } = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (oauth) {
    headers.Authorization = `${oauth.type} ${oauth.token}`;
  }

  return {
    ...defaultConfig,
    headers: {
      ...headers,
      ...defaultConfig.headers,
    },
  };
}
