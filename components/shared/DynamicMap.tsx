import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./Mapu'), {
  ssr: false,
});

export default DynamicMap;
