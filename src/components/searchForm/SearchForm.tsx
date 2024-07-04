import { Component, ReactNode } from 'react';

import './SearchForm.css';

class SearchForm extends Component {
  handleSubmit() {}

  render(): ReactNode {
    return (
      <>
        <form
          className="search_form"
          onSubmit={() => {
            this.handleSubmit();
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
