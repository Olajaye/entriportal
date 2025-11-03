"use client";
import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/component/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/component/ui/card";
import { Badge } from "@/src/component/ui/badge";
// import { supabase } from "@/integrations/supabase/client";
// import { useAuth } from "@/hooks/useAuth";
// import { useTenant } from "@/contexts/TenantContext";
// // import ResidentManagement from "@/components/tenant/ResidentManagement";
// import GuardManagement from "@/components/tenant/GuardManagement";
// import AccessCodeManagement from "@/components/tenant/AccessCodeManagement";
// import { PaymentManagement } from "@/components/tenant/PaymentManagement";
// import QRCodeDisplay from "@/components/portals/QRCodeDisplay";
import {
  Users,
  Shield,
  UserCheck,
  Clock,
  TrendingUp,
  Activity,
  DollarSign,
} from "lucide-react";
import {
  Estate,
  useLazyGetEstateBySlguQuery,
} from "@/src/lib/features/api/estateApi";
import { useParams } from "next/navigation";

interface DashboardStats {
  totalResidents: number;
  totalGuards: number;
  activeAccessCodes: number;
  usedCodesThisWeek: number;
  totalPaymentRequests: number;
  pendingPayments: number;
}

const EstateAdminDashboard = () => {
  const { tenantSlug } = useParams<{ tenantSlug: string }>();
  const slug = tenantSlug;
  const [getEstate] = useLazyGetEstateBySlguQuery();
  const [estate, setEstate] = useState<Estate | null>(null);
  const [tenantInfo, setTenantInfo] = useState<Estate | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalResidents: 0,
    totalGuards: 0,
    activeAccessCodes: 0,
    usedCodesThisWeek: 0,
    totalPaymentRequests: 0,
    pendingPayments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    getEstate(slug)
      .unwrap()
      .then((res) => {
        setEstate(res);
      });
  }, []);

  // const { profile } = useAuth();
  // const { tenant } = useTenant();

  // useEffect(() => {
  //   if (profile?.tenant_id && tenant) {
  //     fetchData();
  //   }
  // }, [profile, tenant]);

  // const fetchData = async () => {
  //   if (!profile?.tenant_id) return;

  //   setLoading(true);
  //   try {
  //     await Promise.all([fetchTenantInfo(), fetchStats()]);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const fetchTenantInfo = async () => {
  //   if (!tenant) return;
  //   setTenantInfo({
  //     name: tenant.name,
  //     slug: tenant.slug,
  //     is_active: tenant.is_active,
  //     branding: tenant.branding,
  //     settings: tenant.settings,
  //   });
  // };

  // const fetchStats = async () => {
  //   if (!profile?.tenant_id) return;

  //   // Fetch residents count
  //   const { count: residentsCount } = await supabase
  //     .from("profiles")
  //     .select("*", { count: "exact", head: true })
  //     .eq("tenant_id", profile.tenant_id)
  //     .eq("role", "resident");

  //   // Fetch guards count
  //   const { count: guardsCount } = await supabase
  //     .from("profiles")
  //     .select("*", { count: "exact", head: true })
  //     .eq("tenant_id", profile.tenant_id)
  //     .eq("role", "guard");

  //   // Fetch active access codes count
  //   const { count: activeCodesCount } = await supabase
  //     .from("access_codes")
  //     .select("*", { count: "exact", head: true })
  //     .eq("tenant_id", profile.tenant_id)
  //     .eq("status", "active");

  //   // Fetch used codes this week
  //   const weekAgo = new Date();
  //   weekAgo.setDate(weekAgo.getDate() - 7);

  //   const { count: usedCodesCount } = await supabase
  //     .from("access_codes")
  //     .select("*", { count: "exact", head: true })
  //     .eq("tenant_id", profile.tenant_id)
  //     .eq("status", "used")
  //     .gte("used_at", weekAgo.toISOString());

  //   // Fetch payment requests count
  //   const { count: paymentRequestsCount } = await supabase
  //     .from("payment_requests")
  //     .select("*", { count: "exact", head: true })
  //     .eq("tenant_id", profile.tenant_id);

  //   // Fetch pending payments count
  //   const { count: pendingPaymentsCount } = await supabase
  //     .from("payment_requests")
  //     .select("*", { count: "exact", head: true })
  //     .eq("tenant_id", profile.tenant_id)
  //     .in("status", ["pending", "overdue"]);

  //   setStats({
  //     totalResidents: residentsCount || 0,
  //     totalGuards: guardsCount || 0,
  //     activeAccessCodes: activeCodesCount || 0,
  //     usedCodesThisWeek: usedCodesCount || 0,
  //     totalPaymentRequests: paymentRequestsCount || 0,
  //     pendingPayments: pendingPaymentsCount || 0,
  //   });
  // };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-[400px]">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  //     </div>
  //   );
  // }

  // if (!tenantInfo) {
  //   return (
  //     <div className="flex items-center justify-center min-h-[400px]">
  //       <div className="text-center">
  //         <h3 className="text-lg font-semibold">Estate Not Found</h3>
  //         <p className="text-muted-foreground">
  //           Unable to load estate information.
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-3xl font-bold">
          Estate Management Dashboard
        </h1>
        <p className="text-muted-foreground">
          Overview and management for {estate?.estateName}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Residents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalResidents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Guards</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGuards}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Codes</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeAccessCodes}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Weekly Entries
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.usedCodesThisWeek}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Payment Requests
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalPaymentRequests}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Payments
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pendingPayments}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="residents" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="residents">Residents</TabsTrigger>
          <TabsTrigger value="guards">Security Guards</TabsTrigger>
          <TabsTrigger value="access-codes">Access Codes</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="portal-access">Portal Access</TabsTrigger>
          <TabsTrigger value="settings">Estate Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="residents" className="space-y-4">
          {/* <ResidentManagement /> */}
          <>Resident Management Component Placeholder</>
        </TabsContent>

        <TabsContent value="guards" className="space-y-4">
          {/* <GuardManagement /> */}
          <>Guard Management Component Placeholder</>
        </TabsContent>

        <TabsContent value="access-codes" className="space-y-4">
          {/* <AccessCodeManagement /> */}
          <>Access Code Management Component Placeholder</>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          {/* <PaymentManagement /> */}
          <>Payment Management Component Placeholder</>
        </TabsContent>

        <TabsContent value="portal-access" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Resident Portal</CardTitle>
                <CardDescription>
                  Direct access for residents to generate guest codes
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* <QRCodeDisplay tenantSlug={tenantInfo?.slug} type="resident" /> */}
                <>QR Code Display Component Placeholder</>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Guard Portal</CardTitle>
                <CardDescription>
                  Portal for security guards to verify access codes
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* <QRCodeDisplay tenantSlug={tenantInfo?.slug} type="guard" /> */}
                <>QR Code Display Component Placeholder</>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Estate Information</CardTitle>
                <CardDescription>
                  Basic information about your estate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Estate Name</label>
                    <p className="text-muted-foreground">
                      {tenantInfo?.estateName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Estate URL</label>
                    <p className="text-muted-foreground font-mono text-sm">
                      /tenant/{tenantInfo?.slug}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <div>
                      <Badge
                        variant={
                          tenantInfo?.paymentStatus ? "default" : "secondary"
                        }
                      >
                        {tenantInfo?.paymentStatus ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Admin Role</label>
                    <p className="text-muted-foreground capitalize">
                      {/* {profile?.role} */}
                      SLUG
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portal Access URLs</CardTitle>
                <CardDescription>
                  Direct links to resident and guard portals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Resident Portal</label>
                  <p className="text-sm text-muted-foreground font-mono">
                    {window.location.origin}/portal/resident/{tenantInfo?.slug}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Guard Portal</label>
                  <p className="text-sm text-muted-foreground font-mono">
                    {window.location.origin}/portal/guard/{tenantInfo?.slug}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EstateAdminDashboard;
