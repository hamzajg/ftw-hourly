import EditListingFeaturesForm from './EditListingFeaturesForm';

const NAME = 'yogaStyles';

const initialValueArray = ['hatha', 'vinyasa', 'yin'];
const initialValues = { [NAME]: initialValueArray };

const filterConfig = [
  {
    id: 'yogaStyles',
    label: 'Yoga styles',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_yogaStyles'],
    config: {
      mode: 'has_all',
      options: [
        { key: 'pregnancy_postpartum', label: 'Pregnancy & Postpartum' },
        { key: 'breastfeeding', label: 'Breastfeeding' },
        { key: 'sleep_coaching', label: 'Sleep Coaching' },
        { key: 'mental_health', label: 'Mental Health' },
        { key: 'physical_therapy', label: 'Physical Therapy' },
      ],
    },
  },
];

export const YogaStyles = {
  component: EditListingFeaturesForm,
  props: {
    name: NAME,
    onSubmit: values => console.log('EditListingFeaturesForm submit:', values),
    initialValues: initialValues,
    saveActionMsg: 'Save yoga styles',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
    filterConfig,
  },
  group: 'forms',
};
