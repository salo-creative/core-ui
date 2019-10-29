# Input

This is an input component. It works well with `useForm`.

## Usage

Install

```bash
yarn add @salo/core-ui
```

Include

```javascript
import Input from '@salo/core-ui/Forms/Input';
```

Implement as follows

```javascript
<Input 
  name='email'
  placeholder='Enter your email address'
/>
```

## Icons

There are a couple of ways you can pass icons to the input.

1. The simplest way is with a string, this will default to left align with a left position of 3rem.

```javascript
<Input icon='pencil' />
```

2. If you need granular control of the icon you can pass an object like this:

```javascript
<Input 
  icon={ {  
    fill: PropTypes.string,
    icon: PropTypes.string.isRequired,
    offset: PropTypes.string,
    position: PropTypes.oneOf(['left', 'right'])
  } }  
/>
```

This should give you full flexibility to position and style your icon.