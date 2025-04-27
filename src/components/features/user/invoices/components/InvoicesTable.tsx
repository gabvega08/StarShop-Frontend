"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X, Plus, ArrowUpDown, Search, Eye, Ellipsis, MoveUp, MoveDown } from "lucide-react";
import { Input } from "@/components/ui/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type InvoiceStatus = "Paid" | "Pending" | "Overdue";

interface Invoice {
  id: string;
  client: string;
  issueDate: string;
  dueDate: string;
  amount: string;
  status: InvoiceStatus;
}

interface Filter {
  id: string;
  type: "date" | "amount";
  operator: string;
  value: string;
  display: string;
  preset?: string;
}

const invoicesData: Invoice[] = [
    { id: "INV-001", client: "Jane Doe", issueDate: "Mar 28, 2025", dueDate: "Apr 24, 2025", amount: "861.85 XLM", status: "Paid" },
    { id: "INV-002", client: "Johnathan Lee", issueDate: "Feb 26, 2025", dueDate: "Mar 17, 2025", amount: "1447.64 XLM", status: "Overdue" },
    { id: "INV-003", client: "Sophie Brooks", issueDate: "Apr 20, 2025", dueDate: "May 18, 2025", amount: "4252.72 XLM", status: "Paid" },
    { id: "INV-004", client: "Smith Smith", issueDate: "Apr 26, 2025", dueDate: "May 15, 2025", amount: "222.55 XLM", status: "Paid" },
    { id: "INV-005", client: "Paula Clark", issueDate: "Apr 27, 2025", dueDate: "May 19, 2025", amount: "573.91 XLM", status: "Pending" },
    { id: "INV-006", client: "Mia Turner", issueDate: "Apr 20, 2025", dueDate: "May 05, 2025", amount: "4048.51 XLM", status: "Pending" },
    { id: "INV-007", client: "Cornell Maze", issueDate: "Apr 20, 2025", dueDate: "May 20, 2025", amount: "4471.68 XLM", status: "Paid" },
    { id: "INV-008", client: "Sophie Brooks", issueDate: "Apr 26, 2025", dueDate: "May 23, 2025", amount: "4048.51 XLM", status: "Overdue" },
    { id: "INV-009", client: "Paula Clark", issueDate: "Mar 28, 2025", dueDate: "Apr 19, 2025", amount: "3415.83 XLM", status: "Pending" },
    { id: "INV-010", client: "Evan Scott", issueDate: "Apr 20, 2025", dueDate: "May 01, 2025", amount: "526.0 XLM", status: "Paid" },
    { id: "INV-011", client: "Jane Doe", issueDate: "Apr 20, 2025", dueDate: "May 12, 2025", amount: "1749.31 XLM", status: "Pending" },
    { id: "INV-012", client: "Smith Smith", issueDate: "Feb 26, 2025", dueDate: "Mar 18, 2025", amount: "4471.68 XLM", status: "Paid" },
    { id: "INV-013", client: "Mia Turner", issueDate: "Mar 28, 2025", dueDate: "Apr 11, 2025", amount: "230.03 XLM", status: "Pending" },
    { id: "INV-014", client: "Evan Scott", issueDate: "Apr 25, 2025", dueDate: "May 10, 2025", amount: "3184.72 XLM", status: "Paid" },
    { id: "INV-015", client: "Project Xtreme", issueDate: "Mar 20, 2025", dueDate: "Apr 14, 2025", amount: "1432.98 XLM", status: "Paid" },
    { id: "INV-016", client: "Laura Johnson", issueDate: "Apr 18, 2025", dueDate: "May 02, 2025", amount: "1749.31 XLM", status: "Overdue" },
    { id: "INV-017", client: "Smith Smith", issueDate: "Apr 05, 2025", dueDate: "Apr 25, 2025", amount: "861.85 XLM", status: "Paid" },
    { id: "INV-018", client: "Laura Johnson", issueDate: "Mar 28, 2025", dueDate: "Apr 26, 2025", amount: "1749.31 XLM", status: "Paid" },
    { id: "INV-019", client: "Johnathan Lee", issueDate: "Feb 26, 2025", dueDate: "Mar 22, 2025", amount: "230.03 XLM", status: "Overdue" },
    { id: "INV-020", client: "Project Xtreme", issueDate: "Apr 27, 2025", dueDate: "May 10, 2025", amount: "2987.4 XLM", status: "Overdue" },
    { id: "INV-021", client: "Evan Scott", issueDate: "Apr 20, 2025", dueDate: "May 20, 2025", amount: "4790.34 XLM", status: "Pending" },
    { id: "INV-022", client: "Smith Smith", issueDate: "Mar 28, 2025", dueDate: "Apr 12, 2025", amount: "246.01 XLM", status: "Pending" },
    { id: "INV-023", client: "Jane Doe", issueDate: "Apr 20, 2025", dueDate: "May 16, 2025", amount: "861.85 XLM", status: "Paid" },
    { id: "INV-024", client: "Evan Scott", issueDate: "Apr 27, 2025", dueDate: "May 27, 2025", amount: "3058.26 XLM", status: "Pending" },
    { id: "INV-025", client: "Evan Scott", issueDate: "Apr 26, 2025", dueDate: "May 10, 2025", amount: "131.84 XLM", status: "Pending" },
    { id: "INV-026", client: "Laura Johnson", issueDate: "Feb 26, 2025", dueDate: "Mar 08, 2025", amount: "2987.4 XLM", status: "Overdue" },
    { id: "INV-027", client: "Cornell Maze", issueDate: "Apr 27, 2025", dueDate: "May 10, 2025", amount: "2770.21 XLM", status: "Pending" },
    { id: "INV-028", client: "Project Xtreme", issueDate: "Apr 27, 2025", dueDate: "May 14, 2025", amount: "526.0 XLM", status: "Overdue" },
    { id: "INV-029", client: "Smith Smith", issueDate: "Mar 28, 2025", dueDate: "Apr 09, 2025", amount: "1447.64 XLM", status: "Overdue" },
    { id: "INV-030", client: "Laura Johnson", issueDate: "Mar 28, 2025", dueDate: "Apr 24, 2025", amount: "3708.71 XLM", status: "Paid" }
];
  

