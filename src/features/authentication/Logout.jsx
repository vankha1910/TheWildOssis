import React from 'react';
import ButtonIcon from '../../ui/ButtonIcon';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import useLogout from './useLogout';

const Logout = () => {
  const { logout, isLoading } = useLogout();
  return (
    <ButtonIcon
      onClick={() => {
        console.log('logout');
        logout();
      }}
      disabled={isLoading}
    >
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
};

export default Logout;
