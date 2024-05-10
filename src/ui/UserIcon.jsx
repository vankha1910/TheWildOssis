import React from 'react';
import ButtonIcon from './ButtonIcon';
import { HiOutlineUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const UserIcon = () => {
  const navigate = useNavigate();
  return (
    <ButtonIcon onClick={() => navigate('/account')}>
      <HiOutlineUser />
    </ButtonIcon>
  );
};

export default UserIcon;
