import React from 'react';
import { Sensor } from '../types/sensor';

interface SensorCardProps {
    sensor: Sensor;
    onClick: () => void;
}

const SensorCard: React.FC<SensorCardProps> = ({ sensor, onClick }) => {
    // Calculate time until sensor goes out of safe zone
    const timeUntilOutOfZone = sensor.timeToExit;

    let borderColor = '';
    if (timeUntilOutOfZone > 10) {
        borderColor = 'green';
    } else if (timeUntilOutOfZone >= 5) {
        borderColor = 'yellow';
    } else {
        borderColor = 'red';
    }

    return (
        <div className={`sensor-card ${sensor.lost ? 'lost' : ''}`} onClick={onClick} style={{ border: `2px solid ${borderColor}` }}>
            <h3>{sensor.name}</h3>
            {sensor.lost ? <span className="sensor-lost">Sensor Lost </span> : null}
            <p>Water Temperature: {sensor.temperature}°C</p>
            <div className="progress-bar">
                <div className="progress" style={{ width: `${sensor.temperature}%`, backgroundColor: `${borderColor}` }}></div>
            </div>
            <p>Position: X: {sensor.position.x}, Y: {sensor.position.y}, Z: {sensor.position.z}</p>
            <p>Water Speed: X: {sensor.waterSpeed.x}, Y: {sensor.waterSpeed.y}, Z: {sensor.waterSpeed.z}</p>
            <p>Thrusters Speed: X: {sensor.thrustersSpeed.x}, Y: {sensor.thrustersSpeed.y}, Z: {sensor.thrustersSpeed.z}</p>
            <p>Time until out of safe zone: {timeUntilOutOfZone} seconds</p>
        </div>
    );
};

export default SensorCard;
