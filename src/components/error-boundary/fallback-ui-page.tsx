import React from 'react';

import './fallback-ui-page.css';

export class FallbackUIPage extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="fallbackUI_page">
        <h2>Oops! Something went wrong. Please try again later.</h2>
      </div>
    );
  }
}
