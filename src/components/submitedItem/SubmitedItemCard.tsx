import { InputsData } from '../../model/Model';
import './SubmitedItemCard.css';

interface SubmitedItemCardProps {
  cardData: InputsData;
  isLast?: boolean;
}

const SubmitedItemCard = ({ cardData, isLast }: SubmitedItemCardProps) => {
  return (
    <div className={`card ${isLast ? 'last' : ''}`}>
      <p>Form type:</p>
      <p>Name: {cardData.name}</p>
      <p>Age: {cardData.age}</p>
      <p>Email: {cardData.email}</p>
      <p>Password: {cardData.password}</p>
      <p>Gender: {cardData.gender}</p>
      <p>Image: {cardData.image}</p>
      <p>Country: {cardData.country}</p>
    </div>
  );
};

export default SubmitedItemCard;
