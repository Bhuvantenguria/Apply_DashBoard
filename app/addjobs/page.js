import React from 'react';
import CreateJob from '../Component/CreateJob';

function AddJob() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 flex flex-col items-center justify-start p-4 pt-8">
      <header className="w-full max-w-3xl mb-6">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg text-center">
          Add New Job
        </h1>
      </header>
      <main className="w-full max-w-3xl">
        <CreateJob />
      </main>
    </div>
  );
}

export default AddJob;
