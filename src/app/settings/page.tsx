'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/services/firebase/firebase'
import SideNav from '@/components/layout/side-nav'
import SettingsLayout from '@/components/settings/settings-layout'

export default function SettingsPage() {
  const [isAuthChecking, setIsAuthChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/signin')
      } else {
        setIsAuthChecking(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  if (isAuthChecking) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex min-h-screen bg-[#F1F3F3]">
      <SideNav />
      <SettingsLayout />
    </div>
  )
}