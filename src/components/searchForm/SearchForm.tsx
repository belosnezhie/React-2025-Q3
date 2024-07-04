import { Component, ReactNode } from 'react';

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
          <input className="submit_input" type="submit"></input>
        </form>
      </>
    );
  }
}

export default SearchForm;
