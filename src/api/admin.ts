import axios from "axios";
import handleConfig from "./utils/handleConfig";

const api = axios.create({
  baseURL: process.env.REACT_APP_ADMIN_URL,
});

interface IAuth {
  token?: string;
  type?: string;
}

class Api {
  pOauth: IAuth | undefined;
  constructor() {
    this.oauth = this.oauth.bind(this);
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.del = this.del.bind(this);
    this.head = this.head.bind(this);
    this.pOauth = undefined;
  }

  oauth(oauth: IAuth | undefined) {
    if (!oauth || !oauth.token || !oauth.type) {
      throw new Error("Invalid oauth");
    }
    this.pOauth = oauth;
    return this;
  }

  get(path: string, config?: any) {
    return api.get(path, handleConfig(config, this.pOauth));
  }

  post(path: string, data: object, config?: any) {
    return api.post(path, data, handleConfig(config, this.pOauth));
  }

  put(path: string, data: object, config?: any) {
    return api.put(path, data, handleConfig(config, this.pOauth));
  }

  del(path: string, config?: any) {
    return api.delete(path, handleConfig(config, this.pOauth));
  }

  head(path: string, config?: any) {
    return api.head(path, handleConfig(config, this.pOauth));
  }
}

export default new Api();
