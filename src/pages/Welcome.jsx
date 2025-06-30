import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFade(true);
    const timer = setTimeout(() => {
      navigate('/user'); // or to a login page
    }, 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex items-center justify-center h-screen transition-opacity duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}`}>
      <h1 className="text-3xl font-bold text-center">Welcome to Restaurant Ordering App</h1>
    </div>
  );
};

export default Welcome;
