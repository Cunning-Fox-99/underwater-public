export interface Vector3 {
    x: number;
    y: number;
    z: number;
}

export interface Sensor {
    id: number;
    name: string;
    position: Vector3;
    temperature: number;
    waterSpeed: Vector3;
    thrustersSpeed: Vector3;
    lost: boolean;
    timeToExit: number;
}

