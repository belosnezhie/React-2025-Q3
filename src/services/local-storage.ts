export class SearchQueryStorage {
  private key = 'User_JSFE2023Q4';

  getSearchQuery(): string {
    const searchQuery = localStorage.getItem(this.key);

    return searchQuery ?? '';
  }

  setSearchQuery(searchQuery: string): void {
    localStorage.setItem(this.key, searchQuery);
  }
}

export const searchQueryStorage = new SearchQueryStorage();
