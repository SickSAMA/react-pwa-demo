import React from 'react';
import PropTyeps from 'prop-types';
import { fetchMovie } from './fetch';
import './style.css';

export default class App extends React.Component {

  static propTypes = {
    preloadedMovie: PropTyeps.object
  };

  componentDidMount() {
    if (!this.props.preloadedMovie) {
      this.loadMovie();
    }
  }

  state = {
    movie: this.props.preloadedMovie
  };

  loadMovie() {
    fetchMovie()
      .then(response => {
        this.setState({
          movie: response.data
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { movie } = this.state;

    return (
      <div className="app">
        <div className="header">React PWA Demo</div>
        <div className="main">
          {
            movie ?
              (
                <div className="movie">
                  <h1>{ movie.Title }</h1>
                  <p className="movie__date">{ movie.Released }</p>
                  <img src={movie.Poster} alt={movie.Title} />
                </div>
              ) :
              (
                <div className="main__loading">Loading</div>
              )
          }
        </div>
      </div>
    );
  }
}
