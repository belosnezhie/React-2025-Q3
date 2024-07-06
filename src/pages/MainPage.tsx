import { Component, ReactNode } from 'react';

import Header from '../components/header/Header.tsx';
import CardsWrapper from '../components/main/CardsWrapper.tsx';
import { SearchResp } from '../model/TypesStarWars';
import { ApiService, apiService } from '../services/ApiService';
import { searchQueryStorage } from '../services/LocalStorage';

class MainPage extends Component {
  private service: ApiService = apiService;
  private storage = searchQueryStorage;

  state = {
    peopleData: [],
  };

  // constructor() {
  //   super();
  //   this.service = apiService;
  //   this.state = { astroData: [] };
  // }

  async searchData(searchQuery: string): Promise<SearchResp> {
    this.storage.setSearchQuery(searchQuery);

    const res: SearchResp = await this.service.getSeachedData(searchQuery);

    this.setState({ peopleData: res.results });

    return res;
  }

  async componentDidMount(): Promise<void> {
    const searchQuery = this.storage.getSearchQuery();

    if (searchQuery) {
      await this.searchData(searchQuery);
    } else {
      const res: SearchResp = await this.service.getDefaultData(1);

      this.setState({ peopleData: res.results });
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
        <CardsWrapper cardPeopleData={this.state.peopleData} />
      </>
    );
  }
}

export default MainPage;
