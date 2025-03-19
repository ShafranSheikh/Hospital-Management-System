import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PatientCountChart = () => {
  const [patientCount, setPatientCount] = useState(0);
  const [dischargedPatient, setDischargedCount] = useState(0);

  useEffect(() => {
    const fetchPatientCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/patient/count');
        setPatientCount(response.data.count);
      } catch (error) {
        console.error('Error fetching Patient count:', error);
      }
    };

    const fetchDischargedCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/patient/discharged/count');
        setDischargedCount(response.data.count);
      } catch (error) {
        console.error('Error fetching Discharged patient count:', error);
      }
    };

    fetchPatientCount();
    fetchDischargedCount();
  }, []);

  const data = {
    labels: ['Patients'], // Label for the x-axis
    datasets: [
      {
        label: 'Total Patients',
        data: [patientCount],
        backgroundColor: 'rgba(75, 192, 192, 0.5)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)', // Border color
        borderWidth: 1,
      },
      {
        label: 'Discharged Patients',
        data: [dischargedPatient],
        backgroundColor: 'rgba(153, 102, 255, 0.5)', // Bar color
        borderColor: 'rgba(153, 102, 255, 1)', // Border color
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Patient Count Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Categories',
        },
      },
    },
  };

  return (
    <div>
      <h2>Patient Availability and Discharged Analytics</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PatientCountChart;
