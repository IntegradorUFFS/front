import api from "../api/admin";
import queryString from "./queryString";

interface IFetchProps {
  page?: number;
  perPage?: number;
  order?: string;
  orderBy?: string;
  filters?: Record<string, any>;
}

class Actions {
  endpoint: string;
  oauth: {
    token?: string;
    type?: string;
  };

  constructor(
    endpoint: string,
    oauth: {
      token?: string;
      type?: string;
    }
  ) {
    this.endpoint = endpoint;
    this.oauth = oauth;
  }

  async fetch(
    { page, perPage, order, orderBy, filters }: IFetchProps = {},
    payload = {}
  ) {
    const params: Record<string, string | string[]> = {};

    if (filters)
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          if (Array.isArray(filters[key]))
            params[`filters[${key}][]`] = filters[key].map((value) =>
              String(value)
            );
          else params[`filters[${key}]`] = encodeURIComponent(filters[key]);
        }
      });

    const query = queryString.stringify({
      ...params,
      page,
      items: perPage,
      sort_column: orderBy,
      sort_direction: order,
    });

    const { data } = await api
      .oauth(this.oauth)
      .get(`${this.endpoint}?${query}`);

    return {
      data: Array.isArray(data) ? data : data.data,
      meta: data.meta,
      possibleFilters: data.possible_filters,
      order,
      orderBy,
      filters,
      payload,
    };
  }

  async delete(id: number) {
    await api.oauth(this.oauth).del(`${this.endpoint}/${id}`);
  }

  async find(id: number, payload: object = {}) {
    const { data } = await api.oauth(this.oauth).get(`${this.endpoint}/${id}`);

    return {
      id,
      data,
      payload,
    };
  }

  async save(data: object, id: number | null = null, payload: object = {}) {
    let response;

    if (id) {
      response = await api
        .oauth(this.oauth)
        .put(`${this.endpoint}/${id}`, data);
    } else {
      response = await api.oauth(this.oauth).post(`${this.endpoint}`, data);
    }

    return { id, data: response.data, payload };
  }

  async autocomplete(
    search: string,
    id: number,
    shouldIncludeAutocomplete = true,
    params = {}
  ) {
    const query = queryString.stringify({ s: search, id, ...params });

    const { data } = await api
      .oauth(this.oauth)
      .get(
        `${this.endpoint}${
          shouldIncludeAutocomplete ? "/autocomplete" : ""
        }?${query}`
      );

    return {
      data: data.data,
    };
  }
}

export default Actions;
