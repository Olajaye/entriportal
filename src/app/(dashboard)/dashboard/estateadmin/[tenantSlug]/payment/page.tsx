"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/src/component/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/component/ui/card";
import { Input } from "@/src/component/ui/input";
import { Label } from "@/src/component/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/component/ui/select";
import { Textarea } from "@/src/component/ui/textarea";
import { Switch } from "@/src/component/ui/switch";
import { Badge } from "@/src/component/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/component/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/component/ui/dialog";

import {
  Plus,
  Send,
  Eye,
  DollarSign,
  Users,
  Clock,
  AlertTriangle,
} from "lucide-react";

interface PaymentType {
  id: string;
  name: string;
  description: string;
  amount: number;
  category: string;
  due_date_offset_days: number;
  grace_period_days: number;
  is_recurring: boolean;
  recurring_interval_months: number;
  is_active: boolean;
  restrict_access_codes: boolean;
  created_at: string;
}

interface PaymentRequest {
  id: string;
  amount: number;
  due_date: string;
  status: string;
  description: string;
  created_at: string;
  payment_types: PaymentType;
  profiles: {
    full_name: string;
    unit_number: string;
  } | null;
}

interface PaymentSummary {
  total_requests: number;
  total_paid: number;
  total_pending: number;
  total_overdue: number;
  total_amount_collected: number;
  total_amount_pending: number;
}

