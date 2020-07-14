import { fakeIntl } from '../../util/test-data';
import EditConsultingAvailabilityExceptionForm from './EditConsultingAvailabilityExceptionForm';

const WEEKDAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export const Example = {
  component: EditConsultingAvailabilityExceptionForm,
  props: {
    formId: 'EditConsultingAvailabilityExceptionFormExample',
    availabilityExceptions: [],
    listingTitle: 'Yoga guru',
    weekdays: WEEKDAYS,
    onSubmit(values) {
      console.log('submit with values:', values);
    },
    fetchErrors: {},
    intl: fakeIntl,
    timeZone: 'Etc/UTC',
    updated: false,
    updateInProgress: false,
  },
  group: 'forms',
};
