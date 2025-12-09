"use client"

import { AdminLayout } from "@/components/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, ShoppingBag, Receipt } from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

// Mock data
const salesData = [
  { date: "Seg", vendas: 2400 },
  { date: "Ter", vendas: 3200 },
  { date: "Qua", vendas: 2800 },
  { date: "Qui", vendas: 3900 },
  { date: "Sex", vendas: 4500 },
  { date: "Sáb", vendas: 5200 },
  { date: "Dom", vendas: 4800 },
]

const recentOrders = [
  { id: 1, customer: "João Silva", value: 89.9, status: "Pendente" },
  { id: 2, customer: "Maria Santos", value: 125.5, status: "Processando" },
  { id: 3, customer: "Pedro Costa", value: 67.0, status: "Pendente" },
  { id: 4, customer: "Ana Lima", value: 156.8, status: "Pendente" },
]

export default function AdminPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Visão geral do seu negócio em tempo real</p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 24.580,00</div>
              <div className="flex items-center gap-1 text-xs text-accent mt-1">
                <TrendingUp className="h-3 w-3" />
                <span>+12.5% vs. semana passada</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Despesas</CardTitle>
              <Receipt className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 8.240,00</div>
              <div className="flex items-center gap-1 text-xs text-destructive mt-1">
                <TrendingUp className="h-3 w-3" />
                <span>+5.2% vs. semana passada</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pedidos Abertos</CardTitle>
              <ShoppingBag className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <span>8 aguardando preparo</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Lucro Atual</CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">R$ 16.340,00</div>
              <div className="flex items-center gap-1 text-xs text-accent mt-1">
                <TrendingUp className="h-3 w-3" />
                <span>+18.3% vs. semana passada</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Orders - Pulsing */}
          <Card className="lg:col-span-1 shadow-md animate-pulse-ring border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                Pedidos Chegando
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-sm">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.status}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">R$ {order.value.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sales Chart */}
          <Card className="lg:col-span-2 shadow-md">
            <CardHeader>
              <CardTitle>Vendas da Semana</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.65 0.19 45)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.65 0.19 45)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.005 285)" />
                  <XAxis dataKey="date" stroke="oklch(0.50 0.015 285)" />
                  <YAxis stroke="oklch(0.50 0.015 285)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.90 0.005 285)",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="vendas"
                    stroke="oklch(0.65 0.19 45)"
                    strokeWidth={2}
                    fill="url(#colorVendas)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Sales Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Vendas do Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.005 285)" />
                <XAxis dataKey="date" stroke="oklch(0.50 0.015 285)" />
                <YAxis stroke="oklch(0.50 0.015 285)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(1 0 0)",
                    border: "1px solid oklch(0.90 0.005 285)",
                    borderRadius: "0.5rem",
                  }}
                />
                <Bar dataKey="vendas" radius={[8, 8, 0, 0]}>
                  {salesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="oklch(0.65 0.19 45)" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
