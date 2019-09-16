import React from 'react';
import { PropTypes } from 'prop-types';
import Transition from 'react-transition-group/Transition';

// COMPONENTS
import DropDown from './drop.dropDown';

class Drop extends React.Component {
  render() {
    const { open } = this.props;
    return (
      <Transition
        in={ open }
        timeout={ 200 }
        unmountOnExit
      >
        { state => <DropDown { ...this.props } transition={ state } /> }
      </Transition>
    );
  }
}

Drop.propTypes = { open: PropTypes.bool.isRequired };

export default Drop;