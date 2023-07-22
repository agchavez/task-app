import { FormControl, IconButton, InputLabel, OutlinedInput, TextField, ThemeProvider } from '@mui/material'
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import { useContext, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { TareasContext } from '../context/tareas/TareasContext';
import { Tarea } from '../tipos';
export const FormularioTarea = () => {
  const { agregarTarea, tareaSeleccionada, seleccionarTarea,editarTarea } = useContext(TareasContext);


    const [tarea, settarea] = useState<string>('');
    const inputFocus = useRef<HTMLInputElement>(null);
    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (tareaSeleccionada) {
            const tareaActualizada: Tarea = {
                ...tareaSeleccionada,
                nombre: tarea
            }
            editarTarea(tareaActualizada);
            seleccionarTarea(null);
        } else {
        const nuevaTarea: Tarea = {
            _id: new Date().getTime().toString(),
            nombre: tarea,
            estado: 'Pendiente',
            fecha: new Date().toLocaleDateString()
        }
        agregarTarea(nuevaTarea);
        settarea('');
    }
    }


    const cambioFormulario = (e: React.ChangeEvent<HTMLInputElement>) => {
        settarea(e.target.value);
    }

    useEffect(() => {
        if (tareaSeleccionada) {
            settarea(tareaSeleccionada.nombre);
            inputFocus.current?.focus();
        } else {
            settarea('');
        }
    }, [tareaSeleccionada])

    useLayoutEffect(() => {
        if (tareaSeleccionada && inputFocus.current) {
          inputFocus.current.focus();
        }
      }, [tareaSeleccionada]);



  return (
    <>
        <form
            onSubmit={ (e) => submitForm(e) }
        >
            <FormControl 
                fullWidth sx={{ my: 2 }} size='medium'>
                <InputLabel htmlFor="tarea">Tarea</InputLabel>

                <OutlinedInput
                    id="tarea"
                    /// <reference path="" />
                    ref={inputFocus}
                    label="Tarea"
                    type="text"
                    value={tarea}
                    onChange={ cambioFormulario }
                    autoComplete="off"
                    onLoad={() => inputFocus.current?.focus()}
                    endAdornment={
                            <TaskOutlinedIcon 
                                color='primary'
                            />
                    }
                />
            </FormControl>


        </form>

    </>
  )
}
