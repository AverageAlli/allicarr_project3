import React from 'react';
import Header from '../app/components/Header';
import '../styles/global.css'; 

const App = ({ Component, pageProps }) => {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  );
};

export default App;