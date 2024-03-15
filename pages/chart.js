/* eslint-disable react/no-deprecated */
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import axios from "axios";
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const apexData = {
  requests: [
      {
          "id": 1,
          "name": "Request for Towels",
          "unit": "Room 101",
          "comments": "Additional towels for guest",
          "created_at": "2024-02-24T12:34:56",
          "updated_at": "2024-02-24T13:46:00",
          "hotel": {
              "id": 1,
              "name": "Seaside Resort",
              "shortname": "Seaside"
          },
          "desk": {
              "id": 1,
              "name": "Housekeeping"
          },
          "fulfilled_by": {
              "id": 2,
              "username": "jane.doe"
          }
      },
      {
          "id": 2,
          "name": "Extra Pillow Request",
          "unit": "Room 202",
          "comments": "Need two extra pillows",
          "created_at": "2024-02-23T11:20:34",
          "updated_at": "2024-02-23T12:15:47",
          "hotel": {
              "id": 1,
              "name": "Seaside Resort",
              "shortname": "Seaside"
          },
          "desk": {
              "id": 2,
              "name": "Front Desk"
          },
          "fulfilled_by": {
              "id": 3,
              "username": "mark.twain"
          }
      },
      {
          "id": 3,
          "name": "Fix Air Conditioner",
          "unit": "Room 303",
          "comments": "Air conditioner not working",
          "created_at": "2024-02-22T09:30:21",
          "updated_at": "2024-02-22T11:25:10",
          "hotel": {
              "id": 2,
              "name": "Mountain View Inn",
              "shortname": "MountainView"
          },
          "desk": {
              "id": 3,
              "name": "Maintenance"
          },
          "fulfilled_by": {
              "id": 4,
              "username": "lisa.smith"
          }
      },
      {
          "id": 4,
          "name": "Shuttle Service Booking",
          "unit": "Lobby",
          "comments": "Need shuttle service for 4 people to the airport",
          "created_at": "2024-02-21T15:45:00",
          "updated_at": "2024-02-21T16:50:00",
          "hotel": {
              "id": 1,
              "name": "Seaside Resort",
              "shortname": "Seaside"
          },
          "desk": {
              "id": 4,
              "name": "Concierge"
          },
          "fulfilled_by": {
              "id": 5,
              "username": "tom.hanks"
          }
      },
      {
          "id": 5,
          "name": "Book Spa Appointment",
          "unit": "Spa Center",
          "comments": "Requesting a couple's spa session",
          "created_at": "2024-02-20T10:05:34",
          "updated_at": "2024-02-20T11:00:00",
          "hotel": {
              "id": 3,
              "name": "Urban Retreat",
              "shortname": "UrbanRt"
          },
          "desk": {
              "id": 5,
              "name": "Spa"
          },
          "fulfilled_by": {
              "id": 6,
              "username": "sarah.connor"
          }
      },
      {
          "id": 6,
          "name": "Room Cleaning Request",
          "unit": "Room 405",
          "comments": "Please clean the room while we are out",
          "created_at": "2024-02-19T12:30:45",
          "updated_at": "2024-02-19T14:00:00",
          "hotel": {
              "id": 3,
              "name": "Urban Retreat",
              "shortname": "UrbanRt"
          },
          "desk": {
              "id": 1,
              "name": "Housekeeping"
          },
          "fulfilled_by": {
              "id": 7,
              "username": "alex.jordan"
          }
      },
      {
          "id": 20,
          "name": "Late Checkout Request",
          "unit": "Room 550",
          "comments": "Requesting a late checkout at 3 PM",
          "created_at": "2024-02-18T08:22:19",
          "updated_at": "2024-02-18T09:10:00",
          "hotel": {
              "id": 3,
              "name": "Urban Retreat",
              "shortname": "UrbanRt"
          },
          "desk": {
              "id": 2,
              "name": "Front Desk"
          },
          "fulfilled_by": {
              "id": 10,
              "username": "emily.blunt"
          }
      },
      {
          "id": 21,
          "name": "Yoga Class Reservation",
          "unit": "Fitness Center",
          "comments": "Booking for two for the morning yoga session",
          "created_at": "2024-02-25T07:15:00",
          "updated_at": "2024-02-25T08:00:00",
          "hotel": {
              "id": 3,
              "name": "Urban Retreat",
              "shortname": "UrbanRt"
          },
          "desk": {
              "id": 6,
              "name": "Fitness"
          },
          "fulfilled_by": {
              "id": 11,
              "username": "david.smith"
          }
      },
      {
          "id": 22,
          "name": "Vegan Breakfast Option Inquiry",
          "unit": "Restaurant",
          "comments": "Asking about vegan options for breakfast",
          "created_at": "2024-02-26T09:00:00",
          "updated_at": "2024-02-26T09:30:00",
          "hotel": {
              "id": 3,
              "name": "Urban Retreat",
              "shortname": "UrbanRt"
          },
          "desk": {
              "id": 7,
              "name": "Catering"
          },
          "fulfilled_by": {
              "id": 12,
              "username": "michael.jordan"
          }
      },
      {
          "id": 23,
          "name": "Parking Space Reservation",
          "unit": "Underground Parking",
          "comments": "Reserve parking space for two vehicles",
          "created_at": "2024-02-27T12:34:00",
          "updated_at": "2024-02-27T13:00:00",
          "hotel": {
              "id": 3,
              "name": "Urban Retreat",
              "shortname": "UrbanRt"
          },
          "desk": {
              "id": 8,
              "name": "Security"
          },
          "fulfilled_by": {
              "id": 13,
              "username": "sophie.turner"
          }
      },
      {
          "id": 24,
          "name": "Beach Cabana Reservation",
          "unit": "Beach Front",
          "comments": "Reserve a cabana near the water for the entire day",
          "created_at": "2024-02-28T10:00:00",
          "updated_at": "2024-02-28T10:30:00",
          "hotel": {
              "id": 1,
              "name": "Seaside Resort",
              "shortname": "Seaside"
          },
          "desk": {
              "id": 9,
              "name": "Recreation"
          },
          "fulfilled_by": {
              "id": 14,
              "username": "nancy.drew"
          }
      },
      {
          "id": 25,
          "name": "Special Anniversary Dinner Setup",
          "unit": "Room 210",
          "comments": "Requesting a romantic dinner setup for our anniversary",
          "created_at": "2024-03-01T19:00:00",
          "updated_at": "2024-03-01T19:45:00",
          "hotel": {
              "id": 1,
              "name": "Seaside Resort",
              "shortname": "Seaside"
          },
          "desk": {
              "id": 10,
              "name": "Room Service"
          },
          "fulfilled_by": {
              "id": 15,
              "username": "julio.iglesias"
          }
      },
      {
          "id": 26,
          "name": "Snorkeling Gear Rental",
          "unit": "Beach Activity Center",
          "comments": "Need snorkeling gear for two adults and one child",
          "created_at": "2024-03-02T11:30:00",
          "updated_at": "2024-03-02T12:00:00",
          "hotel": {
              "id": 1,
              "name": "Seaside Resort",
              "shortname": "Seaside"
          },
          "desk": {
              "id": 11,
              "name": "Water Sports"
          },
          "fulfilled_by": {
              "id": 16,
              "username": "carlos.santana"
          }
      },
      {
          "id": 27,
          "name": "Extra Bed Setup",
          "unit": "Room 308",
          "comments": "Requesting an extra bed for a child",
          "created_at": "2024-03-03T14:20:00",
          "updated_at": "2024-03-03T15:00:00",
          "hotel": {
              "id": 1,
              "name": "Seaside Resort",
              "shortname": "Seaside"
          },
          "desk": {
              "id": 12,
              "name": "Guest Services"
          },
          "fulfilled_by": {
              "id": 17,
              "username": "emma.watson"
          }
      },
      {
          "id": 28,
          "name": "Late Night Room Service",
          "unit": "Room 402",
          "comments": "Request for a sandwich and a bottle of water",
          "created_at": "2024-03-04T22:30:00",
          "updated_at": "2024-03-04T23:00:00",
          "hotel": {
              "id": 5,
              "name": "Lakeside BnB",
              "shortname": "Lakeside"
          },
          "desk": {
              "id": 13,
              "name": "Room Service"
          },
          "fulfilled_by": {
              "id": 18,
              "username": "peter.parker"
          }
      },
      {
          "id": 29,
          "name": "Morning Wake-up Call",
          "unit": "Room 305",
          "comments": "Wake-up call requested for 7:00 AM",
          "created_at": "2024-03-05T06:50:00",
          "updated_at": "2024-03-05T07:00:00",
          "hotel": {
              "id": 5,
              "name": "Lakeside BnB",
              "shortname": "Lakeside"
          },
          "desk": {
              "id": 14,
              "name": "Front Desk"
          },
          "fulfilled_by": {
              "id": 19,
              "username": "lois.lane"
          }
      },
      {
          "id": 30,
          "name": "Bike Rental Request",
          "unit": "Outdoor Activities Center",
          "comments": "Two bikes requested for a half-day rental",
          "created_at": "2024-03-06T09:00:00",
          "updated_at": "2024-03-06T09:30:00",
          "hotel": {
              "id": 5,
              "name": "Lakeside BnB",
              "shortname": "Lakeside"
          },
          "desk": {
              "id": 15,
              "name": "Recreation"
          },
          "fulfilled_by": {
              "id": 20,
              "username": "bruce.wayne"
          }
      },
      {
          "id": 31,
          "name": "Special Diet Meal Preparation",
          "unit": "Restaurant",
          "comments": "Guest requires a gluten-free dinner",
          "created_at": "2024-03-07T18:00:00",
          "updated_at": "2024-03-07T18:45:00",
          "hotel": {
              "id": 5,
              "name": "Lakeside BnB",
              "shortname": "Lakeside"
          },
          "desk": {
              "id": 16,
              "name": "Catering"
          },
          "fulfilled_by": {
              "id": 21,
              "username": "clark.kent"
          }
      },
      {
          "id": 32,
          "name": "Guided Hiking Tour Booking",
          "unit": "Lobby",
          "comments": "Booking for a guided hiking tour for 4 people",
          "created_at": "2024-03-08T10:15:00",
          "updated_at": "2024-03-08T11:00:00",
          "hotel": {
              "id": 5,
              "name": "Lakeside BnB",
              "shortname": "Lakeside"
          },
          "desk": {
              "id": 17,
              "name": "Concierge"
          },
          "fulfilled_by": {
              "id": 22,
              "username": "diana.prince"
          }
      }
  ],
  "info": "Request API data sample | Internship Task 2024"
}

