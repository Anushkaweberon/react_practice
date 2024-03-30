import React, { useState, useEffect } from 'react';
import { MyComponent } from './MYComponent';

const App = () => {
  const [age, setAge] = useState(10);

  console.log('Setting initial state');

  useEffect(() => {
    console.log('Component mounted');

    const timeout = setTimeout(() => {
      setAge(20);
      console.log('Age set to 20 after timeout');
    }, 20000);

    return () => {
      console.log('Component unmounted');
      clearTimeout(timeout);
    };
  }, []);
  

  useEffect(() => {
    console.log('Age updated:', age);
  }, [age]);

  return (
    <div>
      <p>Age: {age}</p>
      <MyComponent/>
    </div>
  );
};

export default App;
