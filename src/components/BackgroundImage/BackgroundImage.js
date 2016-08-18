import React, {Component, PropTypes} from 'react';
import ImagePreloader from '../../utils/ImagePreloader';
import classNames from 'classnames';
import styles from './BackgroundImage-style.css';

export default class BackgroundImage extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.string,
    src: PropTypes.string.isRequired,
    positionX: PropTypes.string,
    positionY: PropTypes.string,
    contain: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    fit: PropTypes.oneOf(['cover', 'width', 'height', 'both'])
  }

  static defaultProps = {
    fit: 'cover'
  };

  state = {
    preloading: false,
    src: null
  };

  componentWillMount() {
    const {src, width, height} = this.props;
    const imageSrc = this.getImageSrc(src, width, height);

    if (imageSrc) {
      this.preloadImage(imageSrc);
    }
  }

  getImageSrc(src, width, height) {
    if (src && width && height) {
      switch (this.props.fit) {
        case 'both':
          return `${src}?width=${width}&height=${height}`;
        case 'height':
          return `${src}?height=${height}`;
        case 'width':
          return `${src}?width=${width}`;
        default:
        case 'cover':
          return `${src}?${width > height ? 'width' : 'height'}=${Math.max(width, height)}`;
      }
    }
    return null;
  }

  preloadImage(src) {
    if (src && !this.state.preloading) {
      if (!this.state.src) {
        // Set the background image directly if not set before
        this.setState({ src });
      } else if (this.state.src !== src) {
        this.setState({preloading: true});

        new ImagePreloader(src)
          .then((result) => {
            if (this.state) {
              this.setState({
                preloading: false,
                src: result[0].src,
              });
            }
          });
      }
    }
  }

  render() {
    const {className, contain, positionX, positionY, style, children} = this.props;
    let imageStyle;

    if (this.state.src) {
      // If dimensions have been set, set width and height as querystring
      imageStyle = {
        backgroundImage: `url(${this.state.src})`,
        ...style
      };
      if (contain) imageStyle.backgroundSize = 'contain';
      if (positionX || positionY) {
        imageStyle.backgroundPosition = `${positionX} ${positionY}`;
      }
    }

    return (
      <div
        className={classNames(styles.background, className)}
        style={imageStyle}
      >
        {children}
      </div>
    );
  }
}