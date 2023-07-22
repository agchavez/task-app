import { FC, ReactNode, useReducer } from 'react';
import { Tarea } from '../../tipos';
import { tareasReducer } from './tareasReducer';
import { TareasContext } from './TareasContext';


export interface TareasState {
    tareas: Tarea[];
    tareaSeleccionada: Tarea | null;
}

interface TareasContextProps {
    children: ReactNode; 
}

const ESTADO_INICIAL: TareasState = {
    tareas: [
        { nombre: 'Sacar la basura', fecha: '20/10/2021', estado: 'Pendiente', _id: new Date().getTime().toString() },
    ],
    tareaSeleccionada: null
}

export const TareasProvider: FC<TareasContextProps> = ({ children }) => {

    const [state, dispatch] = useReducer(tareasReducer, ESTADO_INICIAL);

    const agregarTarea = (tarea: Tarea) => {
        dispatch({
            type: 'AGREGAR_TAREA',
            payload: tarea
        })

    }

    const eliminarTarea = (id: string) => {
        dispatch({
            type: 'ELIMINAR_TAREA',
            payload: id
        })
    }

    const editarTarea = (tarea: Tarea) => {
        dispatch({
            type: 'ACTUALIZAR_TAREA',
            payload: tarea
        })
    }

    const seleccionarTarea = (tarea: Tarea | null) => {
        dispatch({
            type: 'SELECCIONAR_TAREA',
            payload: tarea
        })
    }

    return (
        <TareasContext.Provider value={{
            tareas: state.tareas,
            agregarTarea,
            eliminarTarea,
            editarTarea,
            tareaSeleccionada: state.tareaSeleccionada,
            seleccionarTarea
        }}>
            { children }
        </TareasContext.Provider>
        
    )
}
