import PropTypes from 'prop-types';

// HELPERS
import { isBrowser } from '../../helpers/environments';

const ExternalRedirect = (props) => {
  if (isBrowser) {
    window.location = props.url;
  }
  return null;
};

ExternalRedirect.propTypes = {
  url: PropTypes.string.isRequired
};

export default ExternalRedirect;