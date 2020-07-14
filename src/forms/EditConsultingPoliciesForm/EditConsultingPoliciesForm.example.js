/* eslint-disable no-console */
import EditConsultingPoliciesForm from './';

export const Empty = {
  component: EditConsultingoliciesForm,
  props: {
    publicData: {},
    onSubmit: values => {
      console.log('Submit EditConsultingPoliciesForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save rules',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
  },
  group: 'forms',
};
