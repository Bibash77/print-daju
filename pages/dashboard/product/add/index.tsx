import DashboardLayout from "@/coomponents/Dashboard/Layout";
import { useCreateProductMutation } from "@/store/productApi";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Product = () => {
  const [createProduct, { isLoading, isSuccess, isError }] =
    useCreateProductMutation();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully created product");
      router.reload()
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError,router]);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const { name, description, price } = productData;
  const [image, setImages] = useState("");
  const onChange = (e: any) => {
    if (e.target.name === "images") {
      const profile = new FileReader();
      profile.onload = () => {
        if (profile.readyState === 2) {
          setImages(profile.result as string);
        }
      };
      profile.readAsDataURL(e.target.files[0]);
    } else {
      setProductData({ ...productData, [e.target.name]: e.target.value });
    }
  };
  const submitHandler = async (e: any) => {
    e.preventDefault();
    const data = { name, description, price: parseInt(price), image };
    createProduct(data);
  };

  return (
    <DashboardLayout>
      <div className="w-4/5 m-auto flex ">
        <form
          encType="multipart/form-data"
          className="w-full flex flex-col justify-between gap-3 "
        >
          <h1 className="font-bold text-center text-lg text-rose-400">
            Add Products
          </h1>
          <TextField
            type="text"
            placeholder="name"
            name="name"
            value={name}
            onChange={onChange}
            disabled={isLoading}
          />
          <TextField
            type="text"
            placeholder="description"
            name="description"
            value={description}
            onChange={onChange}
            disabled={isLoading}
          />
          <TextField
            type="number"
            placeholder="price"
            name="price"
            value={price}
            onChange={onChange}
            disabled={isLoading}
          />
          <TextField type="file" name="images" onChange={onChange} />
          <Button
            onClick={submitHandler}
            variant="outlined"
            className="w-full"
            disabled={isLoading}
          >
            Submit
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Product;
