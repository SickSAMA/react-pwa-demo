import axios from 'axios';

export const fetchMovie = () => {
  return axios.get('http://www.omdbapi.com/?i=tt4123430&apikey=6d2b458b');
};
