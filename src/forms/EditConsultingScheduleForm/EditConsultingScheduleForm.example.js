/* eslint-disable no-console */
import EditConsultingScheduleForm from './';

export const Empty = {
  component: EditConsultingScheduleForm,
  props: {
    onSubmit: values => {
      console.log('Submit EditConsultingScheduleForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save location',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
  },
  group: 'forms',
};
