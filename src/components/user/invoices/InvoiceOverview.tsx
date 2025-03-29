"use client"

import { useState } from "react"
import {
    Download,
    FileText,
    PieChart,
    DollarSign,
    ArrowUpRight,
    Bell,
    Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function InvoicesPage() {
    const [selectedButton, setSelectedButton] = useState('invoice');

    const handleButtonSelect = (buttonId: string) => {
        setSelectedButton(buttonId);
    };

    return (
        <div className="min-h-screen text-white bg-stars">
            <main className="container mx-auto px-4 py-8 bg-stars">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Invoices</h1>
                        <p className="text-white/60 text-sm mt-1">Manage and track your business invoices</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="border-gray-700 text-white gap-2 bg-transparent hover:bg-gray-800/30 hover:text-white">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-purple-600 border-brightness-100 hover:bg-purple-700 hover:brightness-110 transition-all glow">
                                    <Plus className="h-4 w-4 mr-2" />
                                    New Invoice
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-[#13111E] border border-white/20 text-white">
                                <DialogHeader>
                                    <DialogTitle>Coming Soon</DialogTitle>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Dashboard Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Stats Cards */}
                    <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-transparent border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center justify-between text-white">
                                    <span>Total Outstanding</span>
                                    <DollarSign className="h-5 w-5 text-purple-400" />
                                </CardTitle>
                                <CardDescription className="text-white/60">Pending + Overdue invoices</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">1,240 XLM</div>
                                <div className="mt-1 flex items-center text-sm text-red-400">
                                    <ArrowUpRight className="h-4 w-4 mr-1" />
                                    <span>+12.5% from last month</span>
                                </div>
                                <div className="mt-4 h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-600 rounded-full" style={{ width: "65%" }}></div>
                                </div>
                                <div className="mt-2 flex justify-between text-xs text-white/60">
                                    <span>0 XLM</span>
                                    <span>2,000 XLM</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-transparent border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center justify-between text-white">
                                    <span>Invoice Status</span>
                                    <FileText className="h-5 w-5 text-purple-400" />
                                </CardTitle>
                                <CardDescription className="text-white/60">Distribution by status</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-center py-2">
                                    <div className="relative h-32 w-32">
                                        <PieChart className="h-32 w-32 text-purple-500 opacity-50 absolute" />
                                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                                            <span className="text-2xl font-bold text-white">124</span>
                                            <span className="text-xs text-white/60">Total</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                                    <div className="rounded-md bg-green-500/10 p-2">
                                        <div className="text-lg font-bold text-green-400">98</div>
                                        <div className="text-xs text-white/60">Paid</div>
                                    </div>
                                    <div className="rounded-md bg-amber-500/10 p-2">
                                        <div className="text-lg font-bold text-amber-400">18</div>
                                        <div className="text-xs text-white/60">Pending</div>
                                    </div>
                                    <div className="rounded-md bg-red-500/10 p-2">
                                        <div className="text-lg font-bold text-red-400">8</div>
                                        <div className="text-xs text-white/60">Overdue</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <Card className="bg-transparent border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        <CardHeader>
                            <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
                            <CardDescription className="text-white/60">Common invoice tasks</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button
                                variant="ghost"
                                className={`w-full justify-start ${selectedButton === 'invoice' ? 'bg-purple-600/20 border border-purple-500/20' : 'bg-transparent'
                                    } hover:bg-purple-600/30 text-white hover:text-white border border-white/10`}
                                onClick={() => handleButtonSelect('invoice')}
                            >
                                <FileText className="h-4 w-4 mr-2" />
                                Create New Invoice
                            </Button>
                            <Button
                                variant="ghost"
                                className={`w-full justify-start ${selectedButton === 'reminders' ? 'bg-purple-600/20 border border-purple-500/20' : 'bg-transparent'
                                    } hover:bg-purple-600/30 text-white hover:text-white border border-white/10`}
                                onClick={() => handleButtonSelect('reminders')}
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Send Payment Reminders
                            </Button>
                            <Button
                                variant="ghost"
                                className={`w-full justify-start ${selectedButton === 'calendar' ? 'bg-purple-600/20 border border-purple-500/20' : 'bg-transparent'
                                    } hover:bg-purple-600/30 text-white hover:text-white border border-white/10`}
                                onClick={() => handleButtonSelect('calendar')}
                            >
                                <Bell className="h-4 w-4 mr-2" />
                                View Due Date Calendar
                            </Button>
                            <Button
                                variant="ghost"
                                className={`w-full justify-start ${selectedButton === 'export' ? 'bg-purple-600/20 border border-purple-500/20' : 'bg-transparent'
                                    } hover:bg-purple-600/30 text-white hover:text-white border border-white/10`}
                                onClick={() => handleButtonSelect('export')}
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Export Invoice Report
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}

