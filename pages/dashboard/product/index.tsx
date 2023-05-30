import DashboardLayout from "@/coomponents/Dashboard/Layout";
import { wrapper } from "@/store";
import {
  deleteProduct,
  getAllProducts,
  useDeleteProductMutation,
} from "@/store/productApi";
import { productData } from "@/types";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
type Props = {
  data: productData;
  error: any;
};

const Product: React.FC<Props> = ({ data, error }) => {
  console.log(data);
  const router = useRouter();
  const [deleteProduct,{isSuccess,isError}] = useDeleteProductMutation();

  useEffect(()=>{
    if(isSuccess){
      toast.success("Product deleted successfully")
    }
    if(isError){
      toast.error("Something went wrong")
    }

  },[isSuccess,isError])
  const columns: GridColDef[] = [
    { field: "id", headerName: "id", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "imageSrc",
      headerName: "imageSrc",
      type: "string",
      width: 250,
      editable: true,
    },
    {
      field: "public_id",
      headerName: "public_id",
      type: "string",
      width: 250,
      editable: true,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 200,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const id = parseInt(`${params.row.id}`);
        return (
          <div className="flex items-center gap-7">
            <FaEdit
              color="blue"
              className="cursor-pointer"
              onClick={() => {
                router.push(`/dashboard/product/${id}`);
              }}
              // params.row._id
            />

            <AiFillDelete
              color="red"
              onClick={(e) => deleteProduct(id)}
              className="cursor-pointer"
            />
          </div>
        );
      },
    },
  ];

  const rows: any = [];
  data &&
    data?.product?.forEach((item: any) => {
      rows.push({
        id: item?.id,
        name: item.name,
        description: item?.description,
        price: item?.price,
        imageSrc: `${item?.image?.imageSrc}`,
        public_id: item?.image?.public_id,
      });
    });
  return (
    <DashboardLayout>
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </DashboardLayout>
  );
};

export default Product;
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { data, error }: any = await store.dispatch(
      getAllProducts.initiate()
    );

    return {
      props: {
        data: JSON.parse(JSON.stringify(data as productData)),
      },
    };
  }
);
