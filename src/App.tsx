
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container, Divider, ThemeProvider, Typography, createTheme } from '@mui/material';
import { FormularioTarea } from './components';
import { ListaTareas } from './components/ListaTareas';
import { TareasProvider } from './context/tareas/TarasProvider';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2D6EAD',
    }
  },
});
function App() {
  return (
    <>
      <TareasProvider>
        <ThemeProvider theme={darkTheme}>
          <Container maxWidth="sm" sx={{ width: '500px', height: '100%' }}>
            <Typography variant="h4" component="div" sx={{ my: 1 }} color='primary'>
              Mis tareas
            </Typography>
            <Divider sx={{ backgroundColor: 'primary.main' }} />
            <FormularioTarea />
            <ListaTareas />
          </Container>
        </ThemeProvider>
      </TareasProvider>

    </>
  )
}

export default App
