import { Component, ReactNode } from 'react';

import Header from '../components/header/Header.tsx';
import CardsWrapper from '../components/main/CardsWrapper.tsx';
import { SearchResp } from '../model/TypesStarWars';
import { ApiService, apiService } from '../services/ApiService';

class MainPage extends Component {
  private service: ApiService = apiService;

  state = {
    peopleData: [],
  };

  // constructor() {
  //   super();
  //   this.service = apiService;
  //   this.state = { astroData: [] };
  // }

  async searchData(searchQuery: string): Promise<SearchResp> {
    const res: SearchResp = await this.service.getSeachedData(searchQuery);

    // if (res.results.length === 0) {
    //   const singleAstroObjArr = [];

    //   singleAstroObjArr.push(res.astronomicalObject);
    //   this.setState({ peopleData: singleAstroObjArr });
    // } else {
    //   this.setState({ peopleData: res.astronomicalObjects });
    // }

    this.setState({ peopleData: res.results });

    return res;
  }

  async componentDidMount(): Promise<void> {
    const res: SearchResp = await this.service.getDefaultData(1);

    this.setState({ peopleData: res.results });
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
