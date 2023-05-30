import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";

interface ProductProps {
  name: string;
  id: number;
}
const ProductCard = ({ imageSrc, name, description, price }:any) => {
  return (
    <div>
      <Card sx={{ maxWidth: 345,minHeight:"400px"}}>
        <Image
          height={0}
          width={0}
          src={imageSrc}
          style={{
            height: "100%",
            width: "100%",
          }}
          sizes="100vw"
          alt="productImage"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default ProductCard;
