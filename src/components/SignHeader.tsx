import React from 'react';

export default function SignHeader() {
  return (
    <div>
      <img
        className="mx-auto h-20 w-auto animate-pulse"
        src="https://avatars.githubusercontent.com/u/8874047?s=280&v=4"
        alt="Workflow"
      />
      <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-500">
        Odyssey 213
      </h1>
      <p className="mt-2 text-center text-gray-600">Continuez votre voyage</p>
    </div>
  );
}
