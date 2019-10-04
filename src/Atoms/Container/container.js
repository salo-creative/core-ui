import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  max-width: ${ ({ width }) => width };
  padding: ${ ({ padding }) => padding };
  text-align: ${ ({ textAlign }) => textAlign };
`;

Container.defaultProps = {
  padding: '1rem',
  textAlign: null,
  width: '128rem'
};

Container.propTypes = {
  padding: PropTypes.string,
  textAlign: PropTypes.string,
  width: PropTypes.string
};

Container.displayName = 'Container';

export default Container;