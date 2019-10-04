import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@salo/icons';

const Selectput = ({
  className,
  options,
  onChange,
  onSubmit,
  placeholder,
  initialMode,
  renderItem
}) => {
  const [mode, setMode] = React.useState(initialMode);

  const handleSelect = (e) => {
    onChange(e);
    setMode('edit');
  };
  
  const handleSubmit = (e) => {
    onSubmit(e);
    setMode('default');
  };

  const render = () => {
    switch (mode) {
      case 'edit':
        return (
          <div>
            <input type='text' />
            <button type='button' onClick={ handleSubmit }>
              <Icon icon='add' />
            </button>
          </div>
        );
      case 'select':
        return (
          <div className={ `${ className } salo-selectput salo-selectput--select` }>
            <select onChange={ handleSelect }>
              { options.map((item, index, array) => {
                if (typeof renderItem === 'function') {
                  return renderItem(item, index, array);
                }
                return <option key={ item.value } value={ item.value }>{ item.label }</option>;
              }) }
            </select>
          </div>
        );
      default:
        return (
          <button
            type='button'
            className={ `${ className } salo-selectput salo-selectput--default` }
            onFocus={ () => setMode('select') }
          >
            { placeholder }
          </button>
        );
    }
  };

  return (
    <div className={ `${ className } salo-selectput salo-selectput--${ mode }` }>
      { render() }
    </div>
  );
};

Selectput.defaultProps = {
  className: null,
  placeholder: 'Please select…',
  renderItem: null,
  initialMode: 'default'
};

Selectput.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  initialMode: PropTypes.string,
  renderItem: PropTypes.func
};

export default Selectput;