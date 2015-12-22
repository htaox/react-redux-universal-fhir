const UPDATE = 'redux-example/jsonInspector/UPDATE';

const initialState = {
  data: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE:
      return {
        data: action.data
      };
    default:
      return state;
  }
}

export function load(data) {
  return {
    type: UPDATE,
    data
  };
}
