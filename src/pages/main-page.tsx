import React, { ReactNode } from 'react';

import Header from '../components/header/header.tsx';
import CardsWrapper from '../components/main/cards-wrapper.tsx';
import { ApiService } from '../services/api-service';
import { searchQueryStorage } from '../services/local-storage';

const PAGE = 1;

interface MainPageProps {
  service: ApiService;
}

class MainPage extends React.Component<MainPageProps> {
  private service: ApiService;
  private storage = searchQueryStorage;

  constructor(props: MainPageProps) {
    super(props);
    this.service = this.props.service;
  }

  state = {
    charactersData: [],
    isLoading: false,
    error: null,
  };

  async searchData(searchQuery: string): Promise<void> {
    this.setState({ isLoading: true, error: null });

    try {
      const res = await this.service.getSeachedData(searchQuery);

      this.setState({ charactersData: res.results });
    } catch (err) {
      this.setState({
        error: err instanceof Error ? err.message : 'Unknown error',
        charactersData: [],
      });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async componentDidMount(): Promise<void> {
    const searchQuery = this.storage.getSearchQuery();

    this.setState({ isLoading: true, error: null });

    try {
      let res;

      if (searchQuery) {
        res = await this.service.getSeachedData(searchQuery);
      } else {
        res = await this.service.getDefaultData(PAGE);
      }
      this.setState({ charactersData: res.results });
    } catch (err) {
      this.setState({
        error: err instanceof Error ? err.message : 'Unknown error',
        charactersData: [],
      });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render(): ReactNode {
    const { isLoading, charactersData, error } = this.state;

    return (
      <>
        <Header
          updateCartsCallback={async (searchQuery: string): Promise<void> => {
            await this.searchData(searchQuery);
          }}
        />
        <main className="cards_wrapper">
          {isLoading ? (
            <div
              className="spinner"
              data-testid="spinner"
              aria-label="spinner"
            />
          ) : error ? (
            <div data-testid="error">
              <p>Something went wrong: {error}</p>
            </div>
          ) : (
            <CardsWrapper cardCharacterData={charactersData} />
          )}
          <div className="yoda" />
        </main>
      </>
    );
  }
}

export default MainPage;
