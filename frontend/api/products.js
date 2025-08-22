import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "backend", "db.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);

  // Exemplo: GET todos os produtos
  if (req.method === "GET") {
    res.status(200).json(data.products);
  }

  // Exemplo: POST novo produto
  else if (req.method === "POST") {
    const newProduct = req.body;
    data.products.push(newProduct);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.status(201).json(newProduct);
  }

  else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
