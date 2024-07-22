import { useState } from 'react';

export const FavoritesButton = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChenge = () => {
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        className="fav_button"
        checked={checked}
        onChange={handleChenge}
      ></input>
    </>
  );
};
