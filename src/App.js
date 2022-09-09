import './App.css';

import { useSelector } from 'react-redux';

function App() {
  const msg = useSelector((state) => state.Auth.sample);

  return <div className='App'>{msg}</div>;
}

export default App;