const PaymentManagement: React.FC = () => {
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([]);
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
  const [summary, setSummary] = useState<PaymentSummary>({
    total_requests: 0,
    total_paid: 0,
    total_pending: 0,
    total_overdue: 0,
    total_amount_collected: 0,
    total_amount_pending: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState<string>("");
  const [newPaymentType, setNewPaymentType] = useState({
    name: "",
    description: "",
    amount: "",
    category: "miscellaneous",
    due_date_offset_days: "30",
    grace_period_days: "0",
    is_recurring: false,
    recurring_interval_months: "1",
    restrict_access_codes: false,
  });

  // useEffect(() => {
  //   if (profile?.tenant_id && tenant?.id) {
  //     fetchData();
  //   }
  // }, [profile?.tenant_id, tenant?.id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchPaymentTypes(),
        fetchPaymentRequests(),
        fetchSummary(),
      ]);
    } catch (error) {
      console.error("Error fetching payment data:", error);
      // toast({
      //   title: "Error",
      //   description: "Failed to load payment data",
      //   variant: "destructive",
      // });
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentTypes = async () => {
    // if (!profile?.tenant_id) {
    //   console.log("No tenant_id available for payment types fetch");
    //   return;
    // }
    // const { data, error } = await supabase
    //   .from("payment_types")
    //   .select("*")
    //   .eq("tenant_id", profile.tenant_id)
    //   .order("created_at", { ascending: false });
    // if (error) {
    //   console.error("Error fetching payment types:", error);
    //   throw error;
    // }
    // setPaymentTypes(data || []);
  };

  const fetchPaymentRequests = async () => {
    // if (!profile?.tenant_id) {
    //   console.log("No tenant_id available for payment requests fetch");
    //   return;
    // }
    // // First, fetch payment requests with payment types
    // const { data: requests, error: requestsError } = await supabase
    //   .from("payment_requests")
    //   .select(
    //     `
    //     *,
    //     payment_types(*)
    //   `
    //   )
    //   .eq("tenant_id", profile.tenant_id)
    //   .order("created_at", { ascending: false })
    //   .limit(50);
    // if (requestsError) {
    //   console.error("Error fetching payment requests:", requestsError);
    //   throw requestsError;
    // }
    // if (!requests || requests.length === 0) {
    //   setPaymentRequests([]);
    //   return;
    // }
    // // Get unique resident IDs
    // const residentIds = [...new Set(requests.map((r) => r.resident_id))];
    // // Fetch resident profiles
    // const { data: profiles, error: profilesError } = await supabase
    //   .from("profiles")
    //   .select("user_id, full_name, unit_number")
    //   .in("user_id", residentIds);
    // if (profilesError) {
    //   console.error("Error fetching profiles:", profilesError);
    //   throw profilesError;
    // }
    // // Create a lookup map for profiles
    // const profilesMap = new Map();
    // (profiles || []).forEach((profile) => {
    //   profilesMap.set(profile.user_id, profile);
    // });
    // // Combine the data
    // const transformedData = requests.map((request) => ({
    //   ...request,
    //   profiles: profilesMap.get(request.resident_id) || null,
    // }));
    // setPaymentRequests(transformedData as PaymentRequest[]);
  };

  const fetchSummary = async () => {
    // if (!profile?.tenant_id) {
    //   console.log("No tenant_id available for summary fetch");
    //   return;
    // }
    // const { data: requests, error } = await supabase
    //   .from("payment_requests")
    //   .select("amount, status")
    //   .eq("tenant_id", profile.tenant_id);
    // if (error) {
    //   console.error("Error fetching payment summary:", error);
    //   throw error;
    // }
    // const newSummary = (requests || []).reduce(
    //   (acc, request) => {
    //     acc.total_requests++;
    //     if (request.status === "paid") {
    //       acc.total_paid++;
    //       acc.total_amount_collected += parseFloat(request.amount.toString());
    //     } else if (request.status === "pending") {
    //       acc.total_pending++;
    //       acc.total_amount_pending += parseFloat(request.amount.toString());
    //     } else if (request.status === "overdue") {
    //       acc.total_overdue++;
    //       acc.total_amount_pending += parseFloat(request.amount.toString());
    //     }
    //     return acc;
    //   },
    //   {
    //     total_requests: 0,
    //     total_paid: 0,
    //     total_pending: 0,
    //     total_overdue: 0,
    //     total_amount_collected: 0,
    //     total_amount_pending: 0,
    //   }
    // );
    // setSummary(newSummary);
  };

  const createPaymentType = async () => {
    // try {
    //   if (!newPaymentType.name || !newPaymentType.amount) {
    //     toast({
    //       title: "Error",
    //       description: "Please fill in all required fields",
    //       variant: "destructive",
    //     });
    //     return;
    //   }
    //   const { error } = await supabase.from("payment_types").insert({
    //     tenant_id: tenant?.id,
    //     name: newPaymentType.name,
    //     description: newPaymentType.description,
    //     amount: parseFloat(newPaymentType.amount),
    //     category: newPaymentType.category as
    //       | "monthly_dues"
    //       | "emergency"
    //       | "maintenance"
    //       | "miscellaneous",
    //     due_date_offset_days: parseInt(newPaymentType.due_date_offset_days),
    //     grace_period_days: parseInt(newPaymentType.grace_period_days),
    //     is_recurring: newPaymentType.is_recurring,
    //     recurring_interval_months: newPaymentType.is_recurring
    //       ? parseInt(newPaymentType.recurring_interval_months)
    //       : null,
    //     restrict_access_codes: newPaymentType.restrict_access_codes,
    //     created_by: profile?.user_id,
    //   });
    //   if (error) throw error;
    //   toast({
    //     title: "Success",
    //     description: "Payment type created successfully",
    //   });
    //   setIsCreateModalOpen(false);
    //   setNewPaymentType({
    //     name: "",
    //     description: "",
    //     amount: "",
    //     category: "miscellaneous",
    //     due_date_offset_days: "30",
    //     grace_period_days: "0",
    //     is_recurring: false,
    //     recurring_interval_months: "1",
    //     restrict_access_codes: false,
    //   });
    //   fetchPaymentTypes();
    // } catch (error: any) {
    //   toast({
    //     title: "Error",
    //     description: error.message,
    //     variant: "destructive",
    //   });
    // }
  };

  const publishPaymentToAllResidents = async () => {
    // try {
    //   if (!selectedPaymentType) {
    //     toast({
    //       title: "Error",
    //       description: "Please select a payment type",
    //       variant: "destructive",
    //     });
    //     return;
    //   }
    //   // Get all residents in the tenant
    //   const { data: residents, error: residentsError } = await supabase
    //     .from("profiles")
    //     .select("user_id, full_name")
    //     .eq("tenant_id", tenant?.id)
    //     .eq("role", "resident");
    //   if (residentsError) throw residentsError;
    //   if (!residents || residents.length === 0) {
    //     toast({
    //       title: "Warning",
    //       description: "No residents found in this estate",
    //       variant: "destructive",
    //     });
    //     return;
    //   }
    //   // Get payment type details
    //   const paymentType = paymentTypes.find(
    //     (pt) => pt.id === selectedPaymentType
    //   );
    //   if (!paymentType) throw new Error("Payment type not found");
    //   // Calculate due date
    //   const dueDate = new Date();
    //   dueDate.setDate(dueDate.getDate() + paymentType.due_date_offset_days);
    //   // Create payment requests for all residents
    //   const paymentRequests = residents.map((resident) => ({
    //     tenant_id: tenant?.id,
    //     payment_type_id: selectedPaymentType,
    //     resident_id: resident.user_id,
    //     amount: paymentType.amount,
    //     due_date: dueDate.toISOString(),
    //     description: paymentType.description,
    //     created_by: profile?.user_id,
    //   }));
    //   const { error: insertError } = await supabase
    //     .from("payment_requests")
    //     .insert(paymentRequests);
    //   if (insertError) throw insertError;
    //   toast({
    //     title: "Success",
    //     description: `Payment published to ${residents.length} residents`,
    //   });
    //   setIsPublishModalOpen(false);
    //   setSelectedPaymentType("");
    //   fetchPaymentRequests();
    //   fetchSummary();
    // } catch (error: any) {
    //   toast({
    //     title: "Error",
    //     description: error.message,
    //     variant: "destructive",
    //   });
    // }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "default",
      paid: "default",
      overdue: "destructive",
      cancelled: "secondary",
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "default"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      monthly_dues: "Monthly Dues",
      emergency: "Emergency",
      maintenance: "Maintenance",
      miscellaneous: "Miscellaneous",
    };
    return labels[category as keyof typeof labels] || category;
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-[400px]">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  //     </div>
  //   );
  // }

  // if (!profile?.tenant_id || !tenant?.id) {
  //   return (
  //     <div className="flex items-center justify-center min-h-[400px]">
  //       <div className="text-center">
  //         <h3 className="text-lg font-semibold">Access Required</h3>
  //         <p className="text-muted-foreground">
  //           You need to be logged in as a tenant admin to access this page.
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Requests
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.total_requests}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Amount Collected
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{summary.total_amount_collected.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {summary.total_paid} payments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Amount
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{summary.total_amount_pending.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {summary.total_pending} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {summary.total_overdue}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Payment Type
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Payment Type</DialogTitle>
              <DialogDescription>
                Define a new payment type that can be published to residents.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={newPaymentType.name}
                  onChange={(e) =>
                    setNewPaymentType((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="e.g., Monthly Service Charge"
                />
              </div>

              <div>
                <Label htmlFor="amount">Amount (₦) *</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newPaymentType.amount}
                  onChange={(e) =>
                    setNewPaymentType((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }))
                  }
                  placeholder="0.00"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newPaymentType.category}
                  onValueChange={(value) =>
                    setNewPaymentType((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly_dues">Monthly Dues</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="miscellaneous">Miscellaneous</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newPaymentType.description}
                  onChange={(e) =>
                    setNewPaymentType((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Optional description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="due_days">Due Days</Label>
                  <Input
                    id="due_days"
                    type="number"
                    value={newPaymentType.due_date_offset_days}
                    onChange={(e) =>
                      setNewPaymentType((prev) => ({
                        ...prev,
                        due_date_offset_days: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="grace_days">Grace Days</Label>
                  <Input
                    id="grace_days"
                    type="number"
                    value={newPaymentType.grace_period_days}
                    onChange={(e) =>
                      setNewPaymentType((prev) => ({
                        ...prev,
                        grace_period_days: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="restrict_codes">
                  Restrict Access Codes if Overdue
                </Label>
                <Switch
                  id="restrict_codes"
                  checked={newPaymentType.restrict_access_codes}
                  onCheckedChange={(checked) =>
                    setNewPaymentType((prev) => ({
                      ...prev,
                      restrict_access_codes: checked,
                    }))
                  }
                />
              </div>

              <Button onClick={createPaymentType} className="w-full">
                Create Payment Type
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isPublishModalOpen} onOpenChange={setIsPublishModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Send className="w-4 h-4 mr-2" />
              Publish Payment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Publish Payment to All Residents</DialogTitle>
              <DialogDescription>
                This will create payment requests for all residents in your
                estate.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="payment_type">Select Payment Type</Label>
                <Select
                  value={selectedPaymentType}
                  onValueChange={setSelectedPaymentType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentTypes
                      .filter((pt) => pt.is_active)
                      .map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name} - ₦{type.amount.toLocaleString()}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={publishPaymentToAllResidents} className="w-full">
                Publish to All Residents
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Payment Types */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Types</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Restrictions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentTypes.map((type) => (
                <TableRow key={type.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{type.name}</div>
                      {type.description && (
                        <div className="text-sm text-muted-foreground">
                          {type.description}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getCategoryLabel(type.category)}</TableCell>
                  <TableCell>₦{type.amount.toLocaleString()}</TableCell>
                  <TableCell>{type.due_date_offset_days} days</TableCell>
                  <TableCell>
                    <Badge variant={type.is_active ? "default" : "secondary"}>
                      {type.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {type.restrict_access_codes && (
                      <Badge variant="destructive">Restricts Access</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Payment Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payment Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resident</TableHead>
                <TableHead>Payment Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {request.profiles?.full_name || "Unknown Resident"}
                      </div>
                      {request.profiles?.unit_number && (
                        <div className="text-sm text-muted-foreground">
                          Unit {request.profiles.unit_number}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{request.payment_types?.name}</TableCell>
                  <TableCell>₦{request.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    {new Date(request.due_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
export default PaymentManagement;
