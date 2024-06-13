export interface Vector3 {
    x: number;
    y: number;
    z: number;
}

export interface Sensor {
    id: number;
    name: string;
    position: Vector3
    temperature: number; // Поле температуры воды
    waterSpeed: { x: number; y: number; z: number }; // Скорость воды по осям X, Y, Z
    thrustersSpeed: { x: number; y: number; z: number }; // Скорость двигателей по осям X, Y, Z
    lost: boolean; // Поле для отметки потери сигнала
    timeToExit: number; // Время до выхода из безопасной зоны
}

