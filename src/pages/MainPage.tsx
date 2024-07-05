import { Component, ReactNode } from 'react';

import Header from '../components/header/Header.tsx';
import CardsWrapper from '../components/main/CardsWrapper.tsx';
import { SingleAstroObjectResp, SingleAstroResp } from '../model/Types.tsx';
import { ApiService, apiService } from '../services/ApiService';

class MainPage extends Component {
  private service: ApiService = apiService;

  state = {
    astroData: [],
  };

  // constructor() {
  //   super();
  //   this.service = apiService;
  //   this.state = { astroData: [] };
  // }

  async searchData(searchQuery: string): Promise<SingleAstroResp> {
    const res: SingleAstroResp = await this.service.getSeachedData(searchQuery);

    if (res.astronomicalObjects.length === 0) {
      const singleAstroObjArr = [];

      singleAstroObjArr.push(res.astronomicalObject);
      this.setState({ astroData: singleAstroObjArr });
    } else {
      this.setState({ astroData: res.astronomicalObjects });
    }

    return res;
  }

  async componentDidMount(): Promise<void> {
    const res: SingleAstroObjectResp[] = await this.service.getDefaultData();

    this.setState({ astroData: res });
  }

  render(): ReactNode {
    return (
      <>
        <Header
          updateCartsCallback={async (searchQuery: string): Promise<void> => {
            await this.searchData(searchQuery);
          }}
        />
        <CardsWrapper cardAstroData={this.state.astroData} />
      </>
    );
  }
}

export default MainPage;
