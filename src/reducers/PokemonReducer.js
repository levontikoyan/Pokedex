import {
    FETCH_POKEMONS,
    FETCH_POKEMONS_TYPES,
    HANDLE_LOADING
} from '../actions/types';

let defaultState = {
  pokemons: [],
  types: [],
  loading: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_POKEMONS:
      return { ...state, pokemons: action.payload };
    case FETCH_POKEMONS_TYPES:
      return { ...state, types: action.payload };
    case HANDLE_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
