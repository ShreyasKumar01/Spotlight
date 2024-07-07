"use client"

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

type MapProps = {
  address: string;
};

const Map: React.FC<MapProps> = ({ address }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const tomtomApiKey = process.env.NEXT_PUBLIC_TOMTOM_API_KEY;

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(
          `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json`,
          {
            params: {
              key: tomtomApiKey || '',
              limit: 1,
            },
          }
        );

        if (response.data.results.length > 0) {
          const position = response.data.results[0].position;
          setCoords({ lat: position.lat, lon: position.lon });
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    fetchCoordinates();
  }, [address, tomtomApiKey]);

  useEffect(() => {
    if (coords && mapRef.current && tomtomApiKey) {
      const map = tt.map({
        key: tomtomApiKey,
        container: mapRef.current,
        center: [coords.lon, coords.lat],
        zoom: 15,
      });

      const marker = new tt.Marker().setLngLat([coords.lon, coords.lat]).addTo(map);

      map.on('wheel', (event) => {
        if (!event.originalEvent.ctrlKey) {
          event.preventDefault();
        }
      });

      return () => {
        map.remove();
      };
    }
  }, [coords, tomtomApiKey]);

  if (!tomtomApiKey) {
    console.error('TomTom API key is missing');
    return <div>Error: TomTom API key is missing</div>;
  }

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '500px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}
    />
  );
};

export default Map;
