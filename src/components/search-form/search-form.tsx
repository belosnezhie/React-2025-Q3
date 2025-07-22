import React, { ReactNode } from 'react';

import './search-form.css';
import { SearchQueryStorage } from '../../services/local-storage';

interface SearchFormProps {
  storage: SearchQueryStorage;
  updateCartsCallback: (searchQuery: string) => Promise<void>;
}

interface SearchFormState {
  currentInputValue: string;
}

class SearchForm extends React.Component<SearchFormProps, SearchFormState> {
  private storage: SearchQueryStorage;

  constructor(props: SearchFormProps) {
    super(props);
    this.storage = this.props.storage;
    this.state = {
      currentInputValue: this.storage.getSearchQuery(),
    };
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ currentInputValue: event.target.value });
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = formData.get('search');

    if (typeof data !== 'string') {
      throw new TypeError('Invalid input');
    }

    const searchQuery = data.trim();

    this.storage.setSearchQuery(searchQuery);

    await this.props.updateCartsCallback(searchQuery);
  }

  render(): ReactNode {
    return (
      <>
        <form
          className="search_form"
          onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
            await this.handleSubmit(event);
          }}
        >
          <input
            className="search_input"
            name="search"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              this.handleChange(event);
            }}
            type="text"
            value={this.state.currentInputValue}
          />
          <input
            className="submit_input"
            data-testid="submit_input"
            type="submit"
            value="Search"
          />
        </form>
      </>
    );
  }
}

export default SearchForm;
