import Image from "next/image";
import { Inter } from "next/font/google";
import { wrapper } from "@/store";
import { getAllProducts } from "@/store/productApi";
import { ShopApiData } from "@/types";
import ProductCard from "@/coomponents/Product/ProductCard";
import { Grid } from "@mui/material";

// import { getShopData } from "@/store/shopApiSlice";
const inter = Inter({ subsets: ["latin"] });

type Props = {
  data: ShopApiData;
  error: any;
};
const Home: React.FC<Props> = ({ data, error }) => {
  return (
    <div className=" w-11/12 m-auto mt-20">
      <h1 className="text-2xl text-purple-600 text-center">
        Featured Products
      </h1>

      <div className="mt-20">
        <Grid container spacing={2}>
          {data?.product?.map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <ProductCard
                name={item?.name}
                price={item?.price}
                imageSrc={item?.image?.imageSrc}
                description={item?.description}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
export default Home;
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    // let { pid } = context.params ?? {};

    // if (!pid || Array.isArray(pid)) {
    //   pid = "";
    // }

    const { data, error }: any = await store.dispatch(
      getAllProducts.initiate()
    );

    return {
      props: {
        data: data,
      },
    };
  }
);
