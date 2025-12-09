"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FinancialSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Chave PIX</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pix-type">Tipo de Chave</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cpf">CPF</SelectItem>
                  <SelectItem value="cnpj">CNPJ</SelectItem>
                  <SelectItem value="email">E-mail</SelectItem>
                  <SelectItem value="phone">Telefone</SelectItem>
                  <SelectItem value="random">Chave Aleatória</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pix-key">Chave PIX</Label>
              <Input id="pix-key" placeholder="Digite a chave PIX" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pix-name">Nome do Titular</Label>
            <Input id="pix-name" placeholder="Nome completo do titular" />
          </div>
          <Button>Salvar Chave PIX</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Taxa de Entrega</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="delivery-fee">Valor da Taxa (R$)</Label>
            <Input id="delivery-fee" type="number" placeholder="0.00" step="0.01" defaultValue="5.00" />
          </div>
          <Button>Atualizar Taxa</Button>
        </CardContent>
      </Card>
    </div>
  )
}
