import { useAppSelector } from '../../hooks/StateHooks';
import { RootState } from '../../store/Store';
import SubmitedItemCard from '../submitedItem/SubmitedItemCard.tsx';

import './SubmitedItemsList.css';

const SubmitedItemsList = () => {
  const data = useAppSelector((state: RootState) => state.submittedData.data);

  return (
    <div className="list">
      {data.map((item, index) => {
        const isLast = index === data.length - 1 ? true : false;

        return <SubmitedItemCard cardData={item} isLast={isLast} key={index} />;
      })}
    </div>
  );
};

export default SubmitedItemsList;
