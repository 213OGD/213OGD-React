import React from 'react';

export default function Loader(): JSX.Element {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <img
          className="mx-auto h-20 w-auto animate-ping"
          src="https://avatars.githubusercontent.com/u/8874047?s=280&v=4"
          alt="Workflow"
        />
      </div>
    </>
  );
}
