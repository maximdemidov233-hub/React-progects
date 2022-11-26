import React, { useState } from 'react';
import Timer from './Timer';

function App() {
  const [isClicker, setIsClicker] = useState(false);

  return (
    <div className="App">
      <h2>React clicker</h2>
      <button onClick={() => setIsClicker(!isClicker)}>Toggle clicker</button>
      {isClicker && <Timer />}

    </div>
  );
}



export default App;


