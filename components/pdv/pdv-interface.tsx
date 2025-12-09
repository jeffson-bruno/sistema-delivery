"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Minus, Trash2, Search, DollarSign, Receipt, CheckCircle, Clock, Truck, CheckCheck } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data
const mockProducts = [
  { id: 1, name: "X-Burger Clássico", price: 25.9, category: "Lanches" },
  { id: 2, name: "Pizza Calabresa", price: 45.0, category: "Pizzas" },
  { id: 3, name: "Refrigerante 2L", price: 8.5, category: "Bebidas" },
  { id: 4, name: "Batata Frita", price: 15.0, category: "Porções" },
]

const mockOnlineOrders = [
  {
    id: 1,
    customer: "João Silva",
    address: "Rua das Flores, 123",
    items: ["X-Burger", "Refrigerante"],
    total: 34.4,
    status: "pending",
  },
  {
    id: 2,
    customer: "Maria Santos",
    address: "Av. Principal, 456",
    items: ["Pizza Calabresa", "Refrigerante 2L"],
    total: 53.5,
    status: "preparing",
  },
]

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

export function PDVInterface() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [discount, setDiscount] = useState(0)
  const [cashierOpen, setCashierOpen] = useState(false)

  const addToCart = (product: (typeof mockProducts)[0]) => {
    const existingItem = cart.find((item) => item.id === product.id)
    if (existingItem) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const updateQuantity = (id: number, delta: number) => {
    setCart(
      cart
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal - (subtotal * discount) / 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Ponto de Venda (PDV)</h1>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={cashierOpen ? "default" : "outline"}>
                {cashierOpen ? "Fechar Caixa" : "Abrir Caixa"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{cashierOpen ? "Fechar Caixa" : "Abrir Caixa"}</DialogTitle>
                <DialogDescription>
                  {cashierOpen ? "Faça a conciliação do caixa" : "Informe o valor inicial"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="initial-value">Valor Inicial (R$)</Label>
                  <Input id="initial-value" type="number" placeholder="0.00" step="0.01" />
                </div>
                <Button className="w-full" onClick={() => setCashierOpen(!cashierOpen)}>
                  Confirmar
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Receipt className="h-4 w-4 mr-2" />
                Registrar Despesa
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registrar Saída/Despesa</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Input id="description" placeholder="Ex: Compra de ingredientes" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Valor (R$)</Label>
                  <Input id="value" type="number" placeholder="0.00" step="0.01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ingredients">Ingredientes</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="maintenance">Manutenção</SelectItem>
                      <SelectItem value="other">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Registrar</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Products */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar produtos..." className="pl-10" />
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {mockProducts.map((product) => (
              <Card
                key={product.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => addToCart(product)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">R$ {product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Online Orders */}
          <Card className="border-primary/30 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                Pedidos Online
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockOnlineOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.address}</p>
                      </div>
                      <p className="font-bold text-primary">R$ {order.total.toFixed(2)}</p>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="outline" className="h-8 w-8 bg-accent/50">
                        <DollarSign className="h-4 w-4 text-accent" />
                      </Button>
                      <Button size="icon" variant="outline" className="h-8 w-8 bg-primary/10">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </Button>
                      <Button size="icon" variant="outline" className="h-8 w-8 bg-chart-4/20">
                        <Clock className="h-4 w-4 text-chart-4" />
                      </Button>
                      <Button size="icon" variant="outline" className="h-8 w-8 bg-chart-2/20">
                        <Truck className="h-4 w-4 text-chart-2" />
                      </Button>
                      <Button size="icon" variant="outline" className="h-8 w-8 bg-transparent">
                        <CheckCheck className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Cart */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carrinho</CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Carrinho vazio</p>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">R$ {item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7 bg-transparent"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7 bg-transparent"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="discount">Desconto (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  placeholder="0"
                  min="0"
                  max="100"
                />
              </div>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-accent">
                    <span>Desconto ({discount}%):</span>
                    <span>- R$ {((subtotal * discount) / 100).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total:</span>
                  <span className="text-primary">R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full h-12 text-base font-semibold" disabled={cart.length === 0}>
                    Finalizar Venda
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Finalizar Venda</DialogTitle>
                    <DialogDescription>Total: R$ {total.toFixed(2)}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Forma de Pagamento</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Dinheiro</SelectItem>
                          <SelectItem value="card">Cartão</SelectItem>
                          <SelectItem value="pix">PIX</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => {
                        setCart([])
                        setDiscount(0)
                      }}
                    >
                      Confirmar Pagamento
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
