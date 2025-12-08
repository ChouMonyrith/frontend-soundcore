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
import { CheckCircle2, XCircle } from "lucide-react";
import producerService from "@/app/services/producerService";

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Producer Requests
          </h2>
          <p className="text-muted-foreground">
            Manage users requesting producer status.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Requests</CardTitle>
          <CardDescription>
            Review and manage incoming producer applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No pending requests found.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Display Name</TableHead>
                  <TableHead>Bio</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>
                      <div className="font-medium">{req.user.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {req.user.email}
                      </div>
                    </TableCell>
                    <TableCell>{req.display_name}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {req.bio || "-"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                      >
                        {req.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-500/20 hover:bg-green-500/10 text-green-500"
                          onClick={() => handleApprove(req.id)}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500/20 hover:bg-red-500/10 text-red-500"
                          onClick={() => handleReject(req.id)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
