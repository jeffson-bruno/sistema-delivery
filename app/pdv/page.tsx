"use client"

import { AdminLayout } from "@/components/layouts/admin-layout"
import { PDVInterface } from "@/components/pdv/pdv-interface"

export default function PDVPage() {
  return (
    <AdminLayout>
      <PDVInterface />
    </AdminLayout>
  )
}
