import { Component, ReactNode } from 'react';

import Header from '../components/header/Header.tsx';
import CardsWrapper from '../components/main/CardsWrapper.tsx';
import { SingleAstroObjectResp } from '../model/Types.tsx';
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

  async componentDidMount(): Promise<void> {
    const res: SingleAstroObjectResp[] = await this.service.getDefaultData();

    this.setState({ astroData: res });
  }

  render(): ReactNode {
    return (
      <>
        <Header />
        <CardsWrapper data={this.state.astroData} />
      </>
    );
  }
}

export default MainPage;
