import {makeStyles, Theme} from "@material-ui/core";
import {Product} from "./product";
import {useEffect, useState} from "react";
import {db, IDocument, ISnapshot} from "../firebase";
import {IProduct} from "../types/product";

const useStyles = makeStyles((theme: Theme) => {


    return {
        container: {
            margin: "0 auto",
            width: "100%",
        },
        banner: {
            background: "url(https://i.imgur.com/SYHeuYM.jpg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            minHeight: "600px",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
            zIndex: 1,
        },
        content: {
            background: theme.palette.background.default,
            paddingLeft: "10px",
            paddingRight: "10px",
            marginTop: "-350px",
            zIndex: 100,
            display: "flex",
        },
    }
});


export const Home = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        db.collection("products").onSnapshot((snapshot: ISnapshot) => {
            const prods = snapshot.docs.map((d: IDocument) => {
                const data = d.data();
                const p: IProduct = {id: d.id, name: data.name, price: data.price, rating: data.rating, image: data.image};
                return p;
            });
            setProducts(prods);
        });
    });

    const jsxProds = products.map( (p: IProduct) => (
            <Product product={p} key={p.id} />
    ) );

    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.banner}>

            </div>
            <div className={classes.content}>
                {jsxProds}
            </div>
        </div>
    )
}