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

const DoctorCountBarGraph = () => {
    const [doctorCount, setDoctorCount] = useState(0);
    const [resignedCount, setResignedCount] = useState(0); // Resigned doctors count

    useEffect(() => {
        const fetchDoctorCount = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/doctors/count');
                setDoctorCount(response.data.count);
            } catch (error) {
                console.error('Error fetching doctor count:', error);
            }
        };

        const fetchResignedCount = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/doctors/resigned/count');
                setResignedCount(response.data.count);
            } catch (error) {
                console.error('Error fetching resigned doctor count:', error);
            }
        };

        fetchDoctorCount();
        fetchResignedCount();
    }, []);

    const data = {
        labels: ['Doctors'], // Single category for now
        datasets: [
            {
                label: 'Total Doctors',
                data: [doctorCount],
                backgroundColor: 'rgba(54, 162, 235, 0.5)', // Blue for total doctors
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Resigned Doctors',
                data: [resignedCount],
                backgroundColor: 'rgba(255, 99, 132, 0.5)', // Red for resigned doctors
                borderColor: 'rgba(255, 99, 132, 1)',
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
                text: 'Doctor Count Overview',
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
            <h2>Doctor Availability and Resigned Analytics</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default DoctorCountBarGraph;
