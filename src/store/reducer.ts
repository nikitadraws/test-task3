import { DataFetchActions } from "./actions";

export interface TimestampItemZone {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface DataTimestampItem {
  id: number;
  timestamp: number;
  duration: number;
  zone: TimestampItemZone;
  timeEnd: number;
}

export interface ItemResponse {
  id: number;
  timestamp: number;
  duration: number;
  zone: TimestampItemZone;
}

interface InitialState {
  data: [DataTimestampItem[], DataTimestampItem[]];
}

const initialState: InitialState = {
  data: [[], []],
};

export const dataReducer = (
  state = initialState,
  action: {
    type: DataFetchActions;
    data: [DataTimestampItem[], DataTimestampItem[]];
  }
) => {
  switch (action.type) {
    case DataFetchActions.GET_DATA_SUCCESS:
      return { ...state, data: action.data };
    default:
      return state;
  }
};
