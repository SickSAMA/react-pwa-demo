import axios from 'axios';

export default () => {
  return axios.get('https://dog.ceo/api/breeds/image/random');
};
