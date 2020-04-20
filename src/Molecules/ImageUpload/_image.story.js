import React from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';

// FEATURED COMPONENT //
import { ImageUpload } from '../..';

const Wrapper = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

const CustomImageUpload = styled(ImageUpload)`
  border-radius: 50%;
  height: 10rem;
  width: 10rem;

  .salo-uploader__zone {
    border-radius: 50%;
  }
`;


export const Basic = () => {
  return (
    <Wrapper>
      <ImageUpload loading={ false } onUpload={ action('onUpload') } />
    </Wrapper>
  );
};

export const Custom = () => {
  return (
    <Wrapper>
      <CustomImageUpload
        loading={ false }
        onUpload={ action('onUpload') }
        showButton={ false }
        strings={ {
          ADD_AN_IMAGE: 'Add image'
        } }
      />
    </Wrapper>
  );
};

export default {
  title: 'Molecules/ImageUpload'
};