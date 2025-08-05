// app/InboxPage.tsx
"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Inbox as InboxIcon,
  Archive,
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingUp,
  Filter,
  RefreshCw,
  Inbox,
} from "lucide-react";
import { InboxCard } from "@/components/InboxCard";
import {
  InboxMessage,
  mockInboxData,
  MessageType,
  MessagePriority,
  MessageStatus,
  filterMessages,
  calculateStats,
} from "@/lib/dataInbox";

export default function InboxPage() {
  const [messages, setMessages] = useState<InboxMessage[]>(mockInboxData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<MessageType | "all">("all");
  const [filterPriority, setFilterPriority] = useState<MessagePriority | "all">(
    "all"
  );
  const [activeTab, setActiveTab] = useState<MessageStatus | "all">("all");

  // Calculate statistics
  const stats = calculateStats(messages);

  // Filter messages based on current filters and tab
  const filteredMessages = filterMessages(messages, {
    search: searchQuery,
    type: filterType,
    priority: filterPriority,
    status: activeTab === "all" ? undefined : activeTab,
  });

  // Action handlers
  const handleMarkAsRead = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, status: "read" as MessageStatus } : msg
      )
    );
  };

  const handleArchive = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, status: "archived" as MessageStatus } : msg
      )
    );
  };

  const handleApprove = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              status: "read" as MessageStatus,
              actionRequired: false,
            }
          : msg
      )
    );
  };

  const handleReject = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              status: "read" as MessageStatus,
              actionRequired: false,
            }
          : msg
      )
    );
  };

  const handleDelete = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.status === "unread"
          ? { ...msg, status: "read" as MessageStatus }
          : msg
      )
    );
  };

  const handleRefresh = () => {
    // Simulate refresh - in real app this would fetch from API
    setMessages([...mockInboxData]);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilterType("all");
    setFilterPriority("all");
    setActiveTab("all");
  };

  return (
    <div className="flex-1 space-y-6 p-6 dark:bg-black bg-white min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-medium dark:text-white text-black">
            Inbox
          </h1>
          <p className="text-muted-foreground mt-1">
            Kelola pesan dan notifikasi sistem PT. Pupuk Kujang
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="px-3 py-1.5">
            <InboxIcon className="h-4 w-4 mr-1.5" />
            {stats.unread} Belum Dibaca
          </Badge>
          {stats.actionRequired > 0 && (
            <Badge variant="destructive" className="px-3 py-1.5 animate-pulse">
              <AlertTriangle className="h-4 w-4 mr-1.5" />
              {stats.actionRequired} Perlu Tindakan
            </Badge>
          )}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex items-center gap-4">
            <Inbox
              size={45}
              className="rounded-lg bg-blue-500/30 border-1 border-blue-500/50 p-2 text-blue-500 shadow-lg"
            />
            <div className="flex flex-col gap-1">
              <CardTitle>Create Project</CardTitle>
              <CardDescription>{stats.unread}</CardDescription>
            </div>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">
                  Perlu Tindakan
                </p>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.actionRequired}
                </div>
                <p className="text-xs text-gray-500">memerlukan respons</p>
              </div>
              <div className="rounded-lg bg-red-500/10 p-3 border border-red-500/20">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">
                  Prioritas Tinggi
                </p>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.highPriority}
                </div>
                <p className="text-xs text-gray-500">pesan penting</p>
              </div>
              <div className="rounded-lg bg-amber-500/10 p-3 border border-amber-500/20">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">Diarsipkan</p>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.archived}
                </div>
                <p className="text-xs text-gray-500">pesan tersimpan</p>
              </div>
              <div className="rounded-lg bg-green-500/10 p-3 border border-green-500/20">
                <Archive className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cari pesan, pengirim, atau konten..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-2">
          <Select
            value={filterType}
            onValueChange={(value) =>
              setFilterType(value as MessageType | "all")
            }
          >
            <SelectTrigger className="w-36 h-10">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Tipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tipe</SelectItem>
              <SelectItem value="system">Sistem</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="alert">Alert</SelectItem>
              <SelectItem value="reminder">Pengingat</SelectItem>
              <SelectItem value="approval">Persetujuan</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filterPriority}
            onValueChange={(value) =>
              setFilterPriority(value as MessagePriority | "all")
            }
          >
            <SelectTrigger className="w-36 h-10">
              <Clock className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Prioritas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Prioritas</SelectItem>
              <SelectItem value="high">Tinggi</SelectItem>
              <SelectItem value="medium">Sedang</SelectItem>
              <SelectItem value="low">Rendah</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={handleMarkAllAsRead}
            disabled={stats.unread === 0}
            className="h-10"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Tandai Semua Dibaca
          </Button>

          <Button variant="outline" onClick={handleRefresh} className="h-10">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>

          {(searchQuery ||
            filterType !== "all" ||
            filterPriority !== "all") && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="h-10 text-gray-500"
            >
              Reset Filter
            </Button>
          )}
        </div>
      </div>

      {/* Messages Tabs and Content */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as MessageStatus | "all")}
      >
        <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4 h-11">
          <TabsTrigger value="all" className="px-4">
            Semua ({stats.total})
          </TabsTrigger>
          <TabsTrigger value="unread" className="px-4">
            Belum Dibaca ({stats.unread})
          </TabsTrigger>
          <TabsTrigger value="read" className="px-4">
            Sudah Dibaca ({stats.total - stats.unread - stats.archived})
          </TabsTrigger>
          <TabsTrigger value="archived" className="px-4">
            Arsip ({stats.archived})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {/* Messages List */}
          <div className="space-y-4">
            {filteredMessages.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <InboxIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Tidak ada pesan ditemukan
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {searchQuery ||
                    filterType !== "all" ||
                    filterPriority !== "all"
                      ? "Coba sesuaikan kriteria pencarian atau filter Anda"
                      : "Belum ada pesan dalam kategori ini"}
                  </p>
                  {(searchQuery ||
                    filterType !== "all" ||
                    filterPriority !== "all") && (
                    <Button variant="outline" onClick={clearFilters}>
                      Reset Semua Filter
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Results info */}
                <div className="flex items-center justify-between text-sm text-gray-600 bg-white p-3 rounded-lg border">
                  <span>
                    Menampilkan {filteredMessages.length} dari {messages.length}{" "}
                    pesan
                    {activeTab !== "all" &&
                      ` dalam kategori ${
                        activeTab === "unread"
                          ? "belum dibaca"
                          : activeTab === "read"
                          ? "sudah dibaca"
                          : "arsip"
                      }`}
                  </span>

                  {filteredMessages.filter(
                    (m) => m.actionRequired && m.status !== "archived"
                  ).length > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {
                        filteredMessages.filter(
                          (m) => m.actionRequired && m.status !== "archived"
                        ).length
                      }{" "}
                      perlu tindakan
                    </Badge>
                  )}
                </div>

                {/* Message Cards */}
                {filteredMessages.map((message) => (
                  <InboxCard
                    key={message.id}
                    message={message}
                    onMarkAsRead={handleMarkAsRead}
                    onArchive={handleArchive}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onDelete={handleDelete}
                  />
                ))}
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
