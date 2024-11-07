import React from 'react';
import { AuthProvider } from './context/AuthProvider';
import AppNavigation from './navigate/AppNavigation';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}
