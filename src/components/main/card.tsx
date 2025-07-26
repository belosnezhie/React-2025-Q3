import { JSX } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

interface CardProps {
  characterName: string;
  characterURL: string;
}

export const Card = ({
  characterName,
  characterURL,
}: CardProps): JSX.Element => {
  const [searchParameters] = useSearchParams();
  const currentPage = searchParameters.get('page') ?? '1';

  const getID = (): string => {
    const match = /\/people\/(\d+)\//.exec(characterURL);
    return match ? match[1] : '';
  };

  return (
    <>
      <div className="card" data-testid="results_card">
        <NavLink to={`/${getID()}?page=${currentPage}`}>
          Name: {characterName}
        </NavLink>
      </div>
    </>
  );
};
