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

  const Actions = ({ disabled }) => (
    <React.Fragment>
      <button
        type='button'
        onClick={ handleSubmit }
        disabled={ disabled[0] }
        className='salo-selectput__button--submit'
      >
        <Icon icon='tick' size={ 16 } />
      </button>
      <button
        type='button'
        onClick={ handleClose }
        disabled={ disabled[1] }
        className='salo-selectput__button--close'
      >
        <Icon icon='close' size={ 16 } />
      </button>
    </React.Fragment>
  );

  Actions.defaultProps = { disabled: [false, false] };

  Actions.propTypes = { disabled: PropTypes.arrayOf(PropTypes.bool) };

  switch (mode) {
    case 'transparent':
      return null;
    case 'edit':
      return (
        <div className={ `${ className } salo-selectput salo-selectput--${ mode }` }>
          <input type='text' className='salo-selectput__input' />
          <span className='salo-selectput__icon-wrapper'>
            <Icon icon={ selected } fill='#fff' size={ 16 } />
          </span>
          <Actions />
        </div>
      );
    case 'select':
      return (
        <div className={ `${ className } salo-selectput salo-selectput--${ mode }` }>
          <div
            type='button'
            className='salo-selectput__button'
          >
            { placeholder }
            <div className='salo-selectput__wrapper'>
              <ul
                className='salo-selectput__list'
              >
                { options.map((item, index) => {
                  if (typeof renderItem === 'function') {
                    return renderItem({ item, index, handleSelect });
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
          <Actions disabled={ [true, false] } />
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
          <Actions disabled={ [true, false] } />
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