import { SliceData } from '../../model/Model';
import './SubmitedItemCard.css';

interface SubmitedItemCardProps {
  cardData: SliceData;
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
      <img src={cardData.encodedImage} className="image"></img>
      <p>Country: {cardData.country}</p>
    </div>
  );
};

export default SubmitedItemCard;
