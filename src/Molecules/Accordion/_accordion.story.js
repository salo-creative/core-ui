import React from 'react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { RenderWithProps, Store } from '@jamesbliss/storybook-state';

// Tests.
import { withTests } from '@storybook/addon-jest';
import results from '../../../.storybook/jest-test-results.json';

// Featured Component.
import { Accordion, AccordionItem } from '../../index';
import P from '../../Typography/P';

// README
import README from './README.md';

export const Basic = () => {
  // Store
  const store = new Store({});
  // Knobs.
  const iconBefore = text('iconBefore', 'pencil');
  const allowMultiple = boolean('allowMultiple', false);
  return (
    <RenderWithProps store={ store }>
      <Accordion allowMultiple={ allowMultiple }>
        <AccordionItem label='Interesting Label' iconBefore={ iconBefore } id='1'>
          <P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porttitor vestibulum mi id
            blandit. In pulvinar varius mauris, eget faucibus dui molestie ut. Donec at neque in
            diam mollis laoreet. Curabitur lobortis, augue vel maximus dictum, leo neque gravida
            dolor, sit amet ullamcorper magna velit sit amet magna. Duis ac dolor lacus. Aenean sit
            amet nisi nec eros scelerisque rutrum. Fusce mattis a erat at suscipit. Suspendisse
            malesuada ultrices lorem, quis bibendum massa tempor et. Ut interdum tellus quis diam
            venenatis, eget faucibus libero blandit.
          </P>
          <P>
            Phasellus interdum tempus odio, vel vestibulum diam accumsan at. Nulla facilisi. Ut
            justo lectus, luctus a vulputate vel, consectetur nec ante. Ut auctor ut metus sed
            semper. In elit ex, dictum ac tempor quis, feugiat et purus. Vestibulum non lorem ut
            lacus sagittis interdum quis sit amet ipsum. Praesent a lectus ultrices ante aliquet
            pulvinar. Sed odio erat, varius ut finibus eu, molestie ac sem. Aliquam eu mollis dolor.
            Suspendisse nec feugiat ligula. Aliquam hendrerit sem quam, at hendrerit elit viverra
            ut. Maecenas porttitor turpis eget augue tristique faucibus. Proin non erat viverra,
            vestibulum libero eget, volutpat leo. Praesent vestibulum pulvinar mi, at pulvinar eros
            tempor quis. Cras a semper urna.
          </P>
        </AccordionItem>
        <AccordionItem label='A Longer Label, Just As Interesting' iconBefore={ iconBefore } id='2'>
          <P>
            Curabitur ultrices est a consequat aliquet. Donec varius finibus augue eget facilisis.
            Mauris ut mauris ullamcorper, tempor eros quis, dapibus orci. Donec dolor elit, cursus
            in tempor et, consectetur ut augue. Nunc sodales vitae nunc ac suscipit. Curabitur vitae
            quam sit amet tortor dictum lacinia. Cras eleifend urna quis efficitur viverra.
            Curabitur vel consequat odio, quis elementum metus. Fusce ac molestie est. Nam pharetra
            ligula at neque mattis, et tristique lorem sagittis. Curabitur a molestie justo.
          </P>
        </AccordionItem>
        <AccordionItem id='3' label='A Third Label' iconBefore={ iconBefore }>
          <P>
            Sed eu sollicitudin metus. Integer nulla massa, porttitor vel vulputate vitae, pulvinar
            ac enim. Donec eu rhoncus turpis. Phasellus venenatis ante neque, at tristique lacus
            elementum eget. Vivamus aliquam, tellus eget venenatis volutpat, lorem leo hendrerit
            tellus, id scelerisque tellus libero id ante. Suspendisse potenti. Aliquam ex ante,
            efficitur sit amet neque in, consectetur accumsan magna. Proin tincidunt feugiat sapien
            vitae aliquam. Aliquam sed libero ut ligula facilisis vestibulum ac ac odio. Ut ac
            commodo enim. Sed vitae ligula ut sapien vehicula placerat eget pretium arcu. Mauris
            quis enim mauris. Pellentesque dolor ante, tempor ac laoreet dapibus, aliquam at orci.
            Aliquam mauris velit, luctus in massa vel, fringilla volutpat leo.
          </P>
        </AccordionItem>
      </Accordion>
    </RenderWithProps>
  );
};

Basic.story = {
  decorators: [
    withKnobs,
    withTests({
      results
    })
  ],
  parameters: {
    jest: ['accordion'],
    info: {
      propTablesExclude: [RenderWithProps, P]
    },
    notes: README
  }
};

export default {
  title: 'Molecules/Accordion'
};