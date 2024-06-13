import React from 'react';
import { Sensor } from '../types/sensor';

interface SensorModalProps {
    sensor: Sensor;
    isOpen: boolean;
    onClose: () => void;
    onAdjustThrusters: (name: string, thrusters: Partial<{ x: number; y: number; z: number; }>) => void;
}

const SensorModal: React.FC<SensorModalProps> = ({ sensor, isOpen, onClose, onAdjustThrusters }) => {
    const [thrusterX, setThrusterX] = React.useState(0);
    const [thrusterY, setThrusterY] = React.useState(0);
    const [thrusterZ, setThrusterZ] = React.useState(0);

    const handleAdjustThrusters = () => {
        onAdjustThrusters(sensor.name, { x: thrusterX, y: thrusterY, z: thrusterZ });
        onClose();
    };

    if (!isOpen) return null;

    // Calculate time until sensor goes out of safe zone for modal
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
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{sensor.name}</h2>
                <p>Time until out of safe zone: {timeUntilOutOfZone} seconds</p>
                <div className="modal-border" style={{ borderColor: `${borderColor}` }}>
                    <p>Water Temperature: {sensor.temperature}°C</p>
                    <p>Water Speed: X: {sensor.waterSpeed.x}, Y: {sensor.waterSpeed.y}, Z: {sensor.waterSpeed.z}</p>
                    <div className="modal-border input-group">
                        <input type="number" value={thrusterX} onChange={(e) => setThrusterX(parseFloat(e.target.value))} placeholder="X" />
                        <input type="number" value={thrusterY} onChange={(e) => setThrusterY(parseFloat(e.target.value))} placeholder="Y" />
                        <input type="number" value={thrusterZ} onChange={(e) => setThrusterZ(parseFloat(e.target.value))} placeholder="Z" />
                    </div>
                    <button onClick={handleAdjustThrusters}>Adjust Thrusters</button>
                </div>
            </div>
        </div>
    );
};

export default SensorModal;
