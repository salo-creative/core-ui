import styled, { css, keyframes } from 'styled-components';

const TALL_COLUMN_HEIGHT = '25px';
const COLUMN_HEIGHT = '15px';
const COLUMN_1_WIDTH = '120px';
const COLUMN_2_WIDTH = '250px';
const COLUMN_3_WIDTH = '100px';
const COLUMN_4_WIDTH = '140px';

// Table layout - no offset
const ROW_1_COLUMN_1_POSITION = '20px 20px';
const ROW_1_COLUMN_2_POSITION = '240px 25px';
const ROW_1_COLUMN_3_POSITION = '640px 25px';
const ROW_1_COLUMN_4_POSITION = '800px 25px';
const ROW_2_COLUMN_1_POSITION = '20px 75px';
const ROW_2_COLUMN_2_POSITION = '240px 80px';
const ROW_2_COLUMN_3_POSITION = '640px 80px';
const ROW_2_COLUMN_4_POSITION = '800px 80px';
const ROW_3_COLUMN_1_POSITION = '20px 130px';
const ROW_3_COLUMN_2_POSITION = '240px 135px';
const ROW_3_COLUMN_3_POSITION = '640px 135px';
const ROW_3_COLUMN_4_POSITION = '800px 135px';

// Card layout - no offset
// y = previous offset + previous height + gap
const CARD_ROW_1_COLUMN_1_POSITION = '10px 10px';
const CARD_ROW_1_COLUMN_2_POSITION = '10px 55px';
const CARD_ROW_1_COLUMN_3_POSITION = '10px 90px';
const CARD_ROW_1_COLUMN_4_POSITION = '10px 125px';
const CARD_ROW_2_COLUMN_1_POSITION = '10px 200px';
const CARD_ROW_2_COLUMN_2_POSITION = '10px 245px';
const CARD_ROW_2_COLUMN_3_POSITION = '10px 280px';
const CARD_ROW_2_COLUMN_4_POSITION = '10px 315px';
const CARD_ROW_3_COLUMN_1_POSITION = '10px 400px';
const CARD_ROW_3_COLUMN_2_POSITION = '10px 445px';
const CARD_ROW_3_COLUMN_3_POSITION = '10px 480px';
const CARD_ROW_3_COLUMN_4_POSITION = '10px 515px';

const loading = keyframes`
  to {
    background-position:
      150% 0, /* animation */ 
              /* row 1 */
      ${ ROW_1_COLUMN_1_POSITION },
      ${ ROW_1_COLUMN_2_POSITION },
      ${ ROW_1_COLUMN_3_POSITION },
      ${ ROW_1_COLUMN_4_POSITION },
              /* row 2 */
      ${ ROW_2_COLUMN_1_POSITION },
      ${ ROW_2_COLUMN_2_POSITION },
      ${ ROW_2_COLUMN_3_POSITION },
      ${ ROW_2_COLUMN_4_POSITION },
              /* row 3 */
      ${ ROW_3_COLUMN_1_POSITION },
      ${ ROW_3_COLUMN_2_POSITION },
      ${ ROW_3_COLUMN_3_POSITION },
      ${ ROW_3_COLUMN_4_POSITION },
      0 0     /* background */
    ;
  }
`;

const loadingCard = keyframes`
  to {
    background-position:
      150% 0, /* animation */ 
              /* row 1 */
      ${ CARD_ROW_1_COLUMN_1_POSITION },
      ${ CARD_ROW_1_COLUMN_2_POSITION },
      ${ CARD_ROW_1_COLUMN_3_POSITION },
      ${ CARD_ROW_1_COLUMN_4_POSITION },
              /* row 2 */
      ${ CARD_ROW_2_COLUMN_1_POSITION },
      ${ CARD_ROW_2_COLUMN_2_POSITION },
      ${ CARD_ROW_2_COLUMN_3_POSITION },
      ${ CARD_ROW_2_COLUMN_4_POSITION },
              /* row 3 */
      ${ CARD_ROW_3_COLUMN_1_POSITION },
      ${ CARD_ROW_3_COLUMN_2_POSITION },
      ${ CARD_ROW_3_COLUMN_3_POSITION },
      ${ CARD_ROW_3_COLUMN_4_POSITION },
      0 0     /* background */
    ;
  }
`;

