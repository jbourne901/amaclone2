import {makeStyles, Theme} from "@material-ui/core";
import {CartItems} from "./cart-items";
import {CartTotal} from "./cart-total";
import {ICartItem} from "../types/cart";

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            width: "100%",
            display: "flex",
            marginTop: "18px",
        }
    }
});

export interface ICartProps {
    items: ICartItem[];
}

export const Cart = (props: ICartProps) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <CartItems items={props.items}/>
            <CartTotal />
        </div>
    );
}