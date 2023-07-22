import React, { createContext, useContext } from 'react';
import { Tarea } from '../../tipos';

interface TareasContextProps {
  tareas: Tarea[];
  tareaSeleccionada: Tarea | null;
  // Métodos
  agregarTarea: (tarea: Tarea) => void;
  eliminarTarea: (id: string) => void;
  editarTarea: (tarea: Tarea) => void;
  seleccionarTarea: (tarea: Tarea | null) => void;
}



export const TareasContext = createContext<TareasContextProps>({} as TareasContextProps);