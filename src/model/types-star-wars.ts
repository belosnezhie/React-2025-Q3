export interface CharacterSearchResponse {
  birth_year?: string;
  eye_color?: string;
  gender?: string;
  hair_color?: string;
  height?: string;
  mass?: string;
  name: string;
  skin_color?: string;
  url: string;
}

export interface SearchResponse {
  count: number;
  results: CharacterSearchResponse[];
}

export class DefaultSearchResp implements SearchResponse {
  count = 1;
  results: CharacterSearchResponse[];

  constructor() {
    this.results = [{ name: '', url: '' } satisfies CharacterSearchResponse];
  }
}
