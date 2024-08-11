'use client';
import { useRouter, useSearchParams } from 'next/navigation';

import { useTheme } from '../hooks/ContextHooks';
import { useAppSelector } from '../hooks/StateHooks';
import { type RootState } from '../store/Store';

import { Flyout } from './flyout/Flyout';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const favCharactersCount = useAppSelector(
    (state: RootState) => state.favoriteCharacters.favCharacters.length,
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('search') ? searchParams.get('search') : '';
  const page = searchParams.get('page') ? searchParams.get('page') : '';

  const handleMainClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    console.log(target);

    if (
      target.id === 'detailedResults' ||
      target.parentElement?.id === 'detailedResults'
    ) {
      return;
    }

    let isCard = false;

    if (
      (target.parentElement &&
        target.parentElement.classList.contains('card')) ||
      target.classList.contains('card')
    ) {
      isCard = true;
    }

    if (searchParams.get('detailed') && !isCard) {
      router.push(`?page=${page}&search=${query}`);
    }
  };

  return (
    <div className={theme} onClick={handleMainClick}>
      {children}
      {favCharactersCount ? <Flyout /> : null}
    </div>
  );
};

export default Wrapper;
