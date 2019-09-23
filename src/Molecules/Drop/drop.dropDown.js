import React from 'react';
import ReactDOM from 'react-dom';
import { PropTypes } from 'prop-types';
import { get } from 'lodash';
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
    const y = get(window, 'scrollY', get(window, 'pageYOffset', 0)); // Fallback for IE
    return `${ (fixed ? top : (top + y)) + clientHeight + offsetTop }px`;
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
      arrow,
      background,
      border,
      borderRadius,
      borderTop,
      children,
      disableOverflow,
      element,
      fixed,
      padding,
      shadow,
      showScrollbar,
      spacing,
      transition,
      transparent,
      unit,
      width,
      zIndex,
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
            arrow={ arrow }
            background={ background }
            border={ border }
            borderRadius={ borderRadius }
            borderTop={ borderTop }
            element={ element }
            ref={ (e) => {
              this.drop = e;
            } }
            padding={ padding }
            shadow={ shadow !== 'none' ? boxShadow(shadow) : 'none' }
            zIndex={ zIndex + 1 }
            { ...calculatedStyle }
          >
            <DropContent
              disableOverflow={ disableOverflow }
              maxHeight={ calculatedStyle.maxHeight }
              showScrollbar={ showScrollbar }
            >
              { children }
            </DropContent>
          </DropElement>
          <DropBackdrop
            onClick={ e => this.handleClose(e) }
            transparent={ transparent ? 1 : 0 }
            zIndex={ zIndex }
          />
        </Wrapper>
      ],
      this.dropRoot
    );
  }
}

Drop.defaultProps = {
  arrow: null,
  background: '#fff',
  border: 'none',
  borderRadius: null,
  borderTop: false,
  disableOverflow: false,
  fixed: false,
  offsetLeft: 0,
  offsetTop: 0,
  onClose: null,
  padding: '0',
  shadow: 'default',
  showScrollbar: true,
  spacing: 20,
  top: 0,
  transparent: true,
  unit: 'px',
  width: '200',
  zIndex: 5,
};

Drop.propTypes = {
  arrow: PropTypes.shape({ offsetLeft: PropTypes.string }),
  background: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  borderTop: PropTypes.bool,
  children: PropTypes.any.isRequired,
  disableOverflow: PropTypes.bool,
  element: PropTypes.object.isRequired,
  fixed: PropTypes.bool,
  offsetLeft: PropTypes.number,
  offsetTop: PropTypes.number,
  onClose: PropTypes.func,
  padding: PropTypes.string,
  shadow: PropTypes.oneOf(['small', 'default', 'large', 'none']),
  showScrollbar: PropTypes.bool,
  spacing: PropTypes.number,
  top: PropTypes.number,
  transition: PropTypes.string.isRequired,
  transparent: PropTypes.bool,
  unit: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  zIndex: PropTypes.number,
};

export default onClickOutside(Drop);