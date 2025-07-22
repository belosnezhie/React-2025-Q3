import React from 'react';

class ErrorButton extends React.Component {
  state = {
    wasClicked: false,
  };

  handleClick(): void {
    this.setState({ wasClicked: true });
  }

  render(): React.ReactNode {
    if (this.state.wasClicked) {
      throw new Error('Error button was clicked.');
    } else {
      return (
        <button
          className="throw_error_button"
          data-testid="error_button"
          onClick={() => {
            this.handleClick();
          }}
          type="button"
        >
          Generate error
        </button>
      );
    }
  }
}

export default ErrorButton;
