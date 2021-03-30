import {Header} from "./header";
import {createMuiTheme, CssBaseline, makeStyles, MuiThemeProvider, Theme} from "@material-ui/core";
import { createGlobalStyle } from "styled-components";
import {Cart} from "./cart";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Home} from "./home";
import {ICartItem} from "../types/cart";
import {useEffect, useState} from "react";
import {auth, db, IDocument, ISnapshot, provider} from "../firebase";
import {Login} from "./login";
import {IUser} from "../types/user";

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

export const App = () => {
    const classes = useStyles();
    const theme = createMuiTheme({palette: {type: "light"}});

    const [cartItems, setCartItems] = useState<ICartItem[]>([]);
    const [user, setUser] = useState<IUser|undefined>();

    useEffect(() => {
        const stru = localStorage.getItem("user");
        if(stru) {
            const u: IUser = JSON.parse(stru);
            console.log("setEffect setUser", u)
            setUser(u);
        }
    },[]);

    const onLogin = async () => {
        try {
            const res = await auth.signInWithPopup(provider);
            if(!res.user?.uid) {
                console.error("login failed")
                alert("Login failed");
                return;
            }
            const u: IUser = {
                id: res.user.uid,
                displayName: res.user.displayName||"",
                photo: res.user.photoURL||"",
                email: res.user.email||"",
            }
            console.log("onLogin setUser", u)
            setUser(u);
            localStorage.setItem("user", JSON.stringify(u));
        } catch(err) {
            console.error(err)
            alert(err.message);
        }
    };

    const onLogout = async () => {
        try {
            await auth.signOut();
            localStorage.removeItem("user");
            setUser(undefined);
            console.log("onLogout setUser", undefined)
        } catch(err) {
            console.error(err);
        }

    };

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

    console.log("render user=",user)

    let cartQty=0;
    let cartTotal=0;
    for(let item of cartItems) {
        cartQty += Number.parseInt(""+item.qty);
        cartTotal += item.qty * item.price;
    }

    let jsx;
    if(user) {
        jsx=(
            <Switch>
                <Route path={"/"} exact>
                    <Home />
                </Route>
                <Route path={"/cart"} exact>
                    <Cart items={cartItems} cartQty={cartQty} cartTotal={cartTotal} />
                </Route>
                <Route path={"/login"} exact>
                    <Login onLogin={onLogin} />
                </Route>
            </Switch>

        )
    } else {
        jsx=(
            <Login onLogin={onLogin} />
        );
    }

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyle />
            <div className={classes.app}>
                <BrowserRouter>
                    <div className={classes.app}>
                        <Header cartQty={cartQty} user={user} onLogout={onLogout}/>
                        {jsx}
                    </div>
                </BrowserRouter>
            </div>
        </MuiThemeProvider>
    )
};
