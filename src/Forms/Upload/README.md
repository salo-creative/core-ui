# Upload

This is an Upload component that can be used as a `<input type='file'>` html element. It works well with `useForm`.

## Usage

Install

```bash
yarn add @salo/core-ui
```

Include

```javascript
import Upload from '@salo/core-ui/Forms/Upload';
```

Implement as follows

```javascript
<Upload 
  name='readme'
  accepts='image/*'
/>
```

Uploaders often have drastically different appearances depending on the client and context. For this reason there are 3 ways to customise the look of this upload component.

1. Pass no children like the example above and it'll use the default Button component.
2. Pass children and it'll wrap them with the label to trigger the file picker dialog. The main caveat here is that you can't nest `<button />`.

```javascript
<Upload 
  name='readme'
  accepts='image/*'
>
  Upload a file
</Upload>
```

3. And finally you can use render props with it to completely customise the look and behaviour of the trigger.

```javascript
<Upload
  name='readme'
  accepts='image/*'
>
  { ({ inputRef, disabled }) => (
    <React.Fragment>
      <P>Upload a file (pdf, docx, jpg, png)</P>
      <button
        htmlFor='readme'
        disabled={ disabled }
        onClick={ () => inputRef.current.click() }>
          Choose file
      </button>
    </React.Fragment>
   ) }
</Upload>
```


### useForm

`input[type='file']` does not fire blur events but we need to call `handleBlur` to trigger schema validation so using with useForm looks something like this:

```javascript
<Upload
  name='readme'
  error={ showErrors && readme.error }
  errorMessage='Sorry, we cannot attach this type of file or it is too large'
  onChange={ ({ e, value }) =>  handleBlur('readme', value) }
/>
```

#### useForm: Schema validation

File validation doesn't come out-of-the-box with Yup but you can add 2 simple tests to ensure the right filetype and size.

Note that `mimeTypes` is imported from core-ui so they're consistent with `accept`.

```javascript
import { mixed } from 'Yup';
import Upload, { mimeTypes } from '@salo/core-ui/Forms/Upload';

const FILE_SIZE = 10e6;
const SUPPORTED_FORMATS = [...mimeTypes.images];

const model = {
  attachment: {
    value: '',
    validation: mixed()
      .test('fileSize', 'File size is too large', value => value && value.size <= FILE_SIZE)
      .test('fileType', 'Unsupported file type', value => value && SUPPORTED_FORMATS.includes(value.type))
  }
};
```

### accept

Another conveniance features is `accept`. This either takes an array like `['images']` or a string value like `image/png`. This allows you to think about the types of documents allowed rather than individual mime types but if you need the granularity then it's there.

```javascript
<Upload
  name='readme'
  accept={ ['images', 'documents'] }
/>
```
