import React, { useState } from 'react';
import useSensors from './hooks/useSensors';
import SensorCard from './components/SensorCard';
import SensorModal from './components/SensorModal';
import './App.css';
import {Sensor} from "./types/sensor";

const App: React.FC = () => {
    const { sensors, adjustThrusters } = useSensors();
    const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);

    const handleSensorClick = (sensor: Sensor) => {
        setSelectedSensor(sensor);
    };

    const handleCloseModal = () => {
        setSelectedSensor(null);
    };

    const handleAdjustThrusters = (name: string, thrusters: Partial<{ x: number; y: number; z: number; }>) => {
        adjustThrusters(name, thrusters);
    };

    return (
        <div className="App">
            <h1>Sensor Dashboard</h1>
            <div className="sensor-grid">
                {sensors.map((sensor) => (
                    <SensorCard key={sensor.id} sensor={sensor} onClick={() => handleSensorClick(sensor)} />
                ))}
            </div>
            {selectedSensor && (
                <SensorModal
                    sensor={selectedSensor}
                    isOpen={!!selectedSensor}
                    onClose={handleCloseModal}
                    onAdjustThrusters={handleAdjustThrusters}
                />
            )}
        </div>
    );
};

export default App;
