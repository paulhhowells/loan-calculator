import React from 'react';
import Repayment from './components/Repayment';
import './App.css';

function App () {
  return (
    <div className="page">
      <header className="page__header">
        <h1>Your Loan</h1>
      </header>
      <main className="page__main">
        <Repayment />
      </main>
    </div>
  );
}

export default App;
