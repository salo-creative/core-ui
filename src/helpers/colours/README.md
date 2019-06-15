# Colour helpers

---

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import { colours } from '@salo/core-ui/helpers/colours';
```

All the colours are mapped to the centralised theme object which is passed into the Theme provider. In styled components this can be accessed via the theme prop e.g. 

```javascript
const StyledComponent = styled.p`
  color: ${ ({ theme }) => theme.secondary };
`;
```

Alternatively they can be imported directly from the UI library and used outside of styled components

```javascript
import { colours } from '@salo/core-ui/helpers/colours';

const { navy } = colours;
```

**For full list of colours see storybook**