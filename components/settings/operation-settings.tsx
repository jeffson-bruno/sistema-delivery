"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

const daysOfWeek = [
  { id: "monday", label: "Segunda-feira" },
  { id: "tuesday", label: "Terça-feira" },
  { id: "wednesday", label: "Quarta-feira" },
  { id: "thursday", label: "Quinta-feira" },
  { id: "friday", label: "Sexta-feira" },
  { id: "saturday", label: "Sábado" },
  { id: "sunday", label: "Domingo" },
]

export function OperationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Horário de Funcionamento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {daysOfWeek.map((day) => (
          <div key={day.id} className="flex items-center gap-4">
            <div className="flex items-center space-x-2 w-40">
              <Checkbox id={day.id} defaultChecked />
              <Label htmlFor={day.id} className="text-sm font-medium">
                {day.label}
              </Label>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <Input type="time" defaultValue="11:00" className="w-32" />
              <span className="text-muted-foreground">até</span>
              <Input type="time" defaultValue="23:00" className="w-32" />
            </div>
          </div>
        ))}
        <Button className="w-full md:w-auto">Salvar Horários</Button>
      </CardContent>
    </Card>
  )
}
