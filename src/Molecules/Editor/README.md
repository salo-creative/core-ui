# FlyOut menu

The FlyOut menu is designed to be used either as a standalone menu or as part of table and card components. It has been built with specific styles for each of these use cases in mind but can be extended further for other implementations. At its core it is a collapsed menu that can contain both links and button to perform actions within an application. It is similar to the concept of an action button in material design.

---

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import Editor from '@salo/core-ui/Molecules/Editor';
```

Implement as follows

The FlyOut menu comes with pre-defined buttons and links for use within it that are exported from the module as named exports. These should be used explicitly within the menu and no other components. 

```javascript
<FlyOut context='float'>
  <FlyOutButton title='Title' onClick={ () => alert('Button Clicked') } icon='sync' />
  <FlyOutLink title='Title' link='#' icon='dashboard' />
</FlyOut>
```

For detailed explanations of how to use the FlyOut in  a table or a card component see their stories and README's.

**For full prop types and usage see storybook info/knobs**