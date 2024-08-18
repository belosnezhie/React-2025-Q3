import './ShowPasswordInput.css';

interface ShowPasswordInputProps {
  callback: () => void;
}

const ShowPasswordInput = ({ callback }: ShowPasswordInputProps) => {
  return (
    <input
      className="show_password_input"
      type="checkbox"
      onChange={callback}
    ></input>
  );
};

export default ShowPasswordInput;
