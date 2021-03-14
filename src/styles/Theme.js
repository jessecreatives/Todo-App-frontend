import {createMuiTheme} from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#9a1750",
            light: "#FCF0F3"
        },
        secondary: {
            main: "#ee4c7c", // pink
            light: "#ee4c7c",
        },
        background: {
            default: "#9a1750"
        }
    },
    shape: {
        borderRadius: 100
    },
    typography: {
        fontFamily: "'M PLUS 1p', sans-serif",
        h1: {
            fontSize: "3rem",
            fontWeight: "700",
        },
        h2: {
            fontSize: "1.2rem",
            fontWeight: "700",
        },
        body1: {
            fontSize: "1rem",
        }
    },
    overrides: {
        MuiToolbar: {
            root: {
                justifyContent: "space-between",
            }
        },
        MuiContainer: {
            root: {
<<<<<<< HEAD
                maxWidth: "600px!important",
                paddingLeft: "0!important",
                paddingRight: "0!important",
            },
=======
                paddingLeft: 0,
                paddingRight: 0,
            }
>>>>>>> cac1bb731b28f03f2f4ce9bfc21ee51922a3c595
        },
        MuiIconButton: {
            root: {
                color: "#121212",
                padding: 0
            },
            edgeEnd: {
                marginRight: 0,
            }
        },
        MuiPaper: {
            elevation12: {
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)",
            }
        },
        MuiAccordion: {
            root: {
                boxShadow: "none",
                borderBottom: "0.1rem solid rgba(0, 0, 0, 0.1)",
<<<<<<< HEAD
                borderRadius: "0!important",
=======
>>>>>>> cac1bb731b28f03f2f4ce9bfc21ee51922a3c595
                "&$expanded": {
                    marginBottom: 0
                }
            },
        },
        MuiAccordionSummary: {
        },
        MuiAccordionDetails: {
            root: {
                paddingLeft: 0,
                paddingRight: 0
            }
        },
        MuiButton: {
            contained: {
                padding: "0.6rem 2rem",
            }
        },
        MuiTabs: {
            indicator: {
                // width: "30px!important",
            }
        },
        MuiTab: {
            root: {
                paddingLeft: "2rem",
                paddingRight: "2rem",
            }
        },
    }
});