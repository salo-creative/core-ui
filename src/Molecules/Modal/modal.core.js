import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import Header from './modal.header';
import {
  Container, Backdrop, Wrapper, Footer, Body, ModalWrapper
} from './modal.styles';

class Core extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false
    };
    // Create a div that we'll render the modal into. Because each
    // Modal component has its own element, we can render multiple
    // modal components into the modal container.
    this.modalWrapper = null;
    this.modalRoot = props.root || document.createElement('div');
  }

  componentDidMount() {
    this.modalRoot.className = 'modal-container';
    document.body.appendChild(this.modalRoot);
    this.setState(() => {
      return {
        mounted: true
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { mounted } = this.state;
    // Automatically focus the first interactive area on mount.
    if (prevState.mounted === false && mounted === true) {
      const input = this.modalRoot.querySelector('input, textarea');
      if (input) {
        input.focus();
      }
    }
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    this.modalRoot.parentNode.removeChild(this.modalRoot);
  }

  // Functions
  handleKeyDown = (e) => {
    const { closeOnEsc, onClose } = this.props;

    const focusableEls = Array.prototype.slice.call(this.modalWrapper.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'));
    const KEY_TAB = 9;
    const KEY_ESCAPE = 27;

    switch (e.keyCode) {
      case KEY_TAB:
        if (e.shiftKey) {
          this.handleBackwardTab(e, focusableEls);
        } else {
          this.handleForwardTab(e, focusableEls);
        }

        break;
      case KEY_ESCAPE:
        if (closeOnEsc !== false) {
          onClose();
        }

        break;
      default:
        break;
    }
  }

  handleClose = (e) => {
    const { onClose } = this.props;
    e.preventDefault();

    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  }

  handleBackwardTab(e, focusableEls) {
    const firstElement = focusableEls[0];
    const lastElement = focusableEls[focusableEls.length - 1];

    if (document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } if (document.activeElement === this.Container) {
      e.preventDefault();
      lastElement.focus();
    }
  }

  handleForwardTab(e, focusableEls) {
    const firstElement = focusableEls[0];
    const lastElement = focusableEls[focusableEls.length - 1];

    if (document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    } else if (document.activeElement === this.Container) {
      e.preventDefault();
      firstElement.focus();
    }
  }

  // Modal constructor
  constructModal() {
    // Build up the header, body, footer of the modal.
    const {
      background,
      closeOnBackdrop,
      transparent,
      transition,
      transitionState,
      outerPadding
    } = this.props;

    return (
      <Container
        className='salo-modal'
        role='dialog'
        tabIndex={ -1 }
        ref={ (e) => { this.Container = e; } }
        onKeyDown={ (e) => { this.handleKeyDown(e); } }
        outerPadding={ outerPadding }
        state={ transitionState }
        transition={ transition }
      >
        { this.renderContent() }
        <Backdrop
          background={ background }
          className='salo-modal__backdrop'
          transparent={ transparent }
          state={ transitionState }
          onClick={ e => closeOnBackdrop !== false && this.handleClose(e) }
        />
      </Container>
    );
  }

  renderChildren = () => {
    const { children } = this.props;
    const { mounted } = this.state;

    if (mounted) {
      const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return (
            React.cloneElement(child, {
              modal: this.modalWrapper
            })
          );
        }
        return child;
      });
      return childrenWithProps;
    }
    return null;
  }

  renderContent() {
    const {
      bodyBackground,
      forceHeight,
      height,
      hideClose,
      hideHeader,
      mobileFullscreen,
      padding,
      stickyHeader,
      title,
      width
    } = this.props;
    const { mounted } = this.state;

    return (
      <Wrapper
        className='salo-modal__wrapper modal-wrapper'
        ref={ (e) => { this.modalWrapper = e; } }
        forceHeight={ forceHeight }
        setHeight={ height }
        setWidth={ width }
        mobileFullscreen={ mobileFullscreen }
        padding={ padding }
        bodyBackground={ bodyBackground }
      >
        <Header
          className='salo-modal__header'
          handleClose={ this.handleClose }
          hideClose={ hideClose }
          hideHeader={ hideHeader }
          stickyHeader={ stickyHeader }
          title={ title }
        />
        <Body
          className='salo-modal__body'
          padding={ padding }
        >
          { mounted && this.renderChildren() }
        </Body>
        { this.renderFooter() }
      </Wrapper>
    );
  }

  renderFooter() {
    const { footer, stickyFooter } = this.props;

    if (footer) {
      return (
        <Footer
          className='salo-modal__footer'
          sticky={ stickyFooter }
        >
          { footer }
        </Footer>
      );
    }
    return null;
  }

  render() {
    // Use a portal to render the children into the element
    return ReactDOM.createPortal(
      this.constructModal(),
      this.modalRoot
    );
  }
}

Core.defaultProps = {
  background: null,
  bodyBackground: '#fff',
  children: '',
  closeOnBackdrop: true,
  closeOnEsc: true,
  footer: '',
  forceHeight: false,
  height: '100%',
  hideClose: false,
  hideHeader: false,
  mobileFullscreen: '58rem',
  outerPadding: true,
  padding: true,
  stickyFooter: false,
  stickyHeader: true,
  root: null,
  title: 'Modal title',
  transition: 'fade',
  transparent: 0.9,
  width: '58rem'
};

Core.propTypes = {
  background: PropTypes.string,
  bodyBackground: PropTypes.string,
  children: PropTypes.any,
  closeOnBackdrop: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
  footer: PropTypes.any,
  forceHeight: PropTypes.bool,
  height: PropTypes.string,
  hideClose: PropTypes.bool,
  hideHeader: PropTypes.bool,
  mobileFullscreen: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  outerPadding: PropTypes.bool,
  padding: PropTypes.bool,
  root: PropTypes.element,
  stickyHeader: PropTypes.bool,
  stickyFooter: PropTypes.bool,
  title: PropTypes.string,
  transparent: PropTypes.number,
  transition: PropTypes.oneOf(['fade', 'slide', 'expand']),
  width: PropTypes.string,
  transitionState: PropTypes.string.isRequired
};

export default Core;