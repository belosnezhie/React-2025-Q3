import React, { ReactNode, createRef } from 'react';

import './search-form.css';
import { searchQueryStorage } from '../../services/local-storage';

interface SearchFormProps {
  updateCartsCallback: (searchQuery: string) => Promise<void>;
}

class SearchForm extends React.Component<SearchFormProps> {
  state = {
    currentInputValue: searchQueryStorage.getSearchQuery(),
  };

  inputRef = createRef<HTMLInputElement>();

  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = formData.get('search');

    if (typeof data !== 'string') {
      throw new Error('Invalid input');
    }

    const searchQuery = data.trim() || '';

    searchQueryStorage.setSearchQuery(searchQuery);

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
