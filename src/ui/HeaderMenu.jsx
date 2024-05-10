import React from 'react';
import styled from 'styled-components';
import UserIcon from './UserIcon';
import DarkModeToggle from './DarkModeToggle';
import Logout from '../features/authentication/Logout';
const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;
const HeaderMenu = () => {
  return (
    <StyledHeaderMenu>
      <li>
        <UserIcon />
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
