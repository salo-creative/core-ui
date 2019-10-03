import PropTypes from 'prop-types';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: ${ ({ alignItems }) => alignItems };
  flex-direction: ${ ({ flexDirection }) => flexDirection };
  flex-wrap: ${ ({ flexWrap }) => flexWrap };
  flex: ${ ({ flex }) => flex };
  justify-content: ${ ({ justifyContent }) => justifyContent };
  padding: ${ ({ padding }) => padding };
`;

Row.defaultProps = {
  alignItems: 'flex-start',
  flex: '0 1 auto',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  padding: '0'
};

Row.propTypes = {
  alignItems: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'unset']),
  flex: PropTypes.string,
  flexDirection: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  flexWrap: PropTypes.oneOf(['wrap', 'no-wrap', 'wrap-reverse']),
  justifyContent: PropTypes.oneOf(['space-between', 'center', 'flex-start', 'flex-end']),
  padding: PropTypes.string
};

Row.displayName = 'Row';

export default Row;