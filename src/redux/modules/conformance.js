const LOAD = 'react-redux-universal-fhir/LOAD';
const LOAD_SUCCESS = 'react-redux-universal-fhir/LOAD_SUCCESS';
const LOAD_FAIL = 'react-redux-universal-fhir/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function conformance(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.conformance && globalState.conformance.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/meta')
  };
}
