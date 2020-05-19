import React from 'react';
import PropTypes from 'prop-types';
import { memoize } from 'lodash';

// COMPONENTS & STYLES
import { TabButton, Pane } from './tab.styles';

function computeMachineName(name) {
  return name.toLowerCase().replace(/ /g, '-');
}

const getMachineName = memoize(computeMachineName);

const Tab = (props) => {
  const { className, panes } = props;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [focus, setFocus] = React.useState(0);

  const handleDirectionalArrows = (event) => {
    let tabFocus = focus;
    if (event.keyCode === 39 || event.keyCode === 37) {
      if (event.keyCode === 39) {
        tabFocus++;
        // If we're at the end, go to the start
        if (tabFocus >= panes.length) {
          tabFocus = 0;
        }
        // Move left
      } else if (event.keyCode === 37) {
        tabFocus--;
        // If we're at the start, go to the end
        if (tabFocus < 0) {
          tabFocus = panes.length - 1;
        }
      }
      setFocus(tabFocus);
      document.querySelector(`#tab-${ getMachineName(panes[tabFocus].title) }`).focus();
    }
  };

  return (
    <div className={ `${ className } salo-tabs` }>
      <div
        aria-label='Tabs'
        className='salo-tabs__tabs'
        onKeyDown={ handleDirectionalArrows }
        role='tablist'
        tabIndex={ 0 }
      >
        { panes.map((pane, index) => {
          return (
            <TabButton
              aria-controls={ getMachineName(pane.title) }
              aria-selected={ index === activeIndex }
              className='salo-tabs__button'
              id={ `tab-${ getMachineName(pane.title) }` }
              key={ pane.title }
              onClick={ () => setActiveIndex(index) }
              role='tab'
              tabIndex={ index === focus ? 0 : -1 }
              type='button'
            >
              { pane.children || pane.title }
            </TabButton>
          );
        }) }
      </div>
      <div>
        { panes.map((pane, index) => (
          <Pane
            aria-labelledby={ `tab-${ getMachineName(pane.title) }` }
            className='salo-tabs__pane'
            hidden={ index !== activeIndex }
            id={ getMachineName(pane.title) }
            key={ getMachineName(pane.title) }
            role='tabpanel'
            tabIndex={ index === focus ? 0 : -1 }
          >
            { index === activeIndex && pane.render() }
          </Pane>
        )) }
      </div>
    </div>
  );
};

Tab.defaultProps = {
  className: ''
};

Tab.propTypes = {
  className: PropTypes.string,
  panes: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.any,
      title: PropTypes.string,
      render: PropTypes.func.isRequired
    })
  ).isRequired
};

export default Tab;