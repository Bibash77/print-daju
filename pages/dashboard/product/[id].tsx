import DashboardLayout from "@/coomponents/Dashboard/Layout";
import { wrapper } from "@/store";
import { getProductById, useUpdateProductMutation } from "@/store/productApi";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { string } from "yup";
const Product = ({ data }: any) => {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [imagepreview, setImagepreview] = useState("");
  const [updateProduct, { isLoading, isSuccess }] = useUpdateProductMutation();

  useEffect(() => {
    if (data?.product) {
      const { name, description, price, image } = data?.product;
      setName(name);
      setDescription(description);
      setPrice(price);
      setImagepreview(image?.imageSrc || "");
    }
    if (isSuccess) {
      toast.success("Successfully Updated");
      router.reload()
    }
  }, [data?.product, isSuccess, router]);
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const hasNewImage = image !== "";
   
   
   
    const realdata = {
      name,
      description: description,
      price: price,
      image: hasNewImage ? image : data?.product?.image?.imageSrc || "", // Use the new image if available, otherwise use the existing image
    };

    console.log(realdata)

    await updateProduct({id ,data:realdata})
    // await axios
    //   .put(`/api/product/${id}`, realdata)
    //   .then((response) => {
    //     toast.success("Product created!");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     toast.error("Something went wrong.");
    //   })
    //   .finally(() => {});
  };
  const onChange = (e: any) => {
    if (e.target.name === "images") {
      const profile = new FileReader();
      profile.onload = () => {
        if (profile.readyState === 2) {
          setImage(profile.result as string);
          setImagepreview(profile.result as string);
        }
      };
      profile.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <DashboardLayout>
      <form
        encType="multipart/form-data"
        className="w-full flex flex-col justify-between gap-3 "
      >
        <h1 className="font-bold text-center text-lg text-rose-400">
          Update Products
        </h1>
        <TextField
          type="text"
          placeholder="name"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          disabled={isLoading}
        />
        <TextField
          type="text"
          placeholder="description"
          name="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          disabled={isLoading}
        />
        <TextField
          type="number"
          placeholder="price"
          name="price"
          value={price}
          onChange={(e) => {
            setPrice(parseInt(e.target.value));
          }}
          disabled={isLoading}
        />
        <Image src={imagepreview} height={60} width={60} alt="productImage" />
        <TextField type="file" name="images" onChange={onChange} />
        <Button
          onClick={handleUpdateProduct}
          variant="outlined"
          className="w-full"
          disabled={isLoading}
        >
          Submit
        </Button>
      </form>
    </DashboardLayout>
  );
};

export default Product;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    let { id } = context.params ?? {};
    if (!id || Array.isArray(id)) {
      id = "";
    }

    const { data }: any = await store.dispatch(getProductById.initiate(id));

    return {
      props: {
        data,
      },
    };
  }
);
