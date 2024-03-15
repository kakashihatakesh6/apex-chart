import React, { useEffect } from "react";
import { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});


const Chart = () => {
  const [ChartData, setChartData] = useState();
  const [hotelData, sethotelData] = useState();
  const [dateReq, setDateReq] = useState();

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      //   setIsLoading(true);
      const endpoint = "https://checkinn.co/api/v1/int/requests";
      const res = await axios.get(endpoint);
      const data = res.data.requests;
      const hotelRes = hotelRequests(data);
      const requestCountData = getRequestCountPerDay(data);
      sethotelData(hotelRes);
      setDateReq(requestCountData);
      console.log(data);

      setChartData(data);

      //   setIsLoading(false);
    } catch (error) {
      console.log("Some Error Occurred!");
    }
  };


  // Filter Data for no of request per hotel
  const hotelRequests = (data) => {
    const counts = {};
    data.map((request) => {
      const hotel = request.hotel.name;
      const numberOfReq = data.filter((item) => item.hotel.name === hotel);
      counts[hotel] = numberOfReq;
    });

    return Object.entries(counts).map(([hotel, numberOfReq]) => ({
      hotel: hotel,
      numberOfReq: numberOfReq,
    }));
  };

  // Filter Data for no of request vs per day
const getRequestCountPerDay = (data) => {
    const counts = {};
    data.forEach((request) => {
      const date = request.created_at.split("T")[0];
      counts[date] = (counts[date] || 0) + 1;
    });
    return Object.entries(counts).map(([date, count]) => ({ x: date, y: count }));
  };
  

  const options = {
    chart: {
      height: 350,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#77B6EA", "#545454"],

    dataLabels: {
      enabled: true,
    },

    stroke: {
      curve: "straight",
    },
    title: {
      text: "No of Requests & Hotel",
      align: "left",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      type: "text",
      // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      categories: hotelData?.map((hotel) => hotel.hotel),
      title: {
        text: "Hotels",
      },
      labels: {
        rotate: -45,
        style: {
          fontSize: "12px",
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      type: "text",
    //   categories: [0, 2, 4, 6, 8],
      // categories: hotelData.map((hotel) => hotel.numberOfReq.length),
      title: {
        text: "Number of Requests",
        style: {
          fontSize: "12px",
          fontWeight: 800,
        },
      },
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  };

  const series = [
    {
      name: "Requests",
      // data: data.map((item) => item.y)
      data: hotelData?.map((item) => item.numberOfReq.length),
    },
  ];


  const options2 = {
    chart: {
      height: 350,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#77B6EA", "#545454"],

    dataLabels: {
      enabled: true,
    },

    stroke: {
      curve: "straight",
    },
    title: {
      text: "No of Requests & Date",
      align: "left",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
    //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      categories: dateReq?.map((item) => item.x),
      title: {
        text: "Date",
      },
      labels: {
        rotate: -45,
        style: {
          fontSize: "12px",
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      type: "text",
      // categories: hotelData.map((hotel) => hotel.numberOfReq.length),
      title: {
        text: "Number of Requests",
        style: {
          fontSize: "12px",
          fontWeight: 800,
        },
      },
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  };

  const series2 = [
    {
      name: "Requests",
      data: dateReq?.map((item) => item.y)
    
    },
  ];

  return (
    <>
      <div id="chart" className="bg-white w-1/2 container mx-8 px-8 mt-12">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />{" "}
      </div>
      <div id="chart" className="bg-white w-1/2 container mx-8 px-8 mt-12">
        <ReactApexChart
          options={options2}
          series={series2}
          type="line"
          height={350}
        />{" "}
      </div>
    </>
  );
};

export default Chart;
