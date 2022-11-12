import React, { Component } from 'react';
import axios from 'axios';
import { SearchBar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { Modal } from './Modal/Modal';

const API_KEY = '29656513-372141d59901600f23fa64349';

export class App extends Component{
  state = {

  }

  render() {
    return (
      <ImageGallery/>
    );
  }
}