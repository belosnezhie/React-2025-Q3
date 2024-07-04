export interface AstroResp {
  page: {
    pageNumber: number;
    pageSize: number;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
  };
  sort: {
    clauses: [];
  };
  astronomicalObjects: SingleAstroObjectResp[];
}

export interface AstroObjectResp {
  astronomicalObjects: SingleAstroObjectResp[];
}

export interface SingleAstroObjectResp {
  uid: string;
  name: string;
  astronomicalObjectType: string;
  location: Location | null;
}

export interface Location {
  uid: string;
  name: string;
}
