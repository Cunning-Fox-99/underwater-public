import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { Sensor } from '../types/sensor';

const useSensors = () => {
    const [sensors, setSensors] = useState<Sensor[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        newSocket.on('data', (data: Sensor[]) => {
            console.log(data)
            setSensors(data);
        });

        newSocket.on('connect_error', (err) => {
            setError(`Connection error: ${err.message}`);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const adjustThrusters = async (name: string, thrusters: Partial<{ x: number; y: number; z: number; }>) => {
        try {
            const response = await fetch(`http://localhost:3000/sensor/${name}/thruster`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(thrusters),
            });

            if (!response.ok) {
                throw new Error('Failed to adjust thrusters');
            }

            setSensors((prevSensors) =>
                prevSensors.map((sensor) =>
                    sensor.name === name
                        ? { ...sensor, thrustersSpeed: { ...sensor.thrustersSpeed, ...thrusters } }
                        : sensor
                )
            );
        } catch (error) {
            console.error('Error adjusting thrusters:', error);
        }
    };

    return { sensors, adjustThrusters, error };
};

export default useSensors;
