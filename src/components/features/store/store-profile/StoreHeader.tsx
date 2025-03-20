import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Globe, Edit } from "lucide-react"

export function StoreHeader() {
  return (
    <div className="rounded-lg border border-white/50 bg-[#0F0E1D] p-8 animated-border shadow-[0_0_8px_rgba(255,255,255,0.2)]">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-32 h-32 overflow-hidden rounded-full border-2 border-purple-500/20 flex-shrink-0">
            <Image
              src="/placeholder.svg"
              alt="Store Logo"
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-white mb-2">Urban Style Store</h2>
            <p className="text-purple-400 mb-4">Premium Fashion Destination</p>
            <p className="text-sm text-white/60 max-w-md">
              A curated collection of urban streetwear and contemporary fashion pieces for the style-conscious
              individual.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-end gap-4">
          <Button
            variant="outline"
            size="sm"
            className="border-purple-500/20 bg-purple-500/10 hover:bg-purple-500/20"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Store
          </Button>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <MapPin className="h-4 w-4" />
              <span>New York, USA</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Globe className="h-4 w-4" />
              {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a href="#" className="hover:text-purple-400">
                urbanstyle.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Mail className="h-4 w-4" />
              {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a href="#" className="hover:text-purple-400">
                contact@urbanstyle.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