export const Skeleton = styled.div.attrs({
  className: 'salo-table--is-mounting'
})`
  ${ ({ mounted, cardThresholdWidth, skeleton }) => {
    if (!mounted) {
      const backgroundRGB = skeleton?.background || [255, 255, 255];
      const foregroundRGB = skeleton?.foreground || [225, 225, 225];

      const TALL_COLUMN_SKELETON = `linear-gradient(rgb(${ foregroundRGB.join() }) 25px, transparent 0)`;
      const COLUMN_SKELETON = `linear-gradient(rgb(${ foregroundRGB.join() }) 15px, transparent 0)`;

      return css`
        background-image: 
         /* animation */
          linear-gradient(
            90deg,
            rgba(${ backgroundRGB.join() }, 0) 0,
            rgba(${ backgroundRGB.join() }, .8) 50%,
            rgba(${ backgroundRGB.join() }, 0) 100%
          ),
          /* row 1 */
          /* layer 12: column 1 */
          ${ TALL_COLUMN_SKELETON },
          /* layer 11: column 2 */
          ${ COLUMN_SKELETON },
          /* layer 10: column 3 */
          ${ COLUMN_SKELETON },
          /* layer 9: column 4 */
          ${ COLUMN_SKELETON },
          /* row 2 */
          /* layer 8: column 1 */
          ${ TALL_COLUMN_SKELETON },
          /* layer 7: column 2 */
          ${ COLUMN_SKELETON },
          /* layer 6: column 3 */
          ${ COLUMN_SKELETON },
          /* layer 5: column 4 */
          ${ COLUMN_SKELETON },
          /* row 3 */
          /* layer 4: column 1 */
          ${ TALL_COLUMN_SKELETON },
          /* layer 3: column 2 */
          ${ COLUMN_SKELETON },
          /* layer 2: column 3 */
          ${ COLUMN_SKELETON },
          /* layer 1: column 4 */
          ${ COLUMN_SKELETON },
          /* layer 0: card bg */
          /* white rectangle that covers whole element */
          linear-gradient(rgb(${ backgroundRGB.join() }) 100%, transparent 0);

        background-size:
          200px 100%,   /* animation */
                        /* row 1 */
          ${ COLUMN_1_WIDTH } ${ TALL_COLUMN_HEIGHT },
          ${ COLUMN_2_WIDTH } ${ COLUMN_HEIGHT },
          ${ COLUMN_3_WIDTH } ${ COLUMN_HEIGHT },
          ${ COLUMN_4_WIDTH } ${ COLUMN_HEIGHT },
                        /* row 2 */
          ${ COLUMN_1_WIDTH } ${ TALL_COLUMN_HEIGHT },
          ${ COLUMN_2_WIDTH } ${ COLUMN_HEIGHT },
          ${ COLUMN_3_WIDTH } ${ COLUMN_HEIGHT },
          ${ COLUMN_4_WIDTH } ${ COLUMN_HEIGHT },
                        /* row 3 */
          ${ COLUMN_1_WIDTH } ${ TALL_COLUMN_HEIGHT },
          ${ COLUMN_2_WIDTH } ${ COLUMN_HEIGHT },
          ${ COLUMN_3_WIDTH } ${ COLUMN_HEIGHT },
          ${ COLUMN_4_WIDTH } ${ COLUMN_HEIGHT },
          100% 100%;    /* background */

        background-position:
          -150% 0,      /* animation */
                        /* row 1 */
          ${ ROW_1_COLUMN_1_POSITION },
          ${ ROW_1_COLUMN_2_POSITION },
          ${ ROW_1_COLUMN_3_POSITION },
          ${ ROW_1_COLUMN_4_POSITION },
                        /* row 2 */
          ${ ROW_2_COLUMN_1_POSITION },
          ${ ROW_2_COLUMN_2_POSITION },
          ${ ROW_2_COLUMN_3_POSITION },
          ${ ROW_2_COLUMN_4_POSITION },
                        /* row 3 */
          ${ ROW_3_COLUMN_1_POSITION },
          ${ ROW_3_COLUMN_2_POSITION },
          ${ ROW_3_COLUMN_3_POSITION },
          ${ ROW_3_COLUMN_4_POSITION },
          0 0;          /* background */

        background-repeat: no-repeat;
        animation: ${ loading } 2.5s infinite;

        @media only screen and (max-width: ${ cardThresholdWidth }px) {
          animation: ${ loadingCard } 2.5s infinite;
          background-position:
            -150% 0,    /* animation */
                        /* row 1 */
            ${ CARD_ROW_1_COLUMN_1_POSITION },
            ${ CARD_ROW_1_COLUMN_2_POSITION },
            ${ CARD_ROW_1_COLUMN_3_POSITION },
            ${ CARD_ROW_1_COLUMN_4_POSITION },
                        /* row 2 */
            ${ CARD_ROW_2_COLUMN_1_POSITION },
            ${ CARD_ROW_2_COLUMN_2_POSITION },
            ${ CARD_ROW_2_COLUMN_3_POSITION },
            ${ CARD_ROW_2_COLUMN_4_POSITION },
                        /* row 3 */
            ${ CARD_ROW_3_COLUMN_1_POSITION },
            ${ CARD_ROW_3_COLUMN_2_POSITION },
            ${ CARD_ROW_3_COLUMN_3_POSITION },
            ${ CARD_ROW_3_COLUMN_4_POSITION },
            0 0;        /* background */
        }

        /* Overrides */
        .salo-table__header-row,
        .salo-table__body-wrapper {
          visibility: hidden;
        }
      `;
    }
    return '';
  } }
`;