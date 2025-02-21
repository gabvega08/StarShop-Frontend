'use client'

import type React from 'react'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/InputForm'
import Image from 'next/image'

export default function CreateUserForm() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden bg-starshopBackground">
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <Image
          src="/starshop-logos/StarShop-Logo.svg"
          alt="Logo"
          width={155}
          height={148}
        />
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-white drop-shadow-[0_2px_5px_rgba(168,85,247,0.5)]">
              Create your account
            </h1>
            <p className="text-muted">
              Join the next generation of digital commerce
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-white">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="username" className="text-sm text-white">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-white">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary-purple hover:bg-primary-purple/80 text-white hover:text-white-purple/90 shadow-sm shadow-[#a855f7]/50 drop-shadow-[0_3px_6px_rgba(168,85,247,0.5)] hover:drop-shadow-[0_3px_6px_rgba(168,85,247,0.5)]"
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-muted mt-3">
            Already have an account?
            <Link
              href="/signin"
              className="text-primary-purple hover:text-primary-purple/90 ml-1"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
