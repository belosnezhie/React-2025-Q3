import './MainPage.css';
import Header from '../../components/header/Header.tsx';
import SubmitedItemsList from '../../components/submitedItemsList/SubmitedItemsList.tsx';
import { useAppSelector } from '../../hooks/StateHooks';
import { RootState } from '../../store/Store';

const MainPage = () => {
  const data = useAppSelector((state: RootState) => state.submittedData.data);

  return (
    <>
      <Header />
      <main className="page mainPage">
        {data.length === 0 ? null : <SubmitedItemsList />}
      </main>
    </>
  );
};

export default MainPage;
