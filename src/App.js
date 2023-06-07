import { useSelector } from 'react-redux';
import {useEffect} from 'react'

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import axios from 'axios';
import {store} from 'store';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  useEffect(() => {
    axios.defaults.baseURL = process.env.REACT_APP_API_URI;
    console.log(process.env.REACT_APP_API_URI);
    axios.interceptors.request.use(response => {
      const {user} = store.getState().user;
      if (user) response.headers.common['x-access-token'] = user.token;
      return response;
    })
  }, [])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
