/* eslint-disable no-console */
import EditConsultingPhotosForm from './';

export const Empty = {
  component: EditConsultingPhotosForm,
  props: {
    initialValues: { country: 'US', images: [] },
    stripeConnected: false,
    onImageUpload: values => {
      console.log(`onImageUpload with id (${values.id}) and file name (${values.file.name})`);
    },
    onSubmit: values => {
      console.log('Submit EditConsultingPhotosForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save photos',
    updated: false,
    ready: false,
    updateInProgress: false,
    disabled: false,
    onUpdateImageOrder: imageOrder => {
      console.log('onUpdateImageOrder with new imageOrder:', imageOrder);
    },
    onRemoveImage: imageId => {
      console.log('remove image:', imageId);
    },
  },
  group: 'forms',
};
