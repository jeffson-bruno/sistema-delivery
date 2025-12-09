"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, CreditCard, Smartphone, Banknote, Copy, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("pix")
  const [copied, setCopied] = useState(false)

  const pixKey = "12345678900"
  const pixHolder = "Delivery Express LTDA"
  const total = 89.4

  const copyPixKey = () => {
    navigator.clipboard.writeText(pixKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <Link href="/menu/checkout">
          <Button variant="ghost" className="mb-6">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>

        <h1 className="text-3xl font-bold mb-6">Pagamento</h1>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Resumo do Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>R$ 84.40</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Taxa de entrega</span>
              <span>R$ 5.00</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total</span>
              <span className="text-primary">R$ {total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Forma de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="pix" id="pix" />
                  <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <span className="font-semibold">PIX</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Cartão de Crédito/Débito</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Banknote className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Dinheiro</span>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Payment Details */}
        {paymentMethod === "pix" && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Pagamento via PIX</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center gap-4 p-6 bg-muted rounded-lg">
                <div className="w-48 h-48 bg-white p-4 rounded-lg">
                  <img src="/qr-code.png" alt="QR Code PIX" className="w-full h-full" />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Escaneie o QR Code com seu aplicativo de banco
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Chave PIX</Label>
                  <div className="flex gap-2">
                    <Input value={pixKey} readOnly className="font-mono" />
                    <Button variant="outline" size="icon" onClick={copyPixKey} className="shrink-0 bg-transparent">
                      {copied ? <CheckCircle2 className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Nome do Titular</Label>
                  <Input value={pixHolder} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Valor</Label>
                  <Input value={`R$ ${total.toFixed(2)}`} readOnly className="font-bold" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {paymentMethod === "card" && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Pagamento no Cartão</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2 p-4 bg-secondary/30 rounded-lg">
                <Checkbox id="card-delivery" defaultChecked />
                <Label htmlFor="card-delivery" className="cursor-pointer">
                  Pagar na entrega com cartão
                </Label>
              </div>
              <p className="text-sm text-muted-foreground px-4">
                O entregador levará a maquininha para processar o pagamento
              </p>
            </CardContent>
          </Card>
        )}

        {paymentMethod === "cash" && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Pagamento em Dinheiro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="change">Troco para quanto? (opcional)</Label>
                <Input id="change" type="number" placeholder="Ex: 100.00" step="0.01" />
              </div>
              <p className="text-sm text-muted-foreground">Deixe em branco se não precisar de troco</p>
            </CardContent>
          </Card>
        )}

        <Button className="w-full h-12 text-base font-semibold">Confirmar Pedido</Button>
      </div>
    </div>
  )
}
