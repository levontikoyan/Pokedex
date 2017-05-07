import axios from 'axios';
import {
    FETCH_POKEMONS,
    FETCH_POKEMONS_TYPES,
    HANDLE_LOADING
} from './types';

const API_URL = 'https://pokeapi.co/api/v2';

export function fetchPokemons () {
  return function (dispatch) {
    dispatch(handleLoading(true));
    axios.get(`${API_URL}/pokemon`, { params: { limit: 5 } })
    .then(response => {
      var results = response.data.results;
      return Promise.all(results.map(function (pokemon) {
        return axios.get(`${pokemon.url}`)
            .then(response => {
              const { data } = response;
              const { name, height, weight, sprites } = data;
              let pokemon = {
                avatar: sprites.front_default || sprites.front_shiny,
                name,
                height,
                weight
              };
              return pokemon;
            });
      })).then((response) => {
        dispatch({
          type: FETCH_POKEMONS,
          payload: response
        });
        dispatch(handleLoading(false));
      });
    });
  };
}

export function fetchTypes () {
  return function (dispatch) {
    axios.get(`${API_URL}/type`)
      .then(response => {
        var results = response.data.results;
        dispatch({
          type: FETCH_POKEMONS_TYPES,
          payload: results
        });
      });
  };
}

export function fetchPokemonsByType (url) {
  return function (dispatch) {
    dispatch(handleLoading(true));
    axios.get(url)
    .then(response => {
      var results = response.data.pokemon;
      results = results.slice(Math.max(results.length - 5, 1));
      return Promise.all(results.map(function (pokemon) {
        return axios.get(`${pokemon.pokemon.url}`)
            .then(response => {
              const { data } = response;
              const { name, height, weight, sprites } = data;
              let pokemon = {
                avatar: sprites.front_default || sprites.front_shiny || sprites.front_default,
                name,
                height,
                weight
              };
              return pokemon;
            });
      })).then((response) => {
        dispatch({
          type: FETCH_POKEMONS,
          payload: response
        });
        dispatch(handleLoading(false));
      });
    });
  };
}

export function handleLoading (status) {
  return {
    type: HANDLE_LOADING,
    payload: status
  }
}
