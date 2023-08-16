import React from 'react';
import '@ionic/react/css/core.css';
import GestionProduct from './GestionProduct';
import { setupIonicReact } from '@ionic/react';

setupIonicReact();
function App() {
  return (
    <div>
   <GestionProduct/>
    </div>

  );
}

export default App;