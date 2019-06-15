import React from 'react';
import { storiesOf } from '@storybook/react';

// load tests
import { withTests } from '@storybook/addon-jest';
import { withKnobs, text, select, color } from '@storybook/addon-knobs';
import results from '../../../.storybook/jest-test-results.json';

// FEATURED COMPONENT
import { P } from '../../index';

// README //
import README from './README.md';

// Start of story logic
const stories = storiesOf('Atoms | Typography/P', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results }));
stories.addParameters({ jest: ['p'] });

stories.add(
  'Basic',
  (() => {
    const align = select('Align', {
      'Left': 'left',
      'Right': 'right',
      'Center': 'center'
    }, 'left');
    const fontSize = text('Font size', '');
    const lineHeight = text('Line height', '');
    const colour = color('Colour', '#262729');
    const margin = text('Margin', '0 0 20px');
    return (
      <React.Fragment>
        <P
          color={ colour }
          fontSize={ fontSize }
          lineHeight={ lineHeight }
          align={ align }
          margin={ margin }
        >
          <strong>Some bold text with a break after it</strong>
          <br />consectetur adipiscing elit. Donec molestie eleifend malesuada. <em>Ohhh italic! Donec vel massa nunc.</em> Phasellus molestie mollis lacus, pretium facilisis augue tempus at. Phasellus ullamcorper interdum posuere. Proin at suscipit mauris. Aenean convallis faucibus consectetur. Nunc vel ipsum ut libero elementum sollicitudin ut sit amet ex. Nulla sagittis at risus vel bibendum. Pellentesque condimentum non nulla suscipit pellentesque. Curabitur eget purus sem. Morbi vestibulum egestas elit ac scelerisque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam dapibus nunc sollicitudin ultricies aliquet. Etiam semper massa vulputate enim ornare lacinia. Curabitur fermentum venenatis turpis a hendrerit. Donec porta tellus in diam aliquet viverra.
        </P>

        <P
          color={ colour }
          fontSize={ fontSize }
          lineHeight={ lineHeight }
          align={ align }
          margin={ margin }
        >
          <strong>pre</strong> tag
          <br />
          <pre>Vivamus sodales sit amet turpis id mattis. Pellentesque eu turpis rhoncus, tempus ipsum ac, aliquet urna. Fusce imperdiet quam quis congue semper. Nunc fringilla elit enim, euismod efficitur enim iaculis id.</pre>
        </P>

        <P
          color={ colour }
          fontSize={ fontSize }
          lineHeight={ lineHeight }
          align={ align }
          margin={ margin }
        >
          <strong>code</strong> tag
          <br />
          <code>Vivamus sodales sit amet turpis id mattis. Pellentesque eu turpis rhoncus, tempus ipsum ac, aliquet urna. Fusce imperdiet quam quis congue semper. Nunc fringilla elit enim, euismod efficitur enim iaculis id.</code>
        </P>
        
        <P
          color={ colour }
          fontSize={ fontSize }
          lineHeight={ lineHeight }
          align={ align }
          margin={ margin }
        >
          Nunc efficitur dolor sed venenatis condimentum. Curabitur pretium porta dolor quis consectetur. Cras non erat et neque egestas euismod in quis tellus. Nulla facilisi. Sed consectetur vulputate nibh quis finibus. Maecenas consectetur, nibh non volutpat pretium, ligula metus commodo arcu, vel mattis sapien arcu quis nunc. Aenean scelerisque sapien eget quam accumsan, et porttitor quam ultricies. Aenean sed ante tempor, laoreet sapien vitae, eleifend lectus. Phasellus eget finibus felis, et venenatis nisl. Etiam efficitur, enim et varius volutpat, augue tortor scelerisque turpis, vel scelerisque quam odio ut lectus. Morbi mollis fringilla tortor non auctor.
        </P>
      </React.Fragment>
    );
  }), { notes: README }
);