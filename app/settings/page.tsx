"use client"

import { AdminLayout } from "@/components/layouts/admin-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersSettings } from "@/components/settings/users-settings"
import { FinancialSettings } from "@/components/settings/financial-settings"
import { OperationSettings } from "@/components/settings/operation-settings"
import { ProductsSettings } from "@/components/settings/products-settings"

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground mt-1">Gerencie usuários, produtos e configurações do sistema</p>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="financial">Financeiro</TabsTrigger>
            <TabsTrigger value="operation">Operação</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <UsersSettings />
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <FinancialSettings />
          </TabsContent>

          <TabsContent value="operation" className="space-y-4">
            <OperationSettings />
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <ProductsSettings />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
