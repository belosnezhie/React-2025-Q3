import { Component, ReactNode } from 'react';

import './App.css';
import MainPage from './pages/MainPage.tsx';

class App extends Component {
  render(): ReactNode {
    return (
      <>
        <MainPage />
      </>
    );
  }
}

export default App;

// export default function App() {
//   return (
//     <>
//       <MainPage />
//     </>
//   );
// }
