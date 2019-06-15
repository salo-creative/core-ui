import React from 'react';
import ReactDOM from 'react-dom';
import { PropTypes } from 'prop-types';
import onClickOutside from 'react-onclickoutside';

// COMPONENTS
import { DropBackdrop, DropElement, DropContent, Wrapper } from './drop.styles';

// HELPERS
import { boxShadow } from '../../helpers/colours';

class Drop extends React.Component {
  constructor(props) {
    super(props);
    this.dropRoot = document.createElement('div');
  }

  componentDidMount() {
    this.dropRoot.className = 'drop';
    document.body.appendChild(this.dropRoot);
    window.addEventListener('resize', this.handleClose);
    document.addEventListener('keyup', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyPress);
    document.removeEventListener('resize', this.handleClose);
    // Remove the element from the DOM when we unmount
    this.dropRoot.remove();
  }

  evaluateTop = ({ top, clientHeight }) => {
    const { fixed, top: forceTop, offsetTop } = this.props;
    if (fixed && forceTop) {
      return `${ forceTop }px`;
    }
    return `${ (fixed ? top : (top + window.scrollY)) + clientHeight + offsetTop }px`;
  };

  evaluateLeft = ({ left, clientWidth }) => {
    const { width, offsetLeft } = this.props;
    if (clientWidth < width) {
      return (left - ((width - clientWidth) / 2)) + offsetLeft;
    }
    return (left + ((clientWidth - width) / 2)) + offsetLeft;
  }

  handleClose = (e) => {
    const { onClose } = this.props;
    onClose(e);
  };

  handleKeyPress = (e) => {
    const { onClose } = this.props;
    if (e.keyCode === 27) {
      onClose(e);
    }
  };

  handleClickOutside(e) {
    const { onClose } = this.props;
    onClose(e);
  }

  render() {
    const {
      children,
      element,
      fixed,
      width,
      unit,
      transparent,
      spacing,
      disableOverflow,
      transition,
      zIndex,
      background,
      padding,
      border,
      borderTop,
      shadow
    } = this.props;

    // element that was clicked on
    const { clientWidth, clientHeight } = element;
    // Work out element positions
    const { top, left, bottom } = element.getBoundingClientRect();

    // window dimensions
    const { innerHeight, innerWidth } = window;

    const leftPos = this.evaluateLeft({ left, clientWidth });

    const calculatedStyle = {
      top: this.evaluateTop({ top, clientHeight }),
      left: `${ leftPos }px`,
      width: `${ width }${ unit }`,
      height: 'auto',
      maxWidth: `calc(100% - ${ spacing * 2 }px)`,
      maxHeight: `${ innerHeight - bottom - spacing }px`,
      fixed
    };

    // Check if it collides on the left
    const hitLeft = leftPos < spacing;

    const hitRight = ((left + (clientWidth / 2)) + (width / 2) + spacing >= innerWidth);

    if (width >= (innerWidth - (spacing * 2))) {
      calculatedStyle.width = `${ innerWidth - (spacing * 2) }px`;
      calculatedStyle.left = `${ spacing }px`;
    } else if (hitLeft) {
      calculatedStyle.left = `${ spacing }px`;
    } else if (hitRight) {
      calculatedStyle.left = `${ (innerWidth - width) - spacing }px`;
      calculatedStyle.transform = null;
    }

    // Use a portal to render the children into the element
    return ReactDOM.createPortal(
      [
        <Wrapper key='drop' transition={ transition }>
          <DropElement
            zIndex={ zIndex + 1 }
            background={ background }
            padding={ padding }
            element={ element }
            border={ border }
            borderTop={ borderTop }
            shadow={ shadow !== 'none' ? boxShadow(shadow) : 'none' }
            ref={ (e) => {
              this.drop = e;
            } }
            { ...calculatedStyle }
          >
            <DropContent
              disableOverflow={ disableOverflow }
              maxHeight={ calculatedStyle.maxHeight }
            >
              { children }
            </DropContent>
          </DropElement>
          <DropBackdrop
            zIndex={ zIndex }
            transparent={ transparent ? 1 : 0 }
            onClick={ e => this.handleClose(e) }
          />
        </Wrapper>
      ],
      this.dropRoot
    );
  }
}

Drop.defaultProps = {
  width: '200',
  shadow: 'default',
  unit: 'px',
  fixed: false,
  transparent: true,
  spacing: 20,
  offsetTop: 0,
  offsetLeft: 0,
  disableOverflow: false,
  top: 0,
  background: '#fff',
  zIndex: 5,
  border: 'none',
  borderTop: false,
  padding: '0'
};

Drop.propTypes = {
  children: PropTypes.any.isRequired,
  element: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  shadow: PropTypes.oneOf(['small', 'default', 'large', 'none']),
  top: PropTypes.number,
  unit: PropTypes.string,
  fixed: PropTypes.bool,
  transparent: PropTypes.bool,
  spacing: PropTypes.number,
  disableOverflow: PropTypes.bool,
  transition: PropTypes.string.isRequired,
  background: PropTypes.string,
  offsetTop: PropTypes.number,
  offsetLeft: PropTypes.number,
  zIndex: PropTypes.number,
  border: PropTypes.string,
  borderTop: PropTypes.bool,
  padding: PropTypes.string
};

export default onClickOutside(Drop);