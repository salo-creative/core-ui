# Select

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

### accepts

Another conveniance features is `accepts`. This either takes an array like `['images']` or a string value like `image/png`. This allows you to think about the types of documents allowed rather than individual mime types but if you need the granularity then it's there.

```javascript
<Upload
  name='readme'
  accepts={ ['images', 'documents'] }
/>
```