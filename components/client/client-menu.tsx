"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, ShoppingCart, UtensilsCrossed, Clock, Truck } from "lucide-react"
import Link from "next/link"

const mockProducts = [
  {
    id: 1,
    name: "X-Burger Clássico",
    description: "Hambúrguer suculento com queijo, alface e tomate",
    price: 25.9,
    category: "Lanches",
    image: "/delicious-burger.png",
  },
  {
    id: 2,
    name: "Pizza Calabresa",
    description: "Pizza tradicional com calabresa e cebola",
    price: 45.0,
    category: "Pizzas",
    image: "/pepperoni-pizza.png",
  },
  {
    id: 3,
    name: "Refrigerante 2L",
    description: "Bebida gelada para acompanhar",
    price: 8.5,
    category: "Bebidas",
    image: "/soda-bottle.png",
  },
  {
    id: 4,
    name: "Batata Frita",
    description: "Porção generosa de batatas crocantes",
    price: 15.0,
    category: "Porções",
    image: "/crispy-french-fries.png",
  },
]

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

export function ClientMenu() {
  const [cart, setCart] = useState<CartItem[]>([])
  const deliveryFee = 5.0

  const addToCart = (product: (typeof mockProducts)[0]) => {
    const existingItem = cart.find((item) => item.id === product.id)
    if (existingItem) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ])
    }
  }

  const updateQuantity = (id: number, delta: number) => {
    setCart(
      cart
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const getQuantity = (id: number) => {
    return cart.find((item) => item.id === id)?.quantity || 0
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal + deliveryFee

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
        <div className="container max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-xl">Delivery Express</h1>
                <p className="text-xs text-muted-foreground">Seu pedido em minutos</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Info Banner */}
      <div className="bg-secondary/50 border-b border-border">
        <div className="container max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-6 flex-wrap text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-medium">Aberto: 11h - 23h</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              <span className="font-medium">Taxa de entrega: R$ {deliveryFee.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container max-w-5xl mx-auto px-4 py-8 pb-32">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Nosso Cardápio</h2>
          <p className="text-muted-foreground">Escolha seus favoritos</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockProducts.map((product) => {
            const quantity = getQuantity(product.id)
            return (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                  <Badge className="absolute top-2 right-2">{product.category}</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">R$ {product.price.toFixed(2)}</span>
                    {quantity === 0 ? (
                      <Button size="sm" onClick={() => addToCart(product)} className="font-semibold">
                        <Plus className="h-4 w-4 mr-1" />
                        Adicionar
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2 bg-primary/10 rounded-lg p-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(product.id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-bold w-8 text-center">{quantity}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(product.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>

      {/* Sticky Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-2xl z-50">
          <div className="container max-w-5xl mx-auto px-4 py-4">
            <Link href="/menu/checkout">
              <Button className="w-full h-14 text-lg font-semibold">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Finalizar Compra - R$ {total.toFixed(2)}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
