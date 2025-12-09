"use client"

import { AttendantLayout } from "@/components/layouts/attendant-layout"
import { PDVInterface } from "@/components/pdv/pdv-interface"

export default function AttendantPage() {
  return (
    <AttendantLayout>
      <PDVInterface />
    </AttendantLayout>
  )
}
