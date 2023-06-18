export enum DataFetchActions {
  GET_DATA_FETCH = "GET_DATA_FETCH",
  GET_DATA_SUCCESS = "GET_DATA_SUCCESS",
}

export const getData = () => ({
  type: DataFetchActions.GET_DATA_FETCH,
});
