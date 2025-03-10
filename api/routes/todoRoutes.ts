import express, { Request, Response } from "express";
import Todo from "../models/Todo";

const router = express.Router();

router.get("/", async (req: any, res: any) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/", async (req: any, res: any) => {
  const { title, status } = req.body;
  if (!title || !status) {
    return res.status(400).json({ error: "Title and status are required" });
  }

  try {
    const newTodo = new Todo({ title, status });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id", async (req: any, res: any) => {
  const { title, status } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, status },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/:id", async (req: any, res: any) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
