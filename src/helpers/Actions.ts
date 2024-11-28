import api from "../api/admin";
import queryString from "./queryString";

interface IFetchProps {
  page?: number;
  per_page?: number;
  sort_direction?: string;
  sort_column?: string;
  filters?: Record<string, any>;
  extra_params?: Record<string, any>;
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
    {
      page,
      per_page,
      sort_direction,
      sort_column,
      filters,
      extra_params,
    }: IFetchProps = {},
    payload = {}
  ) {
    const params: Record<string, string | string[]> = {};

    if (filters)
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          if (typeof filters[key] === "string")
            params[`filter[${key}]`] = encodeURIComponent(filters[key]);
          else
            params[`filter[${key}]`] = encodeURIComponent(filters[key].value);
        }
      });

    if (extra_params)
      Object.keys(extra_params).forEach((key) => {
        if (extra_params[key])
          params[key] = encodeURIComponent(extra_params[key]);
      });

    const query = queryString.stringify({
      ...params,
      page,
      per_page: per_page,
      sort_column,
      sort_direction,
    });

    const { data } = await api
      .oauth(this.oauth)
      .get(`${this.endpoint}?${query}`);

    return {
      data: Array.isArray(data) ? data : data.data,
      meta: data.meta,
      possibleFilters: data.possible_filters,
      sort_direction,
      sort_column,
      filters,
      payload,
    };
  }

  async delete(id: string) {
    await api.oauth(this.oauth).del(`${this.endpoint}/${id}`);
  }

  async find(id: string, payload: object = {}) {
    const { data } = await api.oauth(this.oauth).get(`${this.endpoint}/${id}`);

    return {
      id,
      data,
      payload,
    };
  }

  async save(data: object, id: string | null = null) {
    let response;

    if (id) {
      response = await api
        .oauth(this.oauth)
        .put(`${this.endpoint}/${id}`, data);
    } else {
      response = await api.oauth(this.oauth).post(`${this.endpoint}`, data);
    }

    return { id, data: response.data };
  }

  async autocomplete(
    search?: string,
    id?: string,
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
