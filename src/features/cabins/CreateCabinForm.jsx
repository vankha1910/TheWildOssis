import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: {},
  });
  const { errors } = formState;

  const { createCabin, isCreatingCabin } = useCreateCabin();
  const onSubmit = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    const refactorData = {
      name: data?.name,
      description: data?.description,
      image,
      max_capacity: data?.maxCapacity,
      regular_price: data?.regularPrice,
      discount: data?.discount,
    };
    console.log(refactorData);

    createCabin(refactorData);
  };
  console.log(errors);
  return (
    <Form onSubmit={handleSubmit(onSubmit)} type='modal'>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            validate: (value) => {
              console.log(value);
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={errors?.description?.message}
      >
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
