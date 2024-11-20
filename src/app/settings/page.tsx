'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/services/firebase/firebase'
import { fetchWithAuth } from '@/app/utils/api'
import SideNav from '@/components/layout/side-nav'
import SettingsLayout from '@/components/settings/settings-layout'

interface Signature {
  signatureId: number;
  signatureName: string;
}

interface MemberData {
  email: string;
  firstName: string;
  lastName: string;
  memberStatusId: number;
  defaultSignatureId: number | null;
  organisationId: number;
  userSignatures: Signature[];
}

export default function SettingsPage() {
  const [isAuthChecking, setIsAuthChecking] = useState(true)
  const [memberData, setMemberData] = useState<MemberData | null>(null)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/signin') // Redirect to sign-in page if user is not authenticated
      } else {
        setIsAuthChecking(false) // Proceed if the user is authenticated
        fetchMemberData() // Fetch member data after authentication
      }
    })

    return () => unsubscribe()
  }, [router])

  // Function to fetch member data
  const fetchMemberData = async () => {
    try {
      const data = await fetchWithAuth<MemberData>('http://34.118.195.238:8080/api/v1/member')
      console.log('Member Data:', data) // Log the result to console
      setMemberData(data) // Set the member data to the state
    } catch (error) {
      console.error('Error fetching member data:', error)
      setError('Failed to fetch member data.')
    }
  }

  if (isAuthChecking) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">{error}</div>
  }

  return (
    <div className="flex min-h-screen bg-[#F1F3F3]">
      <SideNav memberData={memberData} />
      <SettingsLayout memberData={memberData} />
    </div>
  )
}