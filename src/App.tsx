import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NotFoundPage from './pages/404Page/404Page.tsx';
import MainPage from './pages/main/MainPage.tsx';
import ReactHookFormPage from './pages/reactHookForm/ReactHookFormPage.tsx';
import UncontrolledFormPage from './pages/uncontrolledFormPage/UncontrolledFormPage.tsx';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/reactHookForm" element={<ReactHookFormPage />} />
          <Route path="/uncontrolledForm" element={<UncontrolledFormPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
