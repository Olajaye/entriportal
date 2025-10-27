"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/component/ui/card";
import { Badge } from "@/src/component/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/component/ui/table";
import { Key, Eye, Clock, CheckCircle } from "lucide-react";
import { useLazyGetEstateAccessCodesQuery } from "@/src/lib/features/api/accessCode";
import { useParams } from "next/navigation";
import {
  Estate,
  useLazyGetEstateBySlguQuery,
} from "@/src/lib/features/api/estateApi";

interface AccessCode {
  id: string;
  code: string;
  estateId: string;
  residentId: string;
  status: string;
  expiresAt: string;
  createdAt: string;
  usedAt: string;
  guestName?: string;
  user: any;
}

const AccessCodeManagement = () => {
  const [accessCodes, setAccessCodes] = useState<AccessCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [estate, setEstate] = useState<Estate | null>(null);
  const { tenantSlug } = useParams<{ tenantSlug: string }>(); //tenantSlug
  const slug = tenantSlug;
  const [getEstateAccessCode] = useLazyGetEstateAccessCodesQuery();
  const [getEstate] = useLazyGetEstateBySlguQuery();

  useEffect(() => {
    const fetchEstateAndAccessCode = async () => {
      if (!slug) return;

      try {
        const estateRes = await getEstate(slug).unwrap();
        setEstate(estateRes);

        // Second: get access codes using estate ID
        if (estateRes?.id) {
          const accessRes = await getEstateAccessCode(estateRes.id).unwrap();
          setAccessCodes(accessRes);
        }
      } catch (error) {
        console.error("Error fetching estate or access code:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstateAndAccessCode();
  }, [slug]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "default";
      case "USER":
        return "secondary";
      case "EXPIRED":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Key className="h-4 w-4" />;
      case "USED":
        return <CheckCircle className="h-4 w-4" />;
      case "EXPIRED":
        return <Clock className="h-4 w-4" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryCol"></div>
      </div>
    );
  }

  const activeCount = accessCodes.filter(
    (code) => code.status === "ACTIVE"
  ).length;
  const usedCount = accessCodes.filter((code) => code.status === "USED").length;
  const expiredCount = accessCodes.filter(
    (code) => code.status === "EXPIRED"
  ).length;

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Access Code Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage guest access codes
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Codes
              </CardTitle>
              <Key className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCount}</div>
              <p className="text-xs text-muted-foreground">Currently valid</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Used Codes</CardTitle>
              <CheckCircle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usedCount}</div>
              <p className="text-xs text-muted-foreground">Successfully used</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Expired Codes
              </CardTitle>
              <Clock className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{expiredCount}</div>
              <p className="text-xs text-muted-foreground">No longer valid</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Recent Access Codes ({accessCodes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {accessCodes.length === 0 ? (
              <div className="text-center py-8">
                <Key className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No access codes found
                </h3>
                <p className="text-muted-foreground">
                  Access codes generated by residents will appear here.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Guest Name</TableHead>
                    <TableHead>Resident</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Used At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accessCodes.map((code) => (
                    <TableRow key={code.id}>
                      <TableCell className="font-mono font-medium">
                        {code.code}
                      </TableCell>
                      <TableCell>{code.guestName}</TableCell>
                      <TableCell>{code.user.name || "Unknown"}</TableCell>
                      <TableCell>
                        <Badge
                          variant={getStatusColor(code.status)}
                          className="flex items-center gap-1 w-fit"
                        >
                          {getStatusIcon(code.status)}
                          {code.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(code.expiresAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {code.usedAt
                          ? new Date(code.usedAt).toLocaleString()
                          : "Not used"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AccessCodeManagement;
