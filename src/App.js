import { Toaster } from 'react-hot-toast';
import './App.css';
import MyRouter from './routes/MyRouter';



function App() {
  return (
    <>
      <MyRouter/>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;