import { SliceData } from '../../model/Model';
import './SubmitedItemCard.css';

interface SubmitedItemCardProps {
  cardData: SliceData;
}

const SubmitedItemCard = ({ cardData }: SubmitedItemCardProps) => {
  return (
    <div className="card">
      <p>Form type: {cardData.formType}</p>
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
