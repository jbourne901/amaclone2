import {Header} from "./header";
import {createMuiTheme, CssBaseline, makeStyles, MuiThemeProvider, Theme} from "@material-ui/core";
import { createGlobalStyle } from "styled-components";
import {Cart} from "./cart";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Home} from "./home";
import {ICartItem} from "../types/cart";
import {useEffect, useState} from "react";
import {db, IDocument, ISnapshot} from "../firebase";

const useStyles = makeStyles((theme: Theme) => {
    return {
        app: {
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "#eaeded",
            marginLeft: "20px",
            marginRight: "20px",
            maxWidth: "1500px",

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

const testCart: ICartItem[] = [
    {
        id: "1",
        name: "New Apple IPad pro (19.9 inch Wi-fi + Cellular, 512GB) - Space Gray (5th Generation)",
        image: "https://images-na.ssl-images-amazon.com/images/I/81FH2j7EnJL._AC_SX522_.jpg",
        qty: 1,
        rating: 5,
        price: 1459.99
    }
];

export const App = () => {
    const classes = useStyles();
    const theme = createMuiTheme({palette: {type: "light"}});

    const [cartItems, setCartItems] = useState<ICartItem[]>([]);

    useEffect(() => {
        db.collection("cartItems").onSnapshot( (snapshot: ISnapshot) => {
            const its: ICartItem[] = snapshot.docs.map( (doc: IDocument) => {
                const data = doc.data();
                const it: ICartItem = {id: doc.id, name: data.name, price: data.price, qty: data.qty, image: data.image, rating: data.rating};
                return it;
            });
            setCartItems(its);
        })
    }, []);


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
                                <Cart items={cartItems}/>
                            </Route>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        </MuiThemeProvider>
    )
};
