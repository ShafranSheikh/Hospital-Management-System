import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DoctorCountChart = () => {
    const [doctorCount, setDoctorCount] = useState(0);
    const [resignedCount, setResignedCount] = useState(6); // Example resigned doctors count

    useEffect(() => {
        const fetchDoctorCount = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/doctors/count');
                setDoctorCount(response.data.count);
            } catch (error) {
                console.error('Error fetching doctor count:', error);
            }
        };

        fetchDoctorCount();
    }, []);

    const data = {
        labels: ['Total Doctors', 'Resigned Doctors'], // Labels for the donut chart
        datasets: [
            {
                data: [doctorCount, resignedCount], // Data for the chart
                backgroundColor: ['#36A2EB', '#FF6384'], // Colors for each section
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
            title: {
                display: true,
                text: 'Doctor Distribution',
            },
        },
        cutout: '50%', // This makes it a donut chart
    };

    return (
        <div style={{ width: '50%', margin: '0 auto' }}>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default DoctorCountChart;
