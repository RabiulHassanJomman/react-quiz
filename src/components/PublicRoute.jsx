import React from 'react'
import { UseAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export default function PublicRoute({children}) {
  const {currentUser} = UseAuth();
  const location = useLocation();

  if(currentUser){
    return <Navigate to = "/" state = {{from: location}} replace/>
  }
  return children;
}
