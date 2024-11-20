'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Archive, Bell, LogOut, PieChart, Settings, Folders, CircleUser } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from 'firebase/auth'
import { auth } from '@/services/firebase/firebase'

const mainNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: PieChart },
  { name: 'Projects', href: '/projects', icon: Folders },
  { name: 'Archive', href: '/archive', icon: Archive },
]

const bottomNavItems = [
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Management', href: '/management', icon: CircleUser },
  { name: 'Settings', href: '/settings', icon: Settings },
]

interface SideNavProps {
  memberData: {
    firstName: string;
    lastName: string;
  } | null;
}

export default function SideNav({ memberData }: SideNavProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      // Call your logout API route
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/signin')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav className="w-[200px] bg-[#FDFDFD] h-screen flex flex-col border-r">
      <div className="flex justify-center mt-6 mb-12">
        <img src="/icons/Owl.svg" alt="Owl Logo" className="w-[98px] h-[72px]" />
      </div>

      {/* Main Navigation */}
      <ul className="flex-1">
        {mainNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-5 py-3 typography-body-medium-regular text-[#5E6E7A] hover:bg-gray-50 ${isActive ? 'text-blue-600' : ''}`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>

      <div className='flex flex-col gap-[16px] border-t-[1px] border-t-[#C3C9CD] pt-[16px]'>
        {/* User Profile */}
        <div className="px-5">
          <div className="flex items-center gap-3">
            <Avatar className="w-[48px] h-[48px]">
              <AvatarImage src="/icons/Avatar.png" alt={`${memberData?.firstName} ${memberData?.lastName}`} />
              <AvatarFallback>{memberData ? `${memberData.firstName[0]}${memberData.lastName[0]}` : 'JL'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="typography-button-medium-semibold text-[#364A59]">{memberData ? `${memberData.firstName} ${memberData.lastName}` : 'John Lee'}</span>
              <span className="typography-body-small-regular text-[#364A59]">Admin</span>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <ul>
          {bottomNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-5 py-3 ${isActive ? 'bg-[#E7F5FF]' : ''}`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#1971C2]' : 'text-[#5E6E7A]'}`} />
                  <span className={`${isActive ? 'typography-body-medium-semibold text-[#1971C2]' : 'typography-body-medium-regular text-[#5E6E7A]'}`}>{item.name}</span>
                </Link>
              </li>
            )
          })}

          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-5 py-3 text-gray-600 hover:bg-gray-50 w-full text-left"
            >
              <LogOut className="w-5 h-5" />
              <span>Log out</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
