import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useGetUser from '../features/authentication/useGetUser';
import Spinner from './Spinner';
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, isLoading } = useGetUser();
  const isAuth = user?.role === 'authenticated';
  useEffect(() => {
    if (!isAuth && !isLoading) navigate('/login');
  }, [user, isLoading, navigate]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner></Spinner>
      </FullPage>
    );
  if (isAuth) return children;
};

export default ProtectedRoute;
