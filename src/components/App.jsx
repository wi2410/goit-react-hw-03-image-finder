import React, { Component } from 'react';
import { getImages } from 'services/ApiService';
import { SearchBar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

import { ToastContainer, toast } from 'react-toastify';



export class App extends Component{
  state = {
    images: [],
    query: null,
    page: 1,
    totalPages: null,
    loading: false,
  }

  async componentDidUpdate(_, prevState) {
    const { query, page, totalPages, images } = this.state;

    if (prevState.page !== page && page !== 1) {
      this.setState({ loading: true });
      const res = await getImages(query, page);

      this.setState(({ images }) => ({
        images: [...images, ...res.hits],
        loading: false,
      }));
    }

    if (page >= totalPages && images !== prevState.images) {
      toast.warn(
        "We're sorry, but you've reached the end of search results."
      );
    }
  }

  onSubmit = async evt => {
    evt.preventDefault();
    const input = evt.target.elements.search;
    const value = input.value.trim();
    const page = 1;

    if (value === '') {
      Notify.warning("You didn't enter anything!");
      return;
    }

    this.setState({ loading: true });
    const res = await getImages(value, page);
    this.setState({ loading: false });

    if (res.hits.length === 0) {
      toast.error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    const totalPages = Math.floor(res.totalHits / 12);

    this.setState({
      images: res.hits,
      query: value,
      page,
      totalPages: totalPages,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };


  render() {
    const { images, loading, totalPages, page } = this.state;
    const isNotEmpty = images.length !== 0;
    const isNotEndList = page < totalPages;

    return (
      <>
      <SearchBar onSubmit={this.onSubmit} />
        {isNotEmpty && <ImageGallery images={images} />}
        {loading ? (
          <Loader />
        ) : (
          isNotEmpty && isNotEndList && <Button onClick={this.loadMore} />
        )}

      <ToastContainer autoClose={3000} /></>
      
    );
  }
}