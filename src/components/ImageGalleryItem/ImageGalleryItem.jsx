import { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  render() {
    const { isOpen } = this.state;
    const { largeImageURL, webformatURL, tags } = this.props;

    return (
      <>
        <GalleryItem onClick={this.toggle}>
          <GalleryItemImg src={webformatURL} alt={tags} />
        </GalleryItem>
        {isOpen && (
          <Modal toggle={this.toggle} image={largeImageURL} tags={tags} />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};