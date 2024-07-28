export interface SearchResp {
  count: number;
  results: PeopleSearchResp[];
}

export interface PeopleSearchResp {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}
