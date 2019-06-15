# Pagination

The pagination component is built to be used for both front end pagination and also pagination where remote requests are required. It will take in a simple object to define the pagination parameters and then emits an event on page change with the desired page number that you can choose in whatever way you decide.

---

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import Pagination from '@salo/core-ui/Molecules/Pagination';
```

Implement as follows

```javascript
<Pagination
  changePage={ (page) => alert(`Changed to page => ${ page }`) } // change handle function
  perPage={ 24 } // items perPage
  page={ 1 } // current page
  pagesToShow={ 10 } // Limits how many buttons are shown in pagination
  total={ 100 } // total items
/>
```

**For full prop types and usage see storybook info/knobs**