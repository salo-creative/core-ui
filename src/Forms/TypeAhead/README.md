# TypeAhead

This is an input field that shows a bunch of suggested values to the user as they begin typing. These are displayed in a dropdown, which can be navigated with the arrow keys and submitted by pressing the return key.

The possible suggestions should be included by passing an array to the component in the suggestions prop.

If you pass a 'debounced' boolean to the TypeAhead, it will run the onChange function you pass as a debounced function 500ms after the last text input. This is designed to cut down on unnecessary asynchronous requests. Debounced is false by default, and if it's false, onChange will run every time instantaneously as the input changes.

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import TypeAhead from '@salo/core-ui/Forms/TypeAhead';
```

Implement as follows

```javascript
<TypeAhead
    onChange={ (value) => {
        const newSuggestions = // Filter array of options
        setState({ suggestions: newSuggestions });
    } }
    label={ label }
    loading={ loading }
    helperText={ helperText }
    error={ error }
    required={ required }
    disabled={ disabled }
    suggestions={ state.suggestions }
    name='typeAhead'
/>
```

Asynchronous suggestions:

```javascript
<TypeAhead
    onChange={ (value) => {
        store.set({ value, skip: false });
    } }
    onSelect={ (value) => console.log('Selected item:', value) }
    label={ label }
    loading={ loading }
    helperText={ helperText }
    error={ error }
    required={ required }
    disabled={ disabled }
    suggestions={ get(data, 'user_list_permission_groups', []).map(group => {
        return { id: group.id, label: group.name };
    }) }
    value={ store.value }
    name='story'
    debounced
/>
```