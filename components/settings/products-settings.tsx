"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const mockProducts = [
  { id: 1, name: "X-Burger Clássico", category: "Lanches", price: 25.9, stock: 50, prepTime: 15 },
  { id: 2, name: "Pizza Calabresa", category: "Pizzas", price: 45.0, stock: 30, prepTime: 25 },
  { id: 3, name: "Refrigerante 2L", category: "Bebidas", price: 8.5, stock: 100, prepTime: 2 },
  { id: 4, name: "Batata Frita", category: "Porções", price: 15.0, stock: 40, prepTime: 10 },
]

export function ProductsSettings() {
  const [products, setProducts] = useState(mockProducts)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gerenciar Produtos</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Produto</DialogTitle>
                <DialogDescription>Preencha as informações do produto</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Nome do Produto</Label>
                    <Input id="product-name" placeholder="Ex: X-Burger" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="burgers">Lanches</SelectItem>
                        <SelectItem value="pizzas">Pizzas</SelectItem>
                        <SelectItem value="drinks">Bebidas</SelectItem>
                        <SelectItem value="sides">Porções</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input id="price" type="number" placeholder="0.00" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Quantidade</Label>
                    <Input id="stock" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prep-time">Tempo Preparo (min)</Label>
                    <Input id="prep-time" type="number" placeholder="0" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo">Foto do Produto</Label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      Fazer Upload
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-4">
                  <h3 className="font-semibold">Promoção (Opcional)</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="promo-price">Preço Promocional (R$)</Label>
                      <Input id="promo-price" type="number" placeholder="0.00" step="0.01" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="promo-qty">Qtd. em Promoção</Label>
                      <Input id="promo-qty" type="number" placeholder="0" />
                    </div>
                  </div>
                </div>

                <Button className="w-full">Adicionar Produto</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Estoque</TableHead>
                  <TableHead>Preparo</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.prepTime} min</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
