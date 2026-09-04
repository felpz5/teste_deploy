import { Request, Response } from "express";
import { pool } from "../db";
import { ProductInput } from "../models/product.model";

export async function listProducts(_req: Request, res: Response) {
  const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
  res.json(result.rows);
}

export async function getProduct(req: Request, res: Response) {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  res.json(result.rows[0]);
}

export async function createProduct(req: Request, res: Response) {
  const { name, description, price } = req.body as ProductInput;

  if (!name || price === undefined) {
    return res.status(400).json({ message: "Campos 'name' e 'price' são obrigatórios" });
  }

  const result = await pool.query(
    "INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *",
    [name, description ?? null, price]
  );

  res.status(201).json(result.rows[0]);
}

export async function updateProduct(req: Request, res: Response) {
  const { id } = req.params;
  const { name, description, price } = req.body as ProductInput;

  const result = await pool.query(
    `UPDATE products
     SET name = $1, description = $2, price = $3, updated_at = NOW()
     WHERE id = $4
     RETURNING *`,
    [name, description ?? null, price, id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  res.json(result.rows[0]);
}

export async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  res.status(204).send();
}