const kk = {

  series: [
    {
      name: "High - 2013",
      data: [28, 29, 33, 36, 32, 32, 33]
    },
    {
      name: 'Requests',
      data: apexData.requests.map((item) => item.name)
    }
    

    // {
    //   name: "Low - 2013",
    //   data: [12, 11, 14, 18, 17, 13, 13]
    // }
  ],
  options: {
    
    chart: {
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#77B6EA', '#545454'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: 'Average High & Low Temperature',
      align: 'left'
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    markers: {
      size: 1
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      title: {
        text: 'Month'
      }
    },
    yaxis: {
      title: {
        text: 'Temperature'
      },
      min: 5,
      max: 40
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
  },
}


export default function Chart2() {
  const [data, setData] = useState(kk)


  const getRequestCountPerDay = (data) => {
    const counts = {};
    data.requests.forEach((request) => {
      const date = request.created_at.split('T')[0];
      counts[date] = (counts[date] || 0) + 1;
    });
    return Object.entries(counts).map(([date, count]) => ({ x: date, y: count }));
  };
  
  const requestCountData = getRequestCountPerDay(apexData);
  console.log(requestCountData);


  return (
    <>
      <div className="min-h-screen flex w-full flex-col justify-center items-center">
        <h1 className="text-3xl text-white">Welcome to Apex Chart</h1>
        <div className="flex w-full justify-center">
          <div id="chart" className="bg-white container mx-8 px-8 mt-12">
            <ReactApexChart options={data?.options} series={data?.series} type="line" height={350} />
          </div>
        </div>
        <div id="html-dist"></div>
      </div>
    </>
  );
}


