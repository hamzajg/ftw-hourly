/* eslint-disable no-console */
import EditConsultingPricingForm from './';

export const Empty = {
  component: EditConsultingPricingForm,
  props: {
    onSubmit: values => {
      console.log('Submit EditConsultingPricingForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save price',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
  },
  group: 'forms',
};
