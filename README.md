# core-ui

![Publish](https://github.com/salo-creative/core-ui/workflows/Publish/badge.svg)
![Development](https://github.com/salo-creative/core-ui/workflows/Development/badge.svg)

The core ui is developed in order to give components with limited styling that can be used on all Salo projects. Where appropriate props can be exposed to modify the appearance. In order to aid styling from within projects it is also important that components are given structured class names that can be used for override styles in different applications.

## Development

The project uses storybook for local, abstracted development which has been configured to work with the GraphQL gateway. All components must have README.s and appropriate stories with knobs.

To get started run the following to install the dependencies
```bash
yarn
```

Then run the demo command to run the initial unit tests and boot up the development server
```bash
yarn demo
```

## Hooks

### useAnalytics

Example usage:

```javascript
useAnalytics({
  event_type: 'user_profile_view',
  content_id: id,
  content_type: 'user',
  url: isBrowser && window.location.href
});
```

It returns the call to the mutation so you can also do the following:

```javascript
const runAnalytics = useAnalytics({
  defer: true
});

// later
runAnalytics({
  variables: {}
})
```

## Publishing

1. Create a feature branch from master
2. Open a PR from your feature back to master
3. When you are ready to release the library checkout master and pull down the latest code.
4. run `yarn release` locally to add changelog and increment version number and then push directly to master to trigger publish action
5. If you want to deploy to GitHub pages then run `yarn release:ghp`. This should only be run from master so not before a PR is merged
