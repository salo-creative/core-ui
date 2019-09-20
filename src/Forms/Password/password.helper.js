import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@salo/icons';

// COMPONENTS & STYLES
import { HelperWrapper, ValidationLabel, ValidationRules } from './password.styles';

const Helper = (props) => {
  const { password } = props;

  const hasLength = password.length >= 8;
  const hasUppercase = new RegExp(/\w*[A-Z]\w*/).test(password);
  const hasLowercase = new RegExp(/\w*[a-z]\w*/).test(password);
  const hasNumber = new RegExp(/\w*[0-9]\w*/).test(password);
  const hasSpecial = new RegExp(/\w*[@$!%*?&£#]\w*/).test(password);

  const iconProps = {
    margin: '0 0.5rem 0 0',
    size: 18
  };

  return (
    <HelperWrapper>
      <ValidationLabel>Your password must contain the following:</ValidationLabel>
      <ValidationRules className={ hasLength ? 'valid' : '' }>
        <Icon
          { ...iconProps }
          icon={ hasLength ? 'tick' : 'alert' }
        />
            A minimum of 8 characters
      </ValidationRules>
      <ValidationRules className={ hasUppercase ? 'valid' : '' }>
        <Icon
          { ...iconProps }
          icon={ hasUppercase ? 'tick' : 'alert' }
        />
            Uppercase letter (A-Z)
      </ValidationRules>
      <ValidationRules className={ hasLowercase ? 'valid' : '' }>
        <Icon
          { ...iconProps }
          icon={ hasLowercase ? 'tick' : 'alert' }
        />
            Lowercase letter (a-z)
      </ValidationRules>
      <ValidationRules className={ hasNumber ? 'valid' : '' }>
        <Icon
          { ...iconProps }
          icon={ hasNumber ? 'tick' : 'alert' }
        />
            Number (0-9)
      </ValidationRules>
      <ValidationRules className={ hasSpecial ? 'valid' : '' }>
        <Icon
          { ...iconProps }
          icon={ hasSpecial ? 'tick' : 'alert' }
        />
            Special character (@$!%*?&£#)
      </ValidationRules>
    </HelperWrapper>
  );
};

Helper.defaultProps = { password: '' };

Helper.propTypes = { password: PropTypes.string };

export default Helper;