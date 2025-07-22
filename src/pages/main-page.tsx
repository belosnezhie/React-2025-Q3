import React, { ReactNode } from 'react';

import Header from '../components/header/header';
import CardsWrapper from '../components/main/cards-wrapper';
import { ApiService } from '../services/api-service';
import { searchQueryStorage } from '../services/local-storage';

const PAGE = 1;

interface MainPageProps {
  service: ApiService;
}

class MainPage extends React.Component<MainPageProps> {
  state = {
    charactersData: [],
    error: null,
    isLoading: false,
  };
  private service: ApiService;

  private storage = searchQueryStorage;

  constructor(props: MainPageProps) {
    super(props);
    this.service = this.props.service;
  }

  async componentDidMount(): Promise<void> {
    const searchQuery = this.storage.getSearchQuery();

    this.setState({ error: null, isLoading: true });

    try {
      const response = await (searchQuery
        ? this.service.getSeachedData(searchQuery)
        : this.service.getDefaultData(PAGE));
      this.setState({ charactersData: response.results });
    } catch (error) {
      this.setState({
        charactersData: [],
        error: error instanceof Error ? error : 'Unknown error',
      });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render(): ReactNode {
    const { charactersData, error, isLoading } = this.state;

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
              aria-label="spinner"
              className="spinner"
              data-testid="spinner"
            />
          ) : (
            <CardsWrapper cardCharacterData={charactersData} error={error} />
          )}
          <div className="yoda" />
        </main>
      </>
    );
  }

  async searchData(searchQuery: string): Promise<void> {
    this.setState({ error: null, isLoading: true });

    try {
      const response = await this.service.getSeachedData(searchQuery);

      this.setState({ charactersData: response.results });
    } catch (error) {
      this.setState({
        charactersData: [],
        error: error instanceof Error ? error : 'Unknown error',
      });
    } finally {
      this.setState({ isLoading: false });
    }
  }
}

export default MainPage;
