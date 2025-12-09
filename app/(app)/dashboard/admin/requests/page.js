"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import {
  CheckCircle2,
  Clock,
  Search,
  ShieldAlert,
  User,
  XCircle,
} from "lucide-react";
import producerService from "@/app/services/producerService";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await producerService.getProducerRequests();
      setRequests(data.data); // Assuming paginated response has data.data
    } catch (error) {
      console.error("Failed to fetch requests:", error);
      // toast.error("Error", {
      //     description: "Failed to load producer requests."
      // });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await producerService.approveProducerRequest(id);
      toast.success("Approved", {
        description: "Producer request approved successfully.",
      });
      fetchRequests(); // Refresh list
    } catch (error) {
      toast.error("Error", {
        description: "Failed to approve request.",
      });
    }
  };

  const handleReject = async (id) => {
    try {
      await producerService.rejectProducerRequest(id);
      toast.success("Rejected", {
        description: "Producer request rejected.",
      });
      fetchRequests(); // Refresh list
    } catch (error) {
      toast.error("Error", {
        description: "Failed to reject request.",
      });
    }
  };

  const filteredRequests = requests.filter(
    (req) =>
      req.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.user?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.display_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Spinner className="w-10 h-10 text-violet-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans p-6 lg:p-10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <ShieldAlert className="w-8 h-8 text-violet-400" />
              Producer Requests
            </h1>
            <p className="text-neutral-400 mt-2 text-lg">
              Review and manage incoming producer applications.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-4 h-4" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-neutral-900/50 border-white/10 text-white placeholder:text-neutral-500 focus-visible:ring-violet-500"
            />
          </div>
        </div>

        {/* Content Card */}
        <Card className="bg-neutral-900/50 backdrop-blur-md border border-white/5 shadow-2xl overflow-hidden">
          <CardHeader className="border-b border-white/5 pb-4">
            <CardTitle className="text-white text-lg">
              Pending Applications
            </CardTitle>
            <CardDescription className="text-neutral-400">
              {filteredRequests.length} pending request
              {filteredRequests.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            {filteredRequests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-neutral-800/50 rounded-full flex items-center justify-center mb-4 border border-white/5">
                  <User className="w-8 h-8 text-neutral-500" />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">
                  No requests found
                </h3>
                <p className="text-neutral-500 text-sm">
                  All caught up! New requests will appear here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-white/2">
                    <TableRow className="border-white/5 hover:bg-transparent">
                      <TableHead className="text-neutral-400 font-medium pl-6">
                        User Details
                      </TableHead>
                      <TableHead className="text-neutral-400 font-medium">
                        Proposed Name
                      </TableHead>
                      <TableHead className="text-neutral-400 font-medium">
                        Bio
                      </TableHead>
                      <TableHead className="text-neutral-400 font-medium">
                        Status
                      </TableHead>
                      <TableHead className="text-neutral-400 font-medium text-right pr-6">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((req) => (
                      <TableRow
                        key={req.id}
                        className="border-white/5 hover:bg-white/2 transition-colors"
                      >
                        {/* User Column */}
                        <TableCell className="pl-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border border-white/10">
                              <AvatarFallback className="bg-neutral-800 text-neutral-400 font-medium">
                                {req.user.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-white">
                                {req.user.name}
                              </div>
                              <div className="text-xs text-neutral-500">
                                {req.user.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        {/* Display Name */}
                        <TableCell className="text-neutral-300 font-medium">
                          {req.display_name}
                        </TableCell>

                        {/* Bio */}
                        <TableCell className="max-w-[300px]">
                          <p
                            className="text-sm text-neutral-400 truncate"
                            title={req.bio}
                          >
                            {req.bio || (
                              <span className="italic text-neutral-600">
                                No bio provided
                              </span>
                            )}
                          </p>
                        </TableCell>

                        {/* Status */}
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 flex w-fit items-center gap-1.5"
                          >
                            <Clock className="w-3 h-3" />
                            {req.status}
                          </Badge>
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="text-right pr-6">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApprove(req.id)}
                              className="h-9 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400"
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Approve
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReject(req.id)}
                              className="h-9 border-red-500/20 text-red-500 hover:bg-red-500/10 hover:text-red-400"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
        <Toaster
          position="bottom-right"
          duration={5000}
          richColors
          className="text-white bg-neutral-950 border-neutral-800 shadow-lg"
        />
      </div>
    </div>
  );
}
