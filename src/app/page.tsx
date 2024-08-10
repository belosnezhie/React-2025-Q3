// import { useState } from 'react';

// import appStyles from '../App.module.css';
// import DetailedSection from '../components/detailesSection/DetailedSection';
// import { Flyout } from '../components/flyout/Flyout';

import Header from '../components/header/Header';
import pageStyles from '../components/main/Main.module.css';
import ResultsList from '../components/main/ResultsList';
import Pagination from '../components/pagination/Pagination';
import Wrapper from '../components/Wrapper';

import { getDefaultData } from './api/api';

export type PageProps = {
  params: Params;
  searchParams: SearchParams;
};

export type Params = {
  slug: string;
};

export type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export default async function Page(pageProps: PageProps) {
  const data = await getDefaultData(pageProps.searchParams);
  const MAX_PER_PAGE: number = 10;
  // const [isDetailedShown, setDetailed] = useState<boolean>(false);

  // const handleMainClick = (event: React.MouseEvent<HTMLDivElement>) => {
  //   const target = event.target as HTMLElement;

  //   let isCard = false;

  //   if (
  //     (target.parentElement &&
  //       target.parentElement.classList.contains('card')) ||
  //     target.classList.contains('card')
  //   ) {
  //     isCard = true;
  //   }

  //   if (pageProps.searchParams.detailed && !isCard) {
  //     // await router.push(`/?page=${currentPage}&search=${query}`);
  //     // setDetailed(false);
  //   }
  // };

  return (
    <>
      <Wrapper>
        <div /*className={isDetailedShown ? appStyles.pageWrapper : ''} */>
          <div
            // className={`${'light'} ${/* isDetailedShown ? appStyles.wrapper : ''*/}`}
            // onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            //   handleMainClick(event);
            // }}
            data-testid="wrapper"
          >
            <Header />
            <main className={pageStyles.page}>
              <section className={pageStyles.resultsSection}>
                <ResultsList listData={data} />
              </section>
              <Pagination pagesCount={Math.ceil(data.count / MAX_PER_PAGE)} />
              <div className={pageStyles.yoda} />
            </main>
          </div>
          {/* {isDetailedShown ? (
          <DetailedSection destroyCallback={setDetailed} />
        ) : null} */}
        </div>
        {/* {favCharactersCount ? <Flyout /> : null} */}
      </Wrapper>
    </>
  );
}
