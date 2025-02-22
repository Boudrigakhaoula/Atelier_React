import React from 'react';
import notFoundImage from '../../public/notfound.jpg';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
  
      <img src={notFoundImage} alt="Not Found" style={{ width: '1000px', height: '400px' }} />
    </div>
  );
};

export default NotFound;