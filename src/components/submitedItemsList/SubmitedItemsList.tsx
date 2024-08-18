import { useAppSelector } from '../../hooks/StateHooks';
import { RootState } from '../../store/Store';
import SubmitedItemCard from '../submitedItem/SubmitedItemCard.tsx';

import './SubmitedItemsList.css';

const SubmitedItemsList = () => {
  const data = useAppSelector((state: RootState) => state.submittedData.data);

  return (
    <div className="list">
      {data.map((_, index) => {
        return (
          <SubmitedItemCard
            cardData={data[data.length - index - 1]}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default SubmitedItemsList;
