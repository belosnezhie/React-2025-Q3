import { Component, ReactNode } from 'react';

import './SearchForm.css';

interface SearchFormProps {
  updateCartsCallback: (searchQuery: string) => Promise<void>;
}

class SearchForm extends Component<SearchFormProps> {
  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const target: HTMLFormElement = event.target as HTMLFormElement;
    const input = target.elements[0] as HTMLInputElement;
    const searchQuery: string = input.value.trim();

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
          <input className="search_input" type="text"></input>
          <input className="submit_input" type="submit" value="Search"></input>
        </form>
      </>
    );
  }
}

export default SearchForm;
