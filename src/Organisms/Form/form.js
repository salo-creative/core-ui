import React from 'react';
import PropTypes from 'prop-types';

import useFormData from '../../Forms/useFormData';

const Form = ({ name }) => {
  const { fields, values } = useFormData({ name });
  console.log({ fields, values });
  return null;
  // return (
  //   <form>
  //     { fields }
  //   </form>
  // );
};

Form.propTypes = { name: PropTypes.string.isRequired };

export default Form;