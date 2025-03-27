'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MessageSquare, ExternalLink } from 'lucide-react'

export function FAQSupportSection() {
    return (
        <div className="py-8 px-6 rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-white mb-2">
                Still Have Questions?
            </h2>
            <p className="text-gray-400 mb-6">
                If you couldn’t find the answer to your question, our support team is here to help.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                    asChild
                    className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2"
                >
                    <Link href="/contact-support" className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Contact Support
                    </Link>
                </Button>
                <Button
                    asChild
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-gray-400/50 font-medium py-2 px-6 rounded-lg flex items-center gap-2"
                >
                    <Link href="/community-forum" className="flex items-center gap-2">
                        <ExternalLink className="w-5 h-5" />
                        Visit Community Forum
                    </Link>
                </Button>
            </div>
        </div>
    )
}
