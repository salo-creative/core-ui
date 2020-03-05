# Dynamic Form

An all-in-one solution for managing forms _done properly_.

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import DynamicForm from '@salo/core-ui/Organisms/DynamicForm';
```

Implement as follows

```javascript
<DynamicForm
  name='form_name'
/>
```

## Select options from remote resources

In some cases the value of select dropdowns is not known ahead of time or is dynamic. In this case you can pass the following option to DynamicForm:

```javascript
<DynamicForm
  name='form_name'
  options={ {
    select: {
      [FIELD_NAME]: DYNAMIC_VALUES
    }
  } }
/>
```

where `FIELD_NAME` is the name of the Select and `DYNAMIC_VALUES` is an array of values formatted as:

```javascript
[{
  label: 'A',
  value: 'a'
}]
```

See [Storybook](http://localhost:6001/?path=/story/organisms-dynamic-form--basic) for more options and uses.