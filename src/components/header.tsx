import {makeStyles, Theme} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import {useHistory} from "react-router";


const useStyles = makeStyles((theme: Theme) => {
    return {
        header: {
            height: "60px",
            backgroundColor: "#0f1111",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            color: "white",
            width: "100%",
        },
        logo: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
        },
        logoImg: {
           width: "100px",
           marginLeft: "11px",
        },
        optionAddress: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: "9px",
        },
        optionLine1: {
            whiteSpace: "nowrap",
        },
        optionLine2: {
            whiteSpace: "nowrap",
            fontWeight: 700,
        },
        search: {
            display: "flex",
            flexGrow: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
        },
        searchInput: {
            //background: "transparent",
            outline: 0,
            border: 0,
            flexGrow: 1,
            height: "35px",
            "&:focus-within": {
                boxShadow: "0 0 0 3px #f90",
            },
        },
        searchIconContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#febd69",
            color: "black",
            width: "35px",
            height: "35px",
        },
        nav: {
            display: "flex",
            flexDirection: "row",
        },
        option: {
            display: "flex",
            flexDirection: "column",
            paddingLeft: "9px",
            paddingRight: "9px",
            paddingTop: "10px",
            paddingBottom: "10px",
        },
        cart: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: "9px",
            cursor: "pointer",
        },
        cartCount: {
            paddingLeft: "4px",
        }
    }
});

export const Header = () => {
    const classes = useStyles();

    const history = useHistory();
    const handleCartClick = () => {
        history.push("/cart");
    };
    const handleLogoClick = () => {
        history.push("/");
    };

    return (
        <div className={classes.header}>
            <div className={classes.logo} onClick={handleLogoClick}>
                <img src={"https://i.imgur.com/7I9Was5.png"} className={classes.logoImg}/>
            </div>
            <div className={classes.optionAddress}>
                <LocationOnIcon />
                <div className={classes.option}>
                    <span className={classes.optionLine1}>Hello, </span>
                    <span className={classes.optionLine2}>Select your address</span>
                </div>
            </div>
            <div className={classes.search}>
                <input type={"text"} className={classes.searchInput} />
                <div className={classes.searchIconContainer}>
                    <SearchIcon />
                </div>
            </div>
            <div className={classes.nav}>
                <div className={classes.option}>
                    <div className={classes.optionLine1}>
                        Hello, John
                    </div>
                    <div className={classes.optionLine2}>
                        Account & Lists
                    </div>
                </div>
                <div className={classes.option}>
                    <div className={classes.optionLine1}>
                        Returns
                    </div>
                    <div className={classes.optionLine2}>
                        & Orders
                    </div>
                </div>
                <div className={classes.cart} onClick={handleCartClick}>
                    <ShoppingBasketIcon />
                    <div className={classes.cartCount}>
                        3
                    </div>
                </div>
            </div>
        </div>
    )
}