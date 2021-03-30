import {Header} from "./header";
import {createMuiTheme, CssBaseline, makeStyles, MuiThemeProvider, Theme} from "@material-ui/core";
import { createGlobalStyle } from "styled-components";
import {Cart} from "./cart";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Home} from "./home";

const useStyles = makeStyles((theme: Theme) => {
    return {
        app: {
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
        }
    }
});

export const GlobalStyle = createGlobalStyle`
  * {
     padding: 0;
     margin: 0;
     box-sizing: border-box;
  }  
`;

export const App = () => {
    const classes = useStyles();
    const theme = createMuiTheme({palette: {type: "light"}});
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyle />
            <div className={classes.app}>
                <BrowserRouter>
                    <div className={classes.app}>
                        <Header />
                        <Switch>
                            <Route path={"/"} exact>
                                <Home />
                            </Route>
                            <Route path={"/cart"} exact>
                                <Cart />
                            </Route>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        </MuiThemeProvider>
    )
};
