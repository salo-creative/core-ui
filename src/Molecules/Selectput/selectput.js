import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@salo/icons';

import Actions from './selectput.actions';

const Selectput = ({
  className,
  options,
  onChange,
  onReset,
  onSubmit,
  placeholder,
  initialMode,
  initialSelected,
  initialValue,
  renderItem,
  icons
}) => {
  const [mode, setMode] = React.useState(initialMode);
  const [selected, setSelected] = React.useState(initialSelected);
  const [value, setValue] = React.useState(initialValue);
  const inputEl = React.useRef(null);

  const handleSelect = (e) => {
    if (typeof onChange === 'function') {
      onChange(e);
    }
    setSelected(e.target.value);
    setMode('edit');
  };
  
  const handleSubmit = (event) => {
    onSubmit({
      type: selected,
      value,
      event
    });
   
    setMode('default');
  };

  const handleChange = (e) => {
    if (typeof onChange === 'function') {
      onChange(e);
    }
    setValue(e.target.value);
  };

  const handleClose = (e) => {
    if (typeof onReset === 'function') {
      onReset(e);
    }
    setMode('default');
  };

  React.useEffect(() => {
    // Autofocus element when editing.
    if (mode === 'edit') {
      inputEl.current.focus();
    }
  }, [mode]);

  switch (mode) {
    case 'edit':
      return (
        <div className={ `${ className } salo-selectput salo-selectput--${ mode }` }>
          <input
            className='salo-selectput__input'
            onChange={ handleChange }
            onKeyPress={ (event) => {
              if (event.key === 'Enter') {
                handleSubmit(event);
              }
            } }
            ref={ inputEl }
          />
          { icons && (
            <span className='salo-selectput__icon-wrapper'>
              <Icon icon={ icons[selected] || selected } fill='#fff' size={ 16 } />
            </span>
          ) }
          <Actions
            handleSubmit={ handleSubmit }
            handleClose={ handleClose }
          />
        </div>
      );
    case 'select':
      return (
        <div className={ `${ className } salo-selectput salo-selectput--${ mode }` }>
          <div className='salo-selectput__button'>
            { placeholder }
            <div className='salo-selectput__wrapper'>
              <ul
                className='salo-selectput__list'
              >
                { options.map((item, index) => {
                  if (typeof renderItem === 'function') {
                    return renderItem({
                      item, index, handleSelect
                    });
                  }
                  return (
                    <li key={ item.value }>
                      <button
                        className='salo-selectput__item'
                        type='button'
                        onClick={ handleSelect }
                        value={ item.value }
                      >
                        { item.label }
                      </button>
                    </li>
                  );
                }) }
              </ul>
            </div>
          </div>
          <Actions
            disabled={ {
              submit: true, close: false
            } }
            handleSubmit={ handleSubmit }
            handleClose={ handleClose }
          />
        </div>
      );
    default:
      return (
        <div className={ `${ className } salo-selectput salo-selectput--${ mode }` }>
          <button
            type='button'
            className='salo-selectput__button'
            onFocus={ () => setMode('select') }
            onClick={ () => setMode('select') }
          >
            { placeholder }
          </button>
          <Actions
            disabled={ {
              submit: true, close: false
            } }
            handleSubmit={ handleSubmit }
            handleClose={ handleClose }
          />
        </div>
      );
  }
};

Selectput.defaultProps = {
  className: null,
  icons: null,
  initialMode: 'default',
  initialValue: '',
  initialSelected: null,
  onChange: null,
  onReset: null,
  placeholder: 'Please select…',
  renderItem: null
};

Selectput.propTypes = {
  className: PropTypes.string,
  icons: PropTypes.object,
  initialMode: PropTypes.string,
  initialSelected: PropTypes.string,
  initialValue: PropTypes.string,
  onChange: PropTypes.func,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired
  })).isRequired,
  placeholder: PropTypes.string,
  renderItem: PropTypes.func
};

export default Selectput;