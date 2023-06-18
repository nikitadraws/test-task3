import { call, put, takeEvery } from "redux-saga/effects";
import { DataFetchActions } from "./actions";
import { DataTimestampItem, ItemResponse } from "./reducer";

export function dataFetch(): Promise<ItemResponse[]> {
  return fetch("http://www.mocky.io/v2/5e60c5f53300005fcc97bbdd").then((res) =>
    res.json()
  );
}
export function* getDataFetch(): Generator<unknown, any, DataTimestampItem[]> {
  const data: ItemResponse[] = yield call(dataFetch);

  const dataTimestampSorted = data
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((el) => {
      return {
        ...el,
        timeEnd: el.timestamp + el.duration,
      };
    });
  const dataEndSorted = [...dataTimestampSorted].sort(
    (a, b) => a.timeEnd - b.timeEnd
  );

  yield put({
    type: DataFetchActions.GET_DATA_SUCCESS,
    data: [dataTimestampSorted, dataEndSorted],
  });
}

export function* mySaga() {
  yield takeEvery(DataFetchActions.GET_DATA_FETCH, getDataFetch);
}
