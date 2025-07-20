import React, { ReactNode } from 'react';

import './search-form.css';
import { SearchQueryStorage } from '../../services/local-storage';

interface SearchFormProps {
  updateCartsCallback: (searchQuery: string) => Promise<void>;
  storage: SearchQueryStorage;
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

  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = formData.get('search');

    if (typeof data !== 'string') {
      throw new Error('Invalid input');
    }

    const searchQuery = data.trim();

    this.storage.setSearchQuery(searchQuery);

    await this.props.updateCartsCallback(searchQuery);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ currentInputValue: event.target.value });
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
            name="search"
            className="search_input"
            type="text"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              this.handleChange(event);
            }}
            value={this.state.currentInputValue}
          ></input>
          <input
            className="submit_input"
            type="submit"
            value="Search"
            data-testid="submit_input"
          ></input>
        </form>
      </>
    );
  }
}

export default SearchForm;
