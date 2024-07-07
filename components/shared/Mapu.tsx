import React from 'react';
import Map from './Map'; 

type HomePageProps = {
  address: string;
};

const HomePage: React.FC<HomePageProps> = ({ address }) => {
  return (
    <>
      <Map address={address} />
    </>
  );
};

export default HomePage;