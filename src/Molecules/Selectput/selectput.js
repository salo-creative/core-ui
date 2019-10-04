import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@salo/icons';

const Selectput = ({
  className,
  options,
  onChange,
  onReset,
  onSubmit,
  placeholder,
  initialMode,
  initialSelected,
  renderItem
}) => {
  const [mode, setMode] = React.useState(initialMode);
  const [selected, setSelected] = React.useState(initialSelected);

  const handleSelect = (e) => {
    onChange(e);
    setSelected(e.target.value);
    setMode('edit');
  };
  
  const handleSubmit = (e) => {
    onSubmit(e);
    if (initialSelected) {
      setMode('transparent');
    } else {
      setMode('default');
    }
  };

  const handleClose = (e) => {
    onReset(e);
    if (initialSelected) {
      setMode('transparent');
    } else {
      setMode('default');
    }
  };

  switch (mode) {
    case 'transparent':
      return null;
    case 'edit':
      return (
        <div className={ `${ className } salo-selectput salo-selectput--${ mode }` }>
          <Icon icon={ selected } />
          <input type='text' />
          <button
            type='button'
            onClick={ handleSubmit }
            className='salo-selectput__button--submit'
          >
            <Icon icon='tick' />
          </button>
          <button
            type='button'
            onClick={ handleClose }
            className='salo-selectput__button--close'
          >
            <Icon icon='close' />
          </button>
        </div>
      );
    case 'select':
      return (
        <div className={ `${ className } salo-selectput salo-selectput--${ mode }` }>

          <div className='salo-selectput__wrapper'>
            <select
              onChange={ handleSelect }
              className='salo-selectput__select'
            >
              { options.map((item, index, array) => {
                if (typeof renderItem === 'function') {
                  return renderItem(item, index, array);
                }
                return (
                  <option
                    key={ item.value }
                    value={ item.value }
                  >{ item.label }
                  </option>
                );
              }) }
            </select>
            <button
              type='button'
              disabled
              className='salo-selectput__button--submit'
            >
              <Icon icon='tick' />
            </button>
            <button
              type='button'
              onClick={ handleClose }
              className='salo-selectput__button--close'
            >
              <Icon icon='close' />
            </button>
          </div>
        </div>
      );
    default:
      return (
        <div className={ `${ className } salo-selectput salo-selectput--${ mode }` }>
          <button
            type='button'
            className='salo-selectput__button'
            onFocus={ () => setMode('select') }
          >
            { placeholder }
          </button>
          <button
            type='button'
            disabled
            className='salo-selectput__button--submit'
          >
            <Icon icon='tick' />
          </button>
          <button
            type='button'
            onClick={ handleClose }
            className='salo-selectput__button--close'
          >
            <Icon icon='close' />
          </button>
        </div>
      );
  }
};

Selectput.defaultProps = {
  className: null,
  initialMode: 'default',
  initialSelected: null,
  placeholder: 'Please select…',
  renderItem: null
};

Selectput.propTypes = {
  className: PropTypes.string,
  initialMode: PropTypes.string,
  initialSelected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired
  })).isRequired,
  placeholder: PropTypes.string,
  renderItem: PropTypes.func
};

export default Selectput;