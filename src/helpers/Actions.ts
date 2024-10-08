import dig from "./dig";
import api from "../api/admin";
import queryString from "./queryString";
import { AppDispatch, RootState } from "../store";

interface IFetchProps {
  page?: number;
  perPage?: number;
  order?: string;
  orderBy?: string;
  filters?: Record<string, any>;
}

interface ITypes {
  START: string;
  DONE: string;
  ERROR: string;
}

class Actions {
  dispatch: AppDispatch;
  getState: RootState;
  endpoint: string;
  statePoint: string;

  constructor(
    dispatch: AppDispatch,
    getState: RootState,
    endpoint: string,
    statePoint: string
  ) {
    this.dispatch = dispatch;
    this.getState = getState;
    this.endpoint = endpoint;
    this.statePoint = statePoint;
  }

  async fetch(
    types: ITypes,
    { page, perPage, order, orderBy, filters }: IFetchProps = {},
    payload = {}
  ) {
    const state = this.getState;
    const { oauth } = state.auth;
    const statePoint = Array.isArray(this.statePoint)
      ? this.statePoint
      : [this.statePoint];

    page = page || dig(state, [...statePoint, "params", "page"]);
    perPage = perPage || dig(state, [...statePoint, "params", "perPage"]);
    order = order || dig(state, [...statePoint, "params", "order"]);
    orderBy = orderBy || dig(state, [...statePoint, "params", "orderBy"]);
    filters = filters || dig(state, [...statePoint, "params", "filters"]);

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

    try {
      this.dispatch({ type: types.START });

      const { data } = await api.oauth(oauth).get(`${this.endpoint}?${query}`);

      this.dispatch({
        type: types.DONE,
        payload: {
          data: Array.isArray(data) ? data : data.data,
          meta: data.meta,
          possibleFilters: data.possible_filters,
          order,
          orderBy,
          filters,
          payload,
        },
      });
    } catch (error) {
      this.dispatch({ type: types.ERROR });
      throw error;
    }
  }

  async delete(types: ITypes, id: number, payload: object = {}) {
    const state = this.getState;
    const { oauth } = state.auth;

    try {
      this.dispatch({ type: types.START });

      await api.oauth(oauth).del(`${this.endpoint}/${id}`);

      if (types.DONE) {
        this.dispatch({ type: types.DONE, payload: { id, payload } });
      }
    } catch (error) {
      this.dispatch({ type: types.ERROR });
      throw error;
    }
  }

  async find(types: ITypes, id: number, payload: object = {}) {
    const state = this.getState;
    const { oauth } = state.auth;

    try {
      this.dispatch({ type: types.START });

      const { data } = await api.oauth(oauth).get(`${this.endpoint}/${id}`);

      this.dispatch({
        type: types.DONE,
        payload: {
          id,
          data,
          payload,
        },
      });
    } catch (error) {
      this.dispatch({ type: types.ERROR });
      throw error;
    }
  }

  async save(
    types: ITypes,
    data: object,
    id: number | null = null,
    onSave: ((params?: any) => any) | null = null,
    payload: object = {}
  ) {
    const state = this.getState;
    const { oauth } = state.auth;

    try {
      let response;

      this.dispatch({ type: types.START });

      if (id) {
        response = await api.oauth(oauth).put(`${this.endpoint}/${id}`, data);
      } else {
        response = await api.oauth(oauth).post(`${this.endpoint}`, data);
      }

      this.dispatch({
        type: types.DONE,
        payload: { id, data: response.data, payload },
      });

      if (onSave) {
        try {
          this.dispatch(onSave(response?.data?.id));
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          onSave(response?.data?.id);
        }
      }
    } catch (error) {
      this.dispatch({ type: types.ERROR });
      throw error;
    }
  }

  async autocomplete(
    types: ITypes,
    search: string,
    id: number,
    shouldIncludeAutocomplete = true,
    params = {}
  ) {
    const state = this.getState;
    const { oauth } = state.auth;

    const query = queryString.stringify({ s: search, id, ...params });

    try {
      this.dispatch({ type: types.START });

      const { data } = await api
        .oauth(oauth)
        .get(
          `${this.endpoint}${
            shouldIncludeAutocomplete ? "/autocomplete" : ""
          }?${query}`
        );

      this.dispatch({
        type: types.DONE,
        payload: {
          data: data.data,
        },
      });
    } catch (error) {
      this.dispatch({ type: types.ERROR });
      throw error;
    }
  }
}

export default Actions;
