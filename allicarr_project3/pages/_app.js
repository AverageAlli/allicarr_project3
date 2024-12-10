import React from 'react';
import Header from '../app/components/Header';

const App = ({ Component, pageProps }) => {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  );
};

export default App;