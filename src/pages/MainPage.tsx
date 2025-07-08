import React, { ReactNode } from 'react';

import Header from '../components/header/Header.tsx';
import CardsWrapper from '../components/main/CardsWrapper.tsx';
import { SearchResp } from '../model/TypesStarWars';
import { ApiService, apiService } from '../services/ApiService';
import { searchQueryStorage } from '../services/LocalStorage';

const PAGE = 1;

class MainPage extends React.Component {
  private service: ApiService = apiService;
  private storage = searchQueryStorage;

  state = {
    charactersData: [],
    isLoading: false,
  };

  async searchData(searchQuery: string): Promise<SearchResp> {
    this.setState({ isLoading: true });

    this.storage.setSearchQuery(searchQuery);

    const res: SearchResp = await this.service.getSeachedData(searchQuery);

    this.setState({ charactersData: res.results });

    this.setState({ isLoading: false });

    return res;
  }

  async componentDidMount(): Promise<void> {
    const searchQuery = this.storage.getSearchQuery();

    this.setState({ isLoading: true });

    if (searchQuery) {
      await this.searchData(searchQuery);

      this.setState({ isLoading: false });
    } else {
      const res: SearchResp = await this.service.getDefaultData(PAGE);

      this.setState({ charactersData: res.results });

      this.setState({ isLoading: false });
    }
  }

  render(): ReactNode {
    return (
      <>
        <Header
          updateCartsCallback={async (searchQuery: string): Promise<void> => {
            await this.searchData(searchQuery);
          }}
        />
        <main className="cards_wrapper">
          {this.state.isLoading ? (
            <div className="spinner" />
          ) : (
            <CardsWrapper cardCharacterData={this.state.charactersData} />
          )}
          <div className="yoda" />
        </main>
      </>
    );
  }
}

export default MainPage;
