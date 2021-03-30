import {makeStyles, Theme} from "@material-ui/core";
import {ICartItem} from "../types/cart";
import {ChangeEvent} from "react";
import {db} from "../firebase";

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            display: "flex",
            flexDirection: "row",
            paddingTop: "12px",
            paddingBottom: "12px",
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "100%",
        },
        left: {
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            height: "180px",
        },
        right: {
            flex: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
        },
        imageContainer: {
            flex: 0,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "180px",
            height: "180px",
            minWidth: "180px",
        },
        image: {
            objectFit: "contain",
            width: "100%",
            height: "100%",
            border: "1px solid lightgray",
        },
        info: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "space-between",
            height: "100%",
            paddingLeft: "20px",
            paddingRight: "20px",
        },
        name: {
            flex: "1",
            fontSize: "18px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
        },

        top: {
            color: "#007185",
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "flex-start",
        },
        bottom: {
            flex: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginTop: "4px",
        },
        price: {
            fontSize: "18px",
            fontWeight: 700,
            marginLeft: "16px",
        },
        qty: {
        },
        delete: {
            color: "#007185",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 700,
            marginLeft: "16px",
        },
    }
});

export interface ICartItemProps {
    item: ICartItem;
}

export const CartItem = (props: ICartItemProps) => {
    const item = props.item;
    const classes = useStyles();
    const totalPrice = item.price * item.qty;

    const handleChangeQty = async (e: ChangeEvent<HTMLSelectElement>) => {
        const qty = e.target.value;
        try {
            const cartItem = db.collection("cartItems").doc(item.id);
            const doc = await cartItem.get();
            if(doc.exists) {
                cartItem.update({qty} );
            }
        } catch(err) {
            console.error(err);
        }
    };

    const jsxQtyOptions: JSX.Element[] = [];
    for(let i=1; i<10; i++) {
        jsxQtyOptions.push((
            <option value={i} key={i}>Qty: {i}</option>
        ));
    }

    return (
        <div className={classes.container}>
            <div className={classes.left}>
                <div className={classes.imageContainer}>
                    <img src={item.image}  className={classes.image}/>
                </div>
                <div className={classes.info}>
                    <div className={classes.top}>
                        <h2 className={classes.name}>{item.name}</h2>
                    </div>
                    <div className={classes.bottom}>
                        <div className={classes.qty}>
                            <select value={item.qty} onChange={handleChangeQty}>
                                {jsxQtyOptions}
                            </select>
                        </div>
                        <div className={classes.delete}>
                            Delete
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.right}>
                <div className={classes.price}>
                    ${totalPrice}
                </div>
            </div>
        </div>
    );
}



