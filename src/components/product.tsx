import {makeStyles, Theme} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import {IProduct} from "../types/product";
import {db} from "../firebase";

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            background: theme.palette.background.default,
            zIndex: 100,
            border: "1px solid lightgrey",
            padding: "20px",
            margin: "10px",
            maxHeight: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: "400px",
            marginTop: "20px",
        },
        title: {

        },
        price: {
            fontWeight: 600,
        },
        rating: {

        },
        imageContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        image: {
            maxHeight: "200px",
            objectFit: "contain",
        },
        addToCart: {
            width: "100px",
            backgroundColor: "#f0c14b",
            border: "2px solid #a88734",
            height: "30px",
            textAlign: "center",
            verticalAlign: "middle",

        },
        star: {
            color: "orange",
        },
        actionSection: {
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "12px",
        }
    }
});

export interface IProductProps {
    product: IProduct;
}

export const Product = (props: IProductProps) => {
    const classes = useStyles();

    const p = props.product;

    const handleAddItem = async () => {
        try {
            const cartItem = db.collection("cartItems").doc(p.id);
            const doc = await cartItem.get();
            if(doc.exists) {
                const qty = doc.data()?.qty || 0;
                cartItem.update({qty: qty+1} );
            } else {
                cartItem.set({...p, qty: 1});
            }
        } catch(err) {
            console.error(err);
        }
    };

    const jsxStars: JSX.Element[]=[];
    for(let i=0; i<p.rating; i++) {
        jsxStars.push((
            <StarIcon className={classes.star} key={i}/>
        ));
    }
    const roundedRating = Math.round(p.rating);
    if(roundedRating>p.rating) {
        jsxStars.push((
            <StarHalfIcon className={classes.star} key={roundedRating}/>
        ));
    }

    return (
        <div className={classes.container}>
            <span className={classes.title}>
                {p.name}
            </span>
            <span className={classes.price}>
                ${p.price}
            </span>
            <div className={classes.rating}>
                {jsxStars}
            </div>
            <div className={classes.imageContainer}>
                <img className={classes.image} src={p.image}/>
            </div>
            <div className={classes.actionSection}>
                <button type={"button"} className={classes.addToCart} onClick={handleAddItem}>
                    Add to Cart
                </button>
            </div>

        </div>
    )
}
