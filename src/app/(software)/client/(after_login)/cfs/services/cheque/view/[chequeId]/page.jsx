import { useParams } from 'next/navigation'
import React from 'react'

export default function ChequeViewPage() {
  const { chequeId } = useParams();

  return (
    <div>ChequeViewPage</div>
  )
}
