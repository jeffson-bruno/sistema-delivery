"use client"

import { AdminLayout } from "@/components/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Printer, TrendingUp, DollarSign } from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const dailySales = [
  { hour: "08h", vendas: 450 },
  { hour: "10h", vendas: 820 },
  { hour: "12h", vendas: 1950 },
  { hour: "14h", vendas: 1200 },
  { hour: "16h", vendas: 890 },
  { hour: "18h", vendas: 2100 },
  { hour: "20h", vendas: 2450 },
  { hour: "22h", vendas: 1100 },
]

const weeklySales = [
  { day: "Seg", vendas: 4200 },
  { day: "Ter", vendas: 5100 },
  { day: "Qua", vendas: 4800 },
  { day: "Qui", vendas: 6200 },
  { day: "Sex", vendas: 7500 },
  { day: "Sáb", vendas: 9800 },
  { day: "Dom", vendas: 8200 },
]

const profitData = [
  { name: "Entradas", value: 24580, color: "oklch(0.58 0.16 155)" },
  { name: "Gastos", value: 8240, color: "oklch(0.59 0.23 25)" },
]

export default function ReportsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
            <p className="text-muted-foreground mt-1">Análise detalhada das suas vendas e finanças</p>
          </div>
        </div>

        {/* Print Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
            <Printer className="h-5 w-5" />
            <span className="text-sm font-semibold">Relatório do Dia</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
            <Printer className="h-5 w-5" />
            <span className="text-sm font-semibold">Relatório da Semana</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
            <Printer className="h-5 w-5" />
            <span className="text-sm font-semibold">Relatório do Mês</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
            <Printer className="h-5 w-5" />
            <span className="text-sm font-semibold">Relatório do Ano</span>
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Tendência de Lucro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent mb-4">R$ 16.340,00</div>
              <ResponsiveContainer width="100%" height={100}>
                <AreaChart data={weeklySales.slice(0, 7)}>
                  <defs>
                    <linearGradient id="colorLucro" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.58 0.16 155)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.58 0.16 155)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="vendas"
                    stroke="oklch(0.58 0.16 155)"
                    strokeWidth={2}
                    fill="url(#colorLucro)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Entradas vs. Gastos
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Entradas</p>
                  <p className="text-2xl font-bold text-accent">R$ 24.580</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gastos</p>
                  <p className="text-2xl font-bold text-destructive">R$ 8.240</p>
                </div>
              </div>
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie
                    data={profitData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {profitData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Daily Sales Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Vendas do Dia (Hora a Hora)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={dailySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.005 285)" />
                <XAxis dataKey="hour" stroke="oklch(0.50 0.015 285)" />
                <YAxis stroke="oklch(0.50 0.015 285)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(1 0 0)",
                    border: "1px solid oklch(0.90 0.005 285)",
                    borderRadius: "0.5rem",
                  }}
                />
                <Bar dataKey="vendas" fill="oklch(0.65 0.19 45)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Sales Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Vendas da Semana (Dia a Dia)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={weeklySales}>
                <defs>
                  <linearGradient id="colorWeekly" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.58 0.16 155)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="oklch(0.58 0.16 155)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.005 285)" />
                <XAxis dataKey="day" stroke="oklch(0.50 0.015 285)" />
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
                  stroke="oklch(0.58 0.16 155)"
                  strokeWidth={3}
                  fill="url(#colorWeekly)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
