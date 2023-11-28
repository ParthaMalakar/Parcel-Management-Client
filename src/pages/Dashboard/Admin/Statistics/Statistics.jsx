import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['parcel'],
    queryFn: async () => {
        const res = await axiosSecure.get(`/parcel`);
        return res.data;
        
    }
})
const countBookingsByDate = (bookings) => {
  const countByDate = {};
 
  bookings.forEach((booking) => {
    const date = booking.bookingDate;
    console.log(date)
    const dateObject = new Date(date);

const dateOnly = dateObject.toISOString().split('T')[0];
    countByDate[dateOnly] = (countByDate[dateOnly] || 0) + 1;
  });
  console.log(countByDate)

  return countByDate;
};

const countBookingsByStatus = (bookings) => {
  const countByStatus = {};
 
  bookings.forEach((booking) => {
    const status = booking.status;
    console.log(status)
    
countByStatus[status] = (countByStatus[status] || 0) + 1;
  });
  console.log(countByStatus)

  return countByStatus;
};


const dateby=  countBookingsByDate(parcels)
console.log(dateby)
const keysArray = Object.keys(dateby);
const keysvalue = Object.values(dateby);
  console.log(keysArray);
    const bookingsData = {
        labels: keysArray,
        series: [
          { name: 'Bookings', data: keysvalue },
        ],
      };
    const book = countBookingsByStatus(parcels)
    const statusArray = Object.keys(book);
const statusvalue = Object.values(book);
      const chartData = {
        series: [
          // { name: 'Booked Parcels', data: [15,2] },
          // { name: 'Delivered Parcels', data: [12,3] },
          { name: statusArray, data: statusvalue }
        ],
      };
    
      const bookingsChartOptions = {
        xaxis: {
          categories: bookingsData.labels,
        },
      };
      const chartOptions = {
        xaxis: {
          categories: statusArray,
        },
      };
     
  
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">App Usage Data</h2>
    
          {/* Bar Chart: Bookings by Date */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Bookings by Date</h3>
            <ReactApexChart
              options={bookingsChartOptions}
              series={bookingsData.series}
              type="bar"
              height={350}
            />
          </div>
    
          {/* Line Chart: Comparison between Booked and Delivered Parcels */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Comparison between Booked and Delivered Parcels</h3>
            <h3 className="text-lg font-semibold mb-2">Parcels Comparison</h3>
      <ReactApexChart
        options={chartOptions}
        series={chartData.series}
        type="line"
        height={350}
      />
          </div>
        </div>
      );
    };

export default Statistics;