type SortKey = keyof Invoice;
type SortOrder = "asc" | "desc";

export default function InvoicesTable() {
  const [filter, setFilter] = useState<"All" | InvoiceStatus>("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey | "">("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  
  // Filter modal state
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<"date" | "amount">("date");
  const [dateTab, setDateTab] = useState<"preset" | "custom">("preset");
  const [datePreset, setDatePreset] = useState("last30days");
  const [dateOperator, setDateOperator] = useState("after");
  const [amountOperator, setAmountOperator] = useState(">");
  const [dateValue, setDateValue] = useState("");
  const [amountValue, setAmountValue] = useState("");
  
  // Applied filters state
  const [appliedFilters, setAppliedFilters] = useState<Filter[]>([]);

  const invoicesPerPage = 7;
  const startEntry = (currentPage - 1) * invoicesPerPage + 1;
  const endEntry = Math.min(currentPage *invoicesPerPage, invoicesData.length);


  const parseDate = (dateStr: string) => new Date(dateStr);
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  const getDateFromPreset = (preset: string): { startDate: Date, display: string } => {
    const today = new Date();
    const startDate = new Date();
    let display = "";
    
    switch (preset) {
      case "today":
        startDate.setHours(0, 0, 0, 0);
        display = "Today";
        break;
      case "yesterday":
        startDate.setDate(today.getDate() - 1);
        startDate.setHours(0, 0, 0, 0);
        display = "Yesterday";
        break;
      case "last7days":
        startDate.setDate(today.getDate() - 7);
        display = "Last 7 days";
        break;
      case "last30days":
        startDate.setDate(today.getDate() - 30);
        display = "Last 30 days";
        break;
      case "thisMonth":
        startDate.setDate(1);
        display = "This month";
        break;
      case "lastMonth":
        startDate.setMonth(today.getMonth() - 1);
        startDate.setDate(1);
        const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        startDate.setDate(lastDayOfLastMonth);
        display = "Last month";
        break;
      default:
        startDate.setDate(today.getDate() - 30);
        display = "Last 30 days";
    }
    
    return { startDate, display };
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };
  
  const handleAddFilter = () => {
    let newFilter: Filter;
    
    if (filterType === "date") {
      if (dateTab === "preset") {
        const { startDate, display } = getDateFromPreset(datePreset);
        newFilter = {
          id: Math.random().toString(36).substr(2, 9),
          type: "date",
          operator: "after",
          value: formatDate(startDate),
          display,
          preset: datePreset
        };
      } else {
        newFilter = {
          id: Math.random().toString(36).substr(2, 9),
          type: "date",
          operator: dateOperator,
          value: dateValue,
          display: `${dateOperator === "after" ? "After" : "Before"} ${dateValue}`
        };
      }
    } else {
      newFilter = {
        id: Math.random().toString(36).substr(2, 9),
        type: "amount",
        operator: amountOperator,
        value: amountValue,
        display: `Amount ${amountOperator} ${amountValue ? amountValue + " XLM": "0"}`
      };
    }
    
    setAppliedFilters([...appliedFilters, newFilter]);
    setIsFilterModalOpen(false);
    
    // Reset form values
    setDateValue("");
    setAmountValue("");
  };
  
  const removeFilter = (id: string) => {
    setAppliedFilters(appliedFilters.filter(filter => filter.id !== id));
  };

  const sortedInvoices = [...invoicesData].sort((a, b) => {
    if (!sortKey) return 0;

    let aValue = a[sortKey];
    let bValue = b[sortKey];

    if (sortKey === "amount") {
      aValue = parseFloat((aValue as string).replace(/[^0-9.-]+/g, ""));
      bValue = parseFloat((bValue as string).replace(/[^0-9.-]+/g, ""));
    } else if (sortKey === "issueDate" || sortKey === "dueDate") {
      aValue = parseDate(aValue as string).getTime();
      bValue = parseDate(bValue as string).getTime();
    } else {
      aValue = aValue.toString().toLowerCase();
      bValue = bValue.toString().toLowerCase();
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const filteredInvoices = sortedInvoices.filter(invoice => {
    const matchesStatus = filter === "All" || invoice.status === filter;
    const matchesSearch = invoice.client.toLowerCase().includes(search.toLowerCase());
    
    // Apply all active filters
    const matchesAllFilters = appliedFilters.every(filter => {
      if (filter.type === "date") {
        const issueDate = parseDate(invoice.issueDate);
        const filterDate = new Date(filter.value);
        
        if (filter.operator === "after") {
          return issueDate >= filterDate;
        } else {
          return issueDate <= filterDate;
        }
      } else if (filter.type === "amount") {
        const invoiceAmount = parseFloat(invoice.amount.replace(/[^0-9.-]+/g, ""));;
        const filterAmount = parseFloat(filter.value);
        
        switch (filter.operator) {
          case ">": return invoiceAmount > filterAmount;
          case ">=": return invoiceAmount >= filterAmount;
          case "=": return invoiceAmount === filterAmount;
          case "<=": return invoiceAmount <= filterAmount;
          case "<": return invoiceAmount < filterAmount;
          default: return true;
        }
      }
      return true;
    });

    return matchesStatus && matchesSearch && matchesAllFilters;
  });

  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * invoicesPerPage,
    currentPage * invoicesPerPage
  );

  const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [appliedFilters, filter, search]);

  return (
    <div className="w-[90%] mx-auto p-6 text-background">
      {/* Filter Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2 bg-primary rounded-md">
          {["All", "Paid", "Pending", "Overdue"].map((status) => (
            <Button
              key={status}
              variant={"default"}
              onClick={() => setFilter(status as "All" | InvoiceStatus)}
              className={`${filter === status && "bg-primary-purple hover:bg-primary-purple/80"}`}
            >
              {status}
            </Button>
          ))}
        </div>
        <div className="flex gap-2 ">
          <Input
            placeholder="Search invoices..."
            className="w-96 p-5 pl-10 outline-gray-600 border-gray-700 scale-105"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={Search}
          />
        </div>
      </div>

      {/* Active Filters Section */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
        {/* Pills */}
        {appliedFilters.map((filter) => (
            <div
            key={filter.id}
            className="flex items-center bg-primary text-background rounded-full px-2 py-1 text-base border"
            >
            {filter.display}
            <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 p-0 ml-1"
                onClick={() => removeFilter(filter.id)}
            >
                <X className="h-3 w-3" />
            </Button>
            </div>
        ))}

        {/* Add Filter Button */}
        <Button
            variant="default"
            size="sm"
            className="rounded-full flex items-center gap-1"
            onClick={() => setIsFilterModalOpen(true)}
        >
            <Plus className="h-4 w-4" />
            Add Filter
        </Button>

        {/* Clear All Button */}
        {appliedFilters.length > 0 && (
            <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={() => setAppliedFilters([])}
            >
            Clear all
            </Button>
        )}
        </div>



      {/* Filter Modal */}
      <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Filter</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="filter-type">Filter Type</Label>
              <Select 
                value={filterType}
                onValueChange={(value) => setFilterType(value as "date" | "amount")}
              >
                <SelectTrigger id="filter-type">
                  <SelectValue placeholder="Select filter type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {filterType === "date" ? (
              <Tabs value={dateTab} onValueChange={(value) => setDateTab(value as "preset" | "custom")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preset">Preset Ranges</TabsTrigger>
                  <TabsTrigger value="custom">Custom Range</TabsTrigger>
                </TabsList>
                <TabsContent value="preset" className="mt-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date-preset">Select Range</Label>
                    <RadioGroup 
                      value={datePreset} 
                      onValueChange={setDatePreset}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="today" id="today" />
                        <Label htmlFor="today">Today</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yesterday" id="yesterday" />
                        <Label htmlFor="yesterday">Yesterday</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="last7days" id="last7days" />
                        <Label htmlFor="last7days">Last 7 days</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="last30days" id="last30days" />
                        <Label htmlFor="last30days">Last 30 days</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="thisMonth" id="thisMonth" />
                        <Label htmlFor="thisMonth">This month</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="lastMonth" id="lastMonth" />
                        <Label htmlFor="lastMonth">Last month</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </TabsContent>
                <TabsContent value="custom" className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="date-operator">Condition</Label>
                      <Select 
                        value={dateOperator}
                        onValueChange={setDateOperator}
                      >
                        <SelectTrigger id="date-operator">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="after">After</SelectItem>
                          <SelectItem value="before">Before</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="date-value">Date</Label>
                      <Input 
                        id="date-value" 
                        type="date" 
                        value={dateValue}
                        onChange={(e) => setDateValue(e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount-operator">Condition</Label>
                  <Select 
                    value={amountOperator}
                    onValueChange={setAmountOperator}
                  >
                    <SelectTrigger id="amount-operator">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value=">">Greater than</SelectItem>
                      <SelectItem value=">=">Greater than or equal</SelectItem>
                      <SelectItem value="=">Equal to</SelectItem>
                      <SelectItem value="<=">Less than or equal</SelectItem>
                      <SelectItem value="<">Less than</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount-value">Amount </Label>
                  <Input 
                    id="amount-value" 
                    type="number" 
                    min="0"
                    value={amountValue}
                    onChange={(e) => setAmountValue(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFilterModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddFilter}
              disabled={(filterType === "date" && dateTab === "custom" && !dateValue) || 
                       (filterType === "amount" && !amountValue)}
            >
              Add Filter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Table Section */}
      <div className="overflow-hidden rounded-2xl shadow-lg outline outline-1 outline-gray-700 text-gray-300" style={{ borderColor: "#FFFFFF4D", borderWidth: "1px" }} >
        <div className="border-b border-gray-600 rounded-t-md p-8">
            <table className="w-full table-auto text-base">
            <thead className="">
                <tr>
                {[
                    { label: "Invoice #", key: "id" },
                    { label: "Client", key: "client" },
                    { label: "Issue Date", key: "issueDate" },
                    { label: "Due Date", key: "dueDate" },
                    { label: "Amount", key: "amount" },
                    { label: "Status", key: "status" },
                ].map(({ label, key }) => (
                    <th
                    key={key}
                    className={`p-4 cursor-pointer select-none font-medium ${key === "status" ? "!text-center": "text-left" }`}
                    onClick={() => handleSort(key as SortKey)}
                    >
                    <div className="flex items-center justify-left gap-1">
                        {label}
                        {sortKey === key ? (
                        sortOrder === "asc" ? (
                            <MoveUp className="w-4 h-4" />
                        ) : (
                            <MoveDown className="w-4 h-4" />
                        )
                        ) : (
                        <ArrowUpDown className="w-4 h-4 opacity-50" />
                        )}
                    </div>
                    </th>
                ))}
                <th className="p-4 w-fit text-right font-medium">Actions</th>
                </tr>
            </thead>
            <tbody>
                {paginatedInvoices.length > 0 ? (
                paginatedInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-gray-800 border-t">
                    <td className="p-4 text-white">{invoice.id}</td>
                    <td className="p-4">{invoice.client}</td>
                    <td className="p-4">{invoice.issueDate}</td>
                    <td className="p-4">{invoice.dueDate}</td>
                    <td className="p-4 text-white">{invoice.amount}</td>
                    <td className="p-4 w-1 text-center">
                        <span
                        className={cn(
                            "px-2 py-1 rounded-full text-xs font-semibold ",
                            invoice.status === "Paid" && "bg-[#142324] text-green-600",
                            invoice.status === "Pending" && "bg-[#2a1f1c] text-yellow-600",
                            invoice.status === "Overdue" && "bg-[#291622] text-red-600"
                        )}
                        >
                        {invoice.status}
                        </span>
                    </td>
                    <td className=" text-right text-white">
                        <Button size="default" variant="ghost">
                            <Eye className="mr-3 "/>
                            <p>View</p>
                            <Ellipsis className="ml-3"/>
                        </Button>
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan={7} className="p-4 text-center text-muted-foreground">
                    No invoices match your filter criteria
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center p-4 py-3 border-b border-gray-600 rounded-b-lg">
          <span className="text-sm">
            Showing {startEntry} - {endEntry} of {invoicesData.length} invoices
          </span>
          <div className="flex space-x-3 items-center">
            <Button
                variant="ghost"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
            >
                 Previous
            </Button>
            <Button
                variant="outline"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="bg-transparent border-gray-600"
            >
                Next 
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}