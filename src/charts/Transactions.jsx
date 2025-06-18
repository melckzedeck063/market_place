import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function Transactions() {
  return (
    <BarChart
      className="-ml-8 rounded-lg"
      xAxis={[
        { scaleType: 'band', data: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'] },
      ]}
      series={[
        { data: [4, 7, 5, 8, 3, 4, 5, 9, 4, 6, 2], color: '#118B50' },
        { data: [1, 6, 5, 2, 8, 4, 6, 2, 7, 8, 4], color: '#27548A' },
      ]}
      width={720}
      height={300}
      barGap={0.5} 
      barCategoryGap={10}
    />
  );
}
