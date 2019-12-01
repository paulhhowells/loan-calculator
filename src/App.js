import React from 'react';
import Repayment from './components/Repayment';
import './App.css';

function App () {
  return (
    <div className="">
      <header className="">
        <h1>Your Loan</h1>
      </header>
      <main>
        <Repayment />
      </main>
    </div>
  );
}

export default App;
