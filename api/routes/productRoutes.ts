import express, { Request, Response } from "express";
import Product from "../models/Product";

const router = express.Router();

router.get("/", async (req: any, res: any) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/", async (req: any, res: any) => {
  const { title, img } = req.body;
  if (!title || !img) {
    return res.status(400).json({ error: "Title and image are required" });
  }

  try {
    const newProduct = new Product({ title, img });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id", async (req: any, res: any) => {
  const { title, img } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { title, img },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/:id", async (req: any, res: any) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
