/**
 * ATOMS
 *
 * Smallest unit of design system. These are single elements that
 * are usaually grouped with other items to form functional unit
 */

// Typography -> start
export { default as H1 } from './Typography/H1';
export { default as H2 } from './Typography/H2';
export { default as H3 } from './Typography/H3';
export { default as H4 } from './Typography/H4';
export { default as Ol } from './Typography/Ol';
export { default as P } from './Typography/P';
export { default as Ul } from './Typography/Ul';
// Typography -> end

// Grid -> start
export { default as Column } from './Atoms/Column';
export { default as Container } from './Atoms/Container';
export { default as Divider } from './Atoms/Divider';
export { default as Row } from './Atoms/Row';
// Grid -> end

export { default as Avatar } from './Atoms/Avatar';


/** MOLECULES
 *
 * Items that consist of a number of atoms that join together to form a usable unit
 * e.g. a search field which might have an input field, a label and a search button
 */
export { default as Accordion, AccordionItem } from './Molecules/Accordion';
export { default as Breadcrumb } from './Molecules/Breadcrumb';
export { default as Button } from './Molecules/Button';
export { default as Card } from './Molecules/Card';
export { default as Drop } from './Molecules/Drop';
export { default as FlyOut, FlyOutButton, FlyOutLink } from './Molecules/FlyOut';
export { default as Loader } from './Molecules/Loader';
export { default as Modal } from './Molecules/Modal';
export { default as Pagination } from './Molecules/Pagination';
export { default as Pill } from './Molecules/Pill';
export { default as Selector } from './Molecules/Selector';
export { default as Stepper } from './Molecules/Stepper';
export { default as Switch } from './Molecules/Switch';

/** FORMS
 *
 * Any components or molecules that make up from input methods
 */
export { default as CheckBox, CheckBoxGroup } from './Forms/CheckBox';
export { default as DatePicker } from './Forms/DatePicker';
export { default as Input } from './Forms/Input';
export { default as Range } from './Forms/Range';
export { default as ReadOnly } from './Forms/ReadOnly';
export { default as Select } from './Forms/Select';
export { default as TextArea } from './Forms/TextArea';
export { default as TypeAhead } from './Forms/TypeAhead';
export { default as Upload } from './Forms/Upload';
export { default as useForm } from './Forms/useForm';

/**
 * ORGANISMS
 *
 * These are formed of multiple molecules to fulfil a set purpose or sometimes refferred to as
 * patterns. e.g. you might have a header bar that contains the search molecule from the molecule
 * definition as well as maybe a user avatar with a drop down action menu. Each of these items can
 * be used elsewhere or in isolation but by bringing them together we deliver a reusable organism
 * formed of multiple re-usable and independently updatable atoms and molecules
 */
export { default as Table } from './Organisms/Table';

/**
 * HELPERS & GLOBALS
  *
  * Some helpers and constants for use in the applications
  */
export { default as GlobalStyles } from './Global/GlobalStyles';
export { default as Normalise } from './Global/Normalise';
export { default as Theme } from './Global/Theme';
export { getTokensServer, getTokensClient, tokenExpired } from './helpers/auth';
export { getBreakpoint } from './helpers/breakpoints';
export { colours, boxShadow } from './helpers/colours';
export { ENV, isBrowser } from './helpers/environments';
export { dateRangeValidation, phoneRegExp, emailRegExp } from './helpers/form';

/**
 * ALERT
 *
 * A set of components, helpers and providers for managing alerts across
 * all of the front end applications
 */
export { default as AlertProvider } from './Alerts/AlertProvider';
export { default as AlertConsumer } from './Alerts/AlertConsumer';
export { default as Alert } from './Alerts/Alert';
export { default as withAlerts } from './Alerts/withAlerts';

/**
 * APOLLO
 *
 * Functionality and components related to the use of Apollo client on the front end
 */
export {
  GraphQLUrl,
  isError,
  isLoading,
  getRequestStatus,
  parseApolloError
} from './Apollo/helpers';
export { default as ApolloError } from './Apollo/Error';

/**
 * AUTH
 *
 * A set of components, helpers and providers for managing authentication across
 * all of the front end applications
 */
export { default as AuthProvider } from './Auth/AuthProvider';
export { default as AuthRoute } from './Auth/AuthRoute';
export { default as AuthWrapper } from './Auth/AuthWrapper';
export { Consumer as AuthConsumer } from './Auth/auth.context';
export { default as withAuth } from './Auth/withAuth';