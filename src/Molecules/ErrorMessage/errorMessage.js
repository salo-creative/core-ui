import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import H3 from '../../Typography/H3';
import P from '../../Typography/P';
import Button from '../Button';
import ApolloError from '../../Apollo/Error';
import { ErrorContainer } from './errorMessage.styles';

const ErrorMessage = (props) => {
  const {
    error,
    padding,
    retryAction,
    title
  } = props;

  return (
    <ApolloError
      error={ error }
      addAlert={ false }
    >
      { ({ message, code }) => (
        <ErrorContainer width='700px' padding={ padding }>
          <H3 align='center' margin='0 0 1rem'>{ title }</H3>
          <P align='center'>Status: { code || 400 } | { message || 'Sorry the action you have performed is invalid. Please check the details supplied and try again' }</P>
          { retryAction && typeof retryAction === 'function' && (
            <React.Fragment>
              <P align='center'>You can retry the last action by pressing the button below.</P>
              <Button onClick={ retryAction } iconBefore='sync' />
            </React.Fragment>
          ) }
        </ErrorContainer>
      ) }
    </ApolloError>
  );
};

ErrorMessage.defaultProps = {
  padding: '2rem',
  retryAction: null,
  title: 'Whoops something went wrong'
};

ErrorMessage.propTypes = {
  error: PropTypes.object.isRequired,
  padding: PropTypes.string,
  retryAction: PropTypes.func,
  title: PropTypes.string
};

export default ErrorMessage;