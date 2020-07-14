/* eslint-disable no-console */
import EditConsultingDescriptionForm from './';

export const Empty = {
  component: EditConsultingDescriptionForm,
  props: {
    onSubmit: values => {
      console.log('Submit EditConsultingDescriptionForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save description',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
  },
  group: 'forms',
};
