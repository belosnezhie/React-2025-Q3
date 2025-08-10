import React from 'react';
import { twMerge } from 'tailwind-merge';

export class FallbackUIPage extends React.Component {
  render(): React.ReactNode {
    return (
      <div
        className={twMerge(
          'min-w-full min-h-screen',
          'flex justify-center items-center',
          'bg-error',
        )}
      >
        <h2>Oops! Something went wrong. Please try again later.</h2>
      </div>
    );
  }
}
