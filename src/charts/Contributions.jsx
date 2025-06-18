import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function Contributions({ total = 0, pending = 0, accepted = 0 }) {
  const formattedData = [
    {
      id: 1,
      value: typeof total === 'string' ? parseFloat(total.replace(/,/g, '')) : parseFloat(total) || 0,
      label: 'Total Orders',
    },
    {
      id: 2,
      value: typeof pending === 'string' ? parseFloat(pending.replace(/,/g, '')) : parseFloat(pending) || 0,
      label: 'Pending Orders',
    },
    {
      id: 3,
      value: typeof accepted === 'string' ? parseFloat(accepted.replace(/,/g, '')) : parseFloat(accepted) || 0,
      label: 'Accepted Orders',
    },
  ];

  return (
    <PieChart 
      className='-ml-16 text-sm'
      colors={['#FF7F3E', '#FFDA78', '#118B50']}
      series={[ { data: formattedData } ]}
      width={500}
      height={250}
    />
  );
}
