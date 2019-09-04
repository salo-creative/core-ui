import React from 'react';
import PropTypes from 'prop-types';

// import useFormBuilder from '../../Forms/useFormBuilder';

const SaloForm = ({ name }) => {
  // const { fields } = useFormBuilder({ name });
  // console.log({ fields });
  // return (
  //   <form>
  //     { fields }
  //   </form>
  // );
};

SaloForm.propTypes = { name: PropTypes.string.isRequired };

export default SaloForm;