# core-ui

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

## Publishing

1. Open a PR from your feature back to master
2. When approved run `yarn release:prep` locally to add changelog and increment version number
3. When development pipeline completes, hit merge and the publish pipeline will release your changes
4. If you want to deploy to GitHub pages then run `yarn release:ghp`. This should only be run from master so not before a PR is merged
