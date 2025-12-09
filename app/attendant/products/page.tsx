"use client"

import { AttendantLayout } from "@/components/layouts/attendant-layout"
import { ProductsSettings } from "@/components/settings/products-settings"

export default function AttendantProductsPage() {
  return (
    <AttendantLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Atualização de Produtos</h1>
          <p className="text-muted-foreground mt-1">Adicione, edite ou remova produtos do cardápio</p>
        </div>
        <ProductsSettings />
      </div>
    </AttendantLayout>
  )
}
