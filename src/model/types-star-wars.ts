export interface SearchResp {
  count: number;
  results: CharacterSearchResp[];
}

export interface CharacterSearchResp {
  name: string;
  height?: string;
  mass?: string;
  hair_color?: string;
  skin_color?: string;
  eye_color?: string;
  birth_year?: string;
  gender?: string;
}

export class DefaultSearchResp implements SearchResp {
  count: number;
  results: CharacterSearchResp[];
  constructor() {
    this.count = 0;
    this.results = [{} as CharacterSearchResp];
  }
}
