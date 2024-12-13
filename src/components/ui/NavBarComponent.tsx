"use client"

import { FC, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CircleUserRound, Menu, X } from 'lucide-react'

const navItems = [
    {
        name: "Dashboard",
        href: "/dashboard",
    },
    {
        name: "Products",
        href: "/products",
    },
    {
        name: "Settings",
        href: "/settings",
    },
]

