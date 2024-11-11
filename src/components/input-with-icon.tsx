'use client'

import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputWithIconProps {
  label: string
  id: string
  name: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  iconSrc: string
  iconAlt: string
}

export default function InputWithIcon({
  label,
  id,
  name,
  type,
  value,
  onChange,
  iconSrc,
  iconAlt
}: InputWithIconProps) {
  return (
    <div className='flex flex-col gap-[4px]'>
      <Label htmlFor={id} className='typography-label-small-caps-semibold uppercase text-[#5E6E7A]'>
        {label}
      </Label>
      <div className='relative flex items-center'>
        <img 
          src={iconSrc} 
          alt={iconAlt} 
          className='absolute left-[20px] top-1/2 transform -translate-y-1/2 w-[20px] h-[20px]'
        />
        <Input
          id={id}
          name={name}
          type={type}
          className="rounded-[8px] border-[1px] border-[#AFB7BD] py-[12px] px-[24px] pl-[50px]"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}