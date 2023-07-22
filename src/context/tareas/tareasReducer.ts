import { Tarea } from '../../tipos';
import { TareasState } from './TarasProvider';


type TareasActionType =
    | { type: 'AGREGAR_TAREA', payload: Tarea }
    | { type: 'ELIMINAR_TAREA', payload: string }
    | { type: 'CARGAR_TAREAS', payload: Tarea[] }
    | { type: 'ACTUALIZAR_TAREA', payload: Tarea }
    | { type: 'SELECCIONAR_TAREA', payload: Tarea | null }

export const tareasReducer = (state: TareasState, action: TareasActionType): TareasState => {
    switch (action.type) {
        case 'AGREGAR_TAREA':
            return {
                ...state,
                tareas: [...state.tareas, action.payload]
            }
        case 'ELIMINAR_TAREA':
            return {
                ...state,
                tareas: state.tareas.filter(tarea => tarea._id !== action.payload)
            }
        case 'CARGAR_TAREAS':
            return {
                ...state,
                tareas: action.payload
            }
        case 'ACTUALIZAR_TAREA':
            return {
                ...state,
                tareas: state.tareas.map(tarea => tarea._id === action.payload._id ? action.payload : tarea)
            }
        case 'SELECCIONAR_TAREA':
            return {
                ...state,
                tareaSeleccionada: action.payload
            }
        
        default:
            return state;
    }
}