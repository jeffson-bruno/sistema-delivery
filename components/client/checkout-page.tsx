"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <Link href="/menu">
          <Button variant="ghost" className="mb-6">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Voltar ao Cardápio
          </Button>
        </Link>

        <h1 className="text-3xl font-bold mb-6">Dados de Entrega</h1>

        <form className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" placeholder="Seu nome" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nickname">Apelido (opcional)</Label>
                  <Input id="nickname" placeholder="Como prefere ser chamado" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" type="tel" placeholder="(11) 99999-9999" required />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Endereço de Entrega</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2 md:col-span-3">
                  <Label htmlFor="street">Rua</Label>
                  <Input id="street" placeholder="Nome da rua" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number">Número</Label>
                  <Input id="number" placeholder="Nº" required />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="complement">Complemento</Label>
                  <Input id="complement" placeholder="Apto, bloco..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input id="neighborhood" placeholder="Seu bairro" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reference">Ponto de Referência</Label>
                <Input id="reference" placeholder="Ex: Próximo ao mercado" />
              </div>
            </CardContent>
          </Card>

          <Link href="/menu/payment">
            <Button type="button" className="w-full h-12 text-base font-semibold">
              Continuar para Pagamento
            </Button>
          </Link>
        </form>
      </div>
    </div>
  )
}
