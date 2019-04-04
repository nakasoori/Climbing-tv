import React, { Component } from 'react';
import 'tachyons'
import logo from './logo.svg';
import './App.css';
import Menu from './Menu'
import Feature from './Feature'
import Wheel from './Wheel'


class App extends Component {
  render() {
    return (
      <div>
        <Menu/>
        <div className='App w-100'>
          <div className='w-75 h-100 center pa2'>
            <div className='pa2'>
              <h3 className='2 dark-gray'>Featured</h3>
              <Feature/>
            </div>
            <div className='pa2 pt3 dib'>
              <div className='w-100'>
                <h3 className='dark-gray w-50 pr0 dib'>Trending</h3>
                <h5 className='dark-gray w-50 dib fr tr'>View more...</h5>
              </div>
              <Wheel type='trending'/>
            </div>
            <div className='pa2 pt3 dib'>
              <div className='w-100'>
                <h3 className='dark-gray w-50 pr0 dib'>Recent</h3>
                <h5 className='dark-gray w-50 dib fr tr'>View more...</h5>
              </div>
              <Wheel type='recent'/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
