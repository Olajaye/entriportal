"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/src/component/ui/button";
import { Input } from "@/src/component/ui/input";
import { Label } from "@/src/component/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/component/ui/card";
import { Badge } from "@/src/component/ui/badge";
import { CheckCircle, Clock, Copy, Plus, XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/type";
import {
  useGenerateAccessCodeMutation,
  useGetAccessCodesQuery,
  useLazyGetAccessCodesQuery,
} from "@/src/lib/features/api/accessCode";
import toast from "react-hot-toast";

interface AccessCode {
  id: string;
  code: string;
  guestName: string;
  residentId: string;
  estateId: string;
  status: string;
  createdAt: string;
  expiresAt: string;
  usedAt?: string;
}

const page = () => {
  const { user } = useSelector((s: RootState) => s.user);
  const [guestName, setGuestName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [codes, setCodes] = useState([]);
  const [refetch, setRefetch] = useState("");
  const [getAccessCode, { isLoading }] = useLazyGetAccessCodesQuery();
  const [generateAccessCode] = useGenerateAccessCodeMutation();

  useEffect(() => {
    if (!user) return;
    getAccessCode(user.id)
      .unwrap()
      .then((res) => {
        setIsGenerating(false);
        setGuestName("");
        setCodes(res);
      });
  }, [refetch]);

  const generateCode = (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName.trim()) return;
    setIsGenerating(true);

    const payload = {
      guestName,
      residentId: user?.id,
      estateId: user?.estateId,
      userId: user?.id,
    };

    generateAccessCode(payload)
      .unwrap()
      .then((res) => {
        setIsGenerating(false);
        setGuestName("");
        setRefetch(`${Math.random().toString()}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const generateCode = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!guestName.trim() || !profile?.tenant_id) return;

  //   setIsGenerating(true);
  //   try {
  //     // Check for payment restrictions first
  //     const { data: hasRestrictions, error: restrictionError } =
  //       await supabase.rpc("has_payment_restrictions", {
  //         p_resident_id: user?.id,
  //       });

  //     if (restrictionError) {
  //       console.error("Error checking payment restrictions:", restrictionError);
  //       throw new Error("Failed to check payment restrictions");
  //     }

  //     if (hasRestrictions) {
  //       toast({
  //         title: "Access Restricted",
  //         description:
  //           "You have outstanding payments that prevent code generation. Please complete your payments first.",
  //         variant: "destructive",
  //       });
  //       return;
  //     }

  //     // Generate 6-character alphanumeric code
  //     const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  //     // Set expiry to end of day (11:59 PM)
  //     const expiresAt = new Date();
  //     expiresAt.setHours(23, 59, 59, 999);

  //     const { data, error } = await supabase
  //       .from("access_codes")
  //       .insert({
  //         code,
  //         guest_name: guestName.trim(),
  //         resident_id: user?.id,
  //         tenant_id: profile.tenant_id,
  //         expires_at: expiresAt.toISOString(),
  //       })
  //       .select()
  //       .single();

  //     if (error) throw error;

  //     setCodes((prev) => [data, ...prev]);
  //     setGuestName("");

  //     toast({
  //       title: "Code generated!",
  //       description: `Access code ${code} created for ${guestName}`,
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to generate access code",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsGenerating(false);
  //   }
  // };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Access code copied to clipboard");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="w-4 h-4" />;
      case "used":
        return <CheckCircle className="w-4 h-4" />;
      case "expired":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "used":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "expired":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-offWhite via-background to-lightGray">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome, {user?.name}
        </h1>
        <p className="text-muted-foreground">
          Generate access codes for your guests
        </p>
      </div>

      {/* Generate Code Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Generate Access Code
          </CardTitle>
          <CardDescription>
            Create a one-time access code for your guest, valid until 11:59 PM
            today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={generateCode} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="guest-name">Guest Name</Label>
              <Input
                id="guest-name"
                type="text"
                placeholder="Enter guest's full name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={isGenerating} className="w-full">
              {isGenerating ? "Generating..." : "Generate Code"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Code History */}
      <Card>
        <CardHeader>
          <CardTitle>Access Code History</CardTitle>
          <CardDescription>
            View all your generated codes and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {codes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No access codes generated yet
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {codes.map((code: AccessCode) => (
                <div
                  key={code.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-lg font-semibold">
                        {code.code}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyCode(code.code)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {code.guestName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Created: {new Date(code.createdAt).toLocaleString()}
                    </p>
                    {code.usedAt && (
                      <p className="text-xs text-muted-foreground">
                        Used: {new Date(code.usedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <Badge
                    className={`flex items-center gap-1 ${getStatusColor(
                      code.status
                    )}`}
                  >
                    {getStatusIcon(code.status)}
                    {code.status.charAt(0).toUpperCase() + code.status.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
