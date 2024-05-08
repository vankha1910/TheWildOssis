import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useGetListSetting from './useGetListSetting';
import Spinner from '../../ui/Spinner';
import useUpdateSetting from './useUpdateSetting';
function UpdateSettingsForm() {
  const { updateSetting, isUpdating } = useUpdateSetting();
  const {
    settings: {
      breakfast_price,
      max_booking_length,
      max_guest_per_booking,
      min_booking_length,
    } = {},
    isLoading,
  } = useGetListSetting();
  const handleUpdate = (field, value) => {
    if (!value) return;
    updateSetting({ [field]: value });
  };
  if (isLoading || isUpdating) return <Spinner />;
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          defaultValue={min_booking_length}
          onBlur={(e) => handleUpdate('min_booking_length', e.target.value)}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          defaultValue={max_booking_length}
          onBlur={(e) => handleUpdate('max_booking_length', e.target.value)}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          defaultValue={max_guest_per_booking}
          onBlur={(e) => handleUpdate('max_guest_per_booking', e.target.value)}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          defaultValue={breakfast_price}
          onBlur={(e) => handleUpdate('breakfast_price', e.target.value)}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
