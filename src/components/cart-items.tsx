import {makeStyles, Theme} from "@material-ui/core";
import {CartItem} from "./cart-item";
import {ICartItem} from "../types/cart";

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            flex: 0.8,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            //backgroundColor: "orange",
            marginRight: "18px",
            padding: "20px",
        },
        title: {
            marginBottom: "8px",
        },
        items: {

        },
    }
});

export interface ICartItemsProps {
    items: ICartItem[];
}

export const CartItems = (props: ICartItemsProps) => {
    const classes = useStyles();
    const jsxItems = props.items.map((item: ICartItem, index: number) => (
        <CartItem item={item} key={index} />
    ));

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Cart Items</h1>
            <hr />
            <div className={classes.items}>
                {jsxItems}
            </div>
        </div>
    );
}