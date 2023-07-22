import { Box, Card, CardContent, Typography, IconButton, Chip, Divider, Paper } from '@mui/material';
import { Edit, Delete, Done } from '@mui/icons-material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ClearAllOutlinedIcon from '@mui/icons-material/ClearAllOutlined';
import { FC, useState, useEffect, useContext } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { EstadoTarea, Tarea } from '../tipos';
import { TareasContext } from '../context/tareas/TareasContext';

enum FiltroTarea {
  Pendiente,
  Completada,
  Todas
}

interface TareaCardProps {
    tarea: Tarea;
}

const TareaCard: FC<TareaCardProps> = ({ tarea }) => {
  const isTareaCompletada = tarea.estado === 'Completada';
  const { eliminarTarea, editarTarea, seleccionarTarea } = useContext(TareasContext);


  const onCompletarTarea = () => {
    const tareaActualizada: Tarea = {
      ...tarea,
      estado: 'Completada'
    }
    editarTarea(tareaActualizada);
  }

  return (
    <CSSTransition classNames="fade" timeout={300}>

    <Card sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto' }}>
        <CardContent>
          <Typography component="div" variant="h5" align='left'>
            {tarea.nombre}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" align='left'>
            {tarea.fecha} <Chip label={tarea.estado} color='primary' variant='outlined' size='small' />
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', flexDirection: 'row', gap: '10px' }}>
        {tarea.estado !== 'Completada' && <>
        <IconButton aria-label="Editar" disabled={isTareaCompletada} onClick={() => seleccionarTarea(tarea)}>
          <Edit />
        </IconButton>
        <IconButton aria-label="Eliminar" disabled={isTareaCompletada} onClick={() => eliminarTarea(tarea._id)}>
          <Delete />
        </IconButton>
        <IconButton aria-label="Completada" disabled={isTareaCompletada} onClick={onCompletarTarea}>
          <Done />
        </IconButton>
        </>}
      </Box>
    </Card>
    </CSSTransition>
  );
};

export const ListaTareas = () => {
  const [filtro, setFiltro] = useState<FiltroTarea>(FiltroTarea.Todas);
  const [listaTareas, setlistaTareas] = useState<Tarea[]>([]);
  const cambiarFiltro = (filtro: FiltroTarea) => {
    setFiltro(filtro);
  };
  
  const { tareas } = useContext(TareasContext);


  //const tareasFiltradas = filtro === FiltroTarea.Todas ? tareas : tareas.filter(tarea => tarea.estado === FiltroTarea[filtro]);

  useEffect(() => {
    // Filtrar las tareas
    const tareasFiltradas = filtro === FiltroTarea.Todas ? tareas : tareas.filter(tarea => tarea.estado === FiltroTarea[filtro]);
    setlistaTareas(tareasFiltradas);

    }, [filtro, tareas]);

  return (
    <>
      <Box sx={{ my: 2 }} display='flex' justifyContent='space-between' alignItems='center'>
        {/* Filtros */}
        <Chip
          label="Todas"
          color='primary'
          icon={<ClearAllOutlinedIcon />}
          variant={filtro === FiltroTarea.Todas ? "filled" : "outlined"}
          clickable
          onClick={() => cambiarFiltro(FiltroTarea.Todas)} />
        <Divider orientation="vertical" flexItem />
        <Chip
          label="Pendientes"
          color='primary'
          variant={filtro === FiltroTarea.Pendiente ? "filled" : "outlined"}
          clickable
          icon={<InfoOutlinedIcon />}
          onClick={() => cambiarFiltro(FiltroTarea.Pendiente)} />
        <Divider orientation="vertical" flexItem />
        <Chip
          label="Completadas"
          color="primary"
          icon={<CheckIcon />}
          variant={filtro === FiltroTarea.Completada ? "filled" : "outlined"}
          clickable
          onClick={() => cambiarFiltro(FiltroTarea.Completada)} />
      </Box>

      {/* Que la lista de tareas sea la única que hace scroll */}
      <Paper sx={{ overflow: 'auto', height: 'calc(100vh - 300px)' }} elevation={1}>
    
        {listaTareas.map((tarea, index) => (
          <TareaCard key={index} tarea={tarea} />
        ))}
      </Paper>
    </>
  );
};
