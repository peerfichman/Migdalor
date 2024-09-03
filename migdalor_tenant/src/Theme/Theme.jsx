import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#38588E"
        },
        secondary:
            {
                main: '#BEA029'
            },
        ochre: {
            main: '#E3D026',
            light: '#E9DB5D',
            dark: '#A29415',
            contrastText: '#242105',
        },
    },

    typography: {
        fontFamily:"\"Open Sans\", sans-serif",
        h1: {
            color:'#F6F2E2',
            fontSize: "3rem",
            fontWeight: 600,
            fontFamily: "\"Open Sans\", sans-serif",
        },
        h2: {
            color:'#F6F2E2',
            fontSize: "1.75rem",
            fontWeight: 600,
            fontFamily: "\"Open Sans\", sans-serif",


        },
        h3: {
            color:'#F6F2E2',
            fontSize: "1.5rem",
            fontWeight: 600,
        },
    },


});

export default theme;