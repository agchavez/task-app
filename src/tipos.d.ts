export type EstadoTarea = 'Pendiente' | 'Completada';

export interface Tarea {
    _id: string;
    nombre: string;
    fecha: string;
    estado: EstadoTarea;
}