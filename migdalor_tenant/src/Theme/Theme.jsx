import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#38588E"
        },
        secondary:
            {
                main: '#BEA029'
            }


    },
    typography: {
        h1: {
            color:'#F6F2E2',
            fontSize: "3rem",
            fontWeight: 600,
        },
        h2: {
            color:'#F6F2E2',
            fontSize: "1.75rem",
            fontWeight: 600,
        },
        h3: {
            color:'#F6F2E2',
            fontSize: "1.5rem",
            fontWeight: 600,
            fontFamily: "Alkatra",
        },
    }
});

export default theme;