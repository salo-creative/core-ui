import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@salo/icons';
import Ink from 'react-ink';

// COMPONENTS & STYLES
import { Container, Actions, Wrapper, Toggle } from './flyOut.styles';

// HELPERS & CONSTANTS
import { colours } from '../../helpers/colours';

class FlyOut extends Component {
  constructor(props) {
    super(props);
    this.state = { inlineMenu: false };
    this.inlineMenuContainer = null;
  }

  componentDidMount() {
    const { onGetRef } = this.props;

    if (typeof onGetRef === 'function') onGetRef(this.inlineMenuContainer);
  }

  toggleInlineMenu = () => {
    this.setState(prevState => ({ inlineMenu: !prevState.inlineMenu }));
  }

  handleClick(e) {
    const target = e.target.className;
    if (typeof target === 'string') {
      if (target.includes('ui-inline-menu__row')) {
        this.setState({ inlineMenu: false });
      }
    }
  }

  renderChildren() {
    const { children } = this.props;

    const childrenWithProps = React.Children.map(children, (child) => {
      if (child !== null) {
        return (
          React.cloneElement(child, { toggle: this.toggleInlineMenu })
        );
      }
      return null;
    }).filter(i => i);

    return childrenWithProps;
  }

  render() {
    const { mobile, context, inverse } = this.props;
    const { inlineMenu } = this.state;

    let setContext = context;
    if (context === 'table' && mobile) {
      setContext = 'table--card';
    }

    return (
      <Container
        className={ `salo-flyout ${ setContext } ${ inlineMenu ? 'is-active' : '' } ${ inverse ? 'inverse' : '' }` }
      >
        <Wrapper>
          <Actions
            ref={ (inlineMenuContainer) => { this.inlineMenuContainer = inlineMenuContainer; } }
          >
            { this.renderChildren() }
          </Actions>
          <Toggle onClick={ () => { this.toggleInlineMenu(); } }>
            <Ink />
            <Icon fill={ inverse ? colours.charcoal : '#fff' } icon='dots_vertical' size={ 24 } />
          </Toggle>
        </Wrapper>
      </Container>
    );
  }
}

FlyOut.defaultProps = {
  children: '',
  context: 'float',
  inverse: true,
  mobile: false,
  onGetRef: null
};

FlyOut.propTypes = {
  children: PropTypes.any,
  context: PropTypes.oneOf(['float', 'table', 'card']),
  inverse: PropTypes.bool,
  mobile: PropTypes.bool,
  onGetRef: PropTypes.func
};

export default FlyOut;