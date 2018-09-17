import React from 'react';
import PropTyeps from 'prop-types';
import fetchDog from './fetchDog';
import './style.css';

export default class App extends React.Component {

  static propTypes = {
    preloaded: PropTyeps.object
  };

  componentDidMount() {
    if (!this.props.preloaded) {
      this.loadDog();
    }
  }

  state = {
    dog: this.props.preloaded
  };

  loadDog() {
    fetchDog()
      .then(response => {
        this.setState({
          dog: response.data
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { dog } = this.state;

    return (
      <div className="app">
        <div className="header">React PWA Demo</div>
        <div className="main">
          {
            dog ?
              (
                <div className="dog">
                  <h1>A Random Cute Dog!</h1>
                  <img src={dog.message} alt="random dog" />
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
