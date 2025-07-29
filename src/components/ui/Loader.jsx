import React from 'react';
import { PropagateLoader } from 'react-spinners';

export default function Loader({ loading = true }) {
    if (!loading) return null;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <PropagateLoader 
        loading={loading} 
        color="#9CA3AF" // Tailwind green-500
        size={15} 
      />
    </div>
  );
}
