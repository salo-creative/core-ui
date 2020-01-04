import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import Button from '../Button';
import Loader from '../Loader';

import { onImageDrop } from './helpers';
import {
  UploaderDropZone,
  UploaderLabel,
  UploaderWrapper,
  UploaderZone
} from './styles';

const ImageUpload = ({
  className,
  height,
  loading,
  maxFileSize,
  onUpload,
  showButton,
  strings,
  width
}) => {
  const accept = 'image/jpeg,image/png,image/gif';
  const [fileSizeError, setFileSizeError] = React.useState(false);
  const text = {
    ADD_AN_IMAGE: get(strings, 'ADD_AN_IMAGE') || 'Click / drag and drop to add an image',
    FILE_TOO_BIG: get(strings, 'FILE_TOO_BIG') || 'Please choose a smaller image',
    INCORRECT_FILE_TYPE_IMAGE: get(strings, 'INCORRECT_FILE_TYPE_IMAGE') || 'Incorrect file type'
  };

  return (
    <UploaderWrapper
      className={ `salo-uploader ${ className }` }
      setHeight={ height }
      setWidth={ width }
    >
      <Loader
        display={ loading }
        loaderProps={ {
          position: 'absolute'
        } }
        appearance='light'
      />
      { !loading
          && (
            <UploaderDropZone
              accept={ accept }
              className='salo-uploader__dropzone'
              maxSize={ maxFileSize }
              multiple={ false }
              onDrop={ (files, rejected) => onImageDrop({
                files,
                maxFileSize,
                onUpload,
                rejected,
                setFileSizeError
              }) }
            >
              { ({ isDragActive, isDragReject, getInputProps, getRootProps }) => {
                if (isDragReject) {
                  return (
                    <UploaderZone
                      accepted='not-accepted'
                      className='salo-uploader__zone salo-uploader__zone--reject'
                      htmlFor='dropzone'
                      { ...getRootProps() }
                    >
                      <input id='dropzone' { ...getInputProps() } />
                      <UploaderLabel className='salo-uploader__label'>{ text.INCORRECT_FILE_TYPE_IMAGE }</UploaderLabel>
                    </UploaderZone>
                  );
                }
                if (isDragActive) {
                  return (
                    <UploaderZone
                      accepted='accepted'
                      className='salo-uploader__zone salo-uploader__zone--accepted'
                      htmlFor='dropzone'
                      { ...getRootProps() }
                    >
                      <input id='dropzone' { ...getInputProps() } />
                      <UploaderLabel className='salo-uploader__label'>{ text.ADD_AN_IMAGE }</UploaderLabel>
                    </UploaderZone>
                  );
                }
                if (fileSizeError) {
                  return (
                    <UploaderZone
                      accepted='not-accepted'
                      className='salo-uploader__zone salo-uploader__zone--reject'
                      htmlFor='dropzone'
                      { ...getRootProps() }
                    >
                      <input id='dropzone' { ...getInputProps() } />
                      { showButton && (
                        <Button
                          as='div'
                          circle={ true }
                          className='salo-uploader__button'
                          height='auto'
                          iconBefore='upload'
                          margin='0 0 1.5em'
                          padding='1.5em'
                          width='auto'
                        />
                      ) }
                      <UploaderLabel className='salo-uploader__label'>{ text.FILE_TOO_BIG }</UploaderLabel>
                    </UploaderZone>
                  );
                }
                return (
                  <UploaderZone
                    className='salo-uploader__zone'
                    htmlFor='dropzone'
                    { ...getRootProps() }
                  >
                    <input id='dropzone' { ...getInputProps() } />
                    { showButton && (
                      <Button
                        as='div'
                        circle={ true }
                        className='salo-uploader__button'
                        height='auto'
                        iconBefore='upload'
                        margin='0 0 1.5em'
                        padding='1.5em'
                        width='auto'
                      />
                    ) }
                    <UploaderLabel className='salo-uploader__label'>
                      { text.ADD_AN_IMAGE }
                    </UploaderLabel>
                  </UploaderZone>
                );
              } }
            </UploaderDropZone>
          ) }
    </UploaderWrapper>
  );
};

ImageUpload.defaultProps = {
  className: '',
  height: 9,
  loading: true,
  maxFileSize: 5e6,
  showButton: true,
  strings: {},
  width: 16
};

ImageUpload.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  loading: PropTypes.bool,
  maxFileSize: PropTypes.number,
  onUpload: PropTypes.func.isRequired,
  showButton: PropTypes.bool,
  strings: PropTypes.object,
  width: PropTypes.number
};

ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;