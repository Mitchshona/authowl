'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/services/firebase/firebase'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from 'next/image'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthChecking, setIsAuthChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await storeUserToken(user)
        router.push('/settings')
      } else {
        setIsAuthChecking(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  const validateForm = () => {
    if (!email || !password) {
      setError('Email and password are required.')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.')
      return false
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return false
    }
    return true
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const storeUserToken = async (user: User) => {
    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      if (!response.ok) {
        throw new Error('Failed to store session')
      }
    } catch (error) {
      console.error('Error storing user token:', error)
      setError('An error occurred while signing in. Please try again.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      await storeUserToken(userCredential.user)
      router.push('/settings')
    } catch (error) {
      setError('Failed to sign in. Please check your email and password.')
      console.error('Sign-in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isAuthChecking) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/icons/background.png')] bg-cover bg-center">
      <div className="h-min-[483px] w-[373px] rounded-[8px] bg-[#FDFDFD] py-[20px] px-[32px]">
        <div className='flex justify-center'>
          <Image src="/icons/Owl.svg" alt="owl logo" width={117} height={86} className='w-[117px] h-[86px]'/>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[16px]">
            <div className='flex flex-col gap-[4px]'>
              <Label htmlFor="email-address" className='typography-label-small-caps-semibold uppercase text-[#5E6E7A]'>
                Email
              </Label>
              <div className='relative flex items-center'>
                <Image 
                  src='/icons/Envelope.svg'
                  alt='envelope icon'
                  width={20} 
                  height={20}
                  className='absolute left-[20px] top-1/2 transform -translate-y-1/2 w-[20px] h-[20px]'
                />
                <Input
                  id="email-address"
                  name="email"
                  type="text"
                  className="rounded-[8px] border-[1px] border-[#AFB7BD] py-[12px] px-[24px] pl-[50px]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className='flex flex-col gap-[4px]'>
              <Label htmlFor="password" className='typography-label-small-caps-semibold uppercase text-[#5E6E7A]'>
                PASSWORD
              </Label>
              <div className='relative flex items-center'>
                <Image 
                  src='/icons/Lock.svg'
                  alt='lock icon'
                  width={20} 
                  height={20}
                  className='absolute left-[20px] top-1/2 transform -translate-y-1/2 w-[20px] h-[20px]'
                />
                <Input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? "text" : "password"} 
                  autoComplete="current-password"
                  className="rounded-[8px] border-[1px] border-[#AFB7BD] py-[12px] px-[24px] pl-[50px]" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Image
                  src={isPasswordVisible ? "/icons/eye-opened.svg" : "/icons/eye-closed.svg"}
                  alt={isPasswordVisible ? "Hide password" : "Show password"}
                  width={20} 
                  height={20}
                  className='absolute right-[20px] top-1/2 transform -translate-y-1/2 cursor-pointer'
                  onClick={togglePasswordVisibility} 
                />
              </div>
              <Link href="/forgot-password" className="typography-small-underline text-[#145A9B]">
                Forgot password?
              </Link>
            </div>

            <div className="flex items-center">
              <Checkbox
                id="remember-me"
                name="remember-me"
              />
              <Label htmlFor="remember-me" className="typography-label-medium-regular text-[#364A59] ml-[12px] ">
                Stay signed in
              </Label>
            </div>

            {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            )}
          </div>
          
          <div className='flex justify-center mt-[32px]'>
            <Button
              type="submit"
              className="w-full w-[97px] h-[56px] bg-[#1971C2] rounded-[8px] text-[#FDFDFD] typography-button-large-semibold"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in' : 'Log in'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
