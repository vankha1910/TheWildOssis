import React from 'react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
const AddCabin = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens='add-cabin'>
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name='add-cabin'>
          <CreateCabinForm></CreateCabinForm>
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddCabin;
