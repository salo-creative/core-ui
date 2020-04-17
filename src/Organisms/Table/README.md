# Table

The table organism is made up of many different components to deliver a truly flexible and customisable data table. The table supports column sorting, loading states, error handling filtering, pagination and searching

---

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import Table from '@salo/core-ui/Organisms/Table';
```

Implement as follows

```javascript
<Table
  columns={ [
    { label: 'Column 1', dataKey: 'column_1', minWidth: '200px' },
    { label: 'Column 2', dataKey: 'column_2', minWidth: '200px' },
    { label: 'Column 3', dataKey: 'column_3', minWidth: '200px' }
  ] }
  data={ [
    { 'column_1': 'My first thing', 'column_2': 'My second thing', 'column_3': 'My third thing' },
    { 'column_1': 'My first thing', 'column_2': 'My second thing', 'column_3': 'My third thing' },
    { 'column_1': 'My first thing', 'column_2': 'My second thing', 'column_3': 'My third thing' }
  ] }
/>
```

To get a basic table to render you only need to pass the columns and data props.

### Columns

The columns prop expects an array and this tells the table what columns it should have, their minimum width and what key in the data objects to get the data to hydrate the row in the table from. 

*n.b. the minWidth of a column should always be set and should always be a px value. The component will calculate the total of all minWidths and set the mobile breakpoint accordingly*

```javascript
[
	{
		label: 'Column label', // heading that apears in the table head
		dataKey: 'column_key', // where the data for each row is located
		minWidth: '200px', // used to ensure column never gets too small
		width: '50px', // used to ensure column is always this size if it's important the content is a set width
		sortable: false // bool value of whether column should be sortable
	},
	...
]
```

### Data

The data prop expects an array of data objects to be passed in, where each object corresponds to a row in the table. The data that is placed in each column will be determined based on the dataKey value given in the columns array.

```javascript
[ 
	{ 
		'column_key': 'My first thing',
		'column_key_2': 'My second thing', 
		'column_key_3': 'My third thing'
	},
	...
]
```
If the data array is empty then the table will automatically show a user message stating `There are no results to display` so it is clear the table is not broken. This text can be overriden using the `dataEmptyText` prop which simply accepts a string.

## Loading & Error handling

As the table will mostly be used for handling remote resources it has inbuilt loading and error states as well as retry logic.

### Loading

The loader can be toggled via the `loading` prop which accepts a boolean value. The loading state will take precedence over the tables error state.

```javascript
<Table
  columns={ [ ... ] }
  data={ [ ... ] }
  loading={ true }
/>
```

### Error

A simple error message can be toggled via the `error` prop which accepts a boolean value. If this is set to true and the loading state is false then an error message will be displayed within the table. The default error message is `Something went wrong getting your data!` but this can be overriden via the `errorMessage` prop which accepts a string.

```javascript
<Table
  columns={ [ ... ] }
  data={ [ ... ] }
  error={ true }
/>
```

### Retry

In addition to the basic error message, the table also supports the passing of a retry action so failed remote requests can be retried without the user having to refresh. If the `error` prop is true and a `retryAction` has been passed to the table then in addition to the error message outlined above being displayed, a retry button and some expplanation text will also be shown. If the user clicks the button then the function you passeds into the `retryAction` prop will be called.

```javascript
<Table
  columns={ [ ... ] }
  data={ [ ... ] }
  error={ true }
  retryAction={ () => refetchData() } // custom retry function
/>
```

It is important to note the table itself is not aware of what action/request needs to be performed to retry the data fetch, you will need to call this as part of the retry function passed to the table itself.

## Pagination

The table has the pagination molecule bundled with it with some sensible defaults set (for full details on the pagination component see its storybook). To enable the pagination on the table you need to pass both a `pagination` object and a `pageChange` function. e.g.

```javascript
<Table
  columns={ [ ... ] }
  data={ [ ... ] }
  pagination={ {
    perPage: 24,
	  page: 1,
	  total: 240
  } }
  pageChange={ (page) => handlePageChange(page) }
/>
```

the table itself simply displays the pagination controls and exposes a function for handling the page change. It will be the responsibility of your component/view to handle the process of fetching more remote data and passing it to the table to update its contained data and pagination state.

## Actions

The table supports an action area where button etc can be added in the last column of each row. The `action` prop expects a function to be passed which the table then passes the row data to as its only argument. This means you can pass any function containing valid components and have access to the rows information to implement custom actions etc. If a function is passed to the prop then the table will automatically add a new column for the header and each row so there is no need to modify your data or column objects.

```javascript
<Table
  columns={ [ ... ] }
  data={ [ ... ] }
  actions={ (data, context) => (
    <FlyOut context={ context }>
      <FlyOutButton title='Title' onClick={ () => alert(row.column_1) } icon='sync' />
      <FlyOutLink title='Title' link={ `/${ row.column_1 }` } icon='dashboard' />
    </FlyOut>
  ) }
/>
```

For simplicity the `FlyOut` menu molecule has been modified to include a number of specific styles to make it fit with the table perfectly and is the example used above. Because of this the table sizes the action column to 80px to accommodate this but this can be overridden using the `actionsWidth` property which accepts a string px value for the columns width.

*n.b. it is strongly advised for consistency you always use the `FlyOut` molecule as it has been specifically built and modified to work with the table*

## Responsive behaviour

If the parent's width exceeds each column's minimum width (taking into consideration any action buttons on the row) then the table will look like a regular table. If it's lower than each column's minimum width then it'll stack each row to a card layout with the column title above it. We have found that this is a good compromise between scrolling and visibility of data.

## Custom rows

Each element has a number of CSS classes which can be targetted to create custom layouts (e.g. absolutely positioning rows, showing/hiding individual cells, etc).

## Sort (NOT IMPLEMENTED)

**For full prop types and usage see storybook info/knobs**