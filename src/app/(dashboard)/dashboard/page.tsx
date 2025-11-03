"use client";
import React, { useEffect, useState } from "react";
// import { useAuth } from "@/hooks/useAuth";
// import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/src/component/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/component/ui/card";
import { Badge } from "@/src/component/ui/badge";
import {
  Building2,
  Users,
  Shield,
  Settings,
  LogOut,
  Home,
  KeyRound,
  UserCheck,
  Activity,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/type";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/src/lib/slice/userSlice";
import Image from "next/image";

const Dashboard = () => {
  const { user } = useSelector((s: RootState) => s.user);
  const [tenantSlug, setTenantSlug] = useState<string | null>(
    user?.estate.slug || null
  );
  const [tenantLoading, setTenantLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!loading && !user) {
  //     navigate("/auth");
  //   }
  // }, [user, loading, navigate]);

  // useEffect(() => {
  //   const fetchTenantSlug = async () => {
  //     if (
  //       profile?.tenant_id &&
  //       (profile.role === "tenant_admin" ||
  //         profile.role === "guard" ||
  //         profile.role === "resident")
  //     ) {
  //       setTenantLoading(true);
  //       try {
  //         const { data, error } = await supabase
  //           .from("tenants")
  //           .select("slug")
  //           .eq("id", profile.tenant_id)
  //           .single();

  //         if (error) {
  //           console.error("Error fetching tenant slug:", error);
  //         } else {
  //           setTenantSlug(data.slug);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching tenant slug:", error);
  //       } finally {
  //         setTenantLoading(false);
  //       }
  //     }
  //   };

  //   fetchTenantSlug();
  // }, [profile?.tenant_id, profile?.role]);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  //     </div>
  //   );
  // }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Welcome to Entri</CardTitle>
            <CardDescription>Please sign in to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => router.push("/")}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSignOut = async () => {
    dispatch(logoutUser());
    router.push("/entri");
  };

  const getRoleInfo = (role: string) => {
    switch (role) {
      case "superadmin":
        return {
          name: "Super Administrator",
          icon: Shield,
          color: "bg",
        };
      case "TENANTADMIN":
        return {
          name: "Estate Administrator",
          icon: Building2,
          color: "bg-[#1E3A5F]",
        };
      case "GUARD":
        return { name: "Security Guard", icon: Shield, color: "bg-green-500" };
      case "RESIDENT":
        return { name: "Resident", icon: Home, color: "bg-orange-500" };
      default:
        return { name: "User", icon: Users, color: "bg-gray-500" };
    }
  };

  const getNavigationCards = () => {
    const baseCards = [
      {
        title: "Settings",
        description: "Manage your account and preferences",
        icon: Settings,
        onClick: () => console.log("Settings clicked"),
        variant: "outline" as const,
      },
    ];

    // Don't show navigation cards if tenant slug is still loading for tenant users
    if (
      (user.userType === "TENANTADMIN" ||
        user.userType === "GUARD" ||
        user.userType === "RESIDENT") &&
      !tenantSlug
    ) {
      return baseCards;
    }

    switch (user.userType) {
      case "SUPERADMIN":
        return [
          {
            title: "Super Admin Dashboard",
            description: "Manage all estates and system settings",
            icon: Shield,
            onClick: () => router.push("/superadmin-dashboard"),
            variant: "default" as const,
          },
          ...baseCards,
        ];

      case "TENANTADMIN":
        return [
          {
            title: "Estate Management",
            description: "Manage residents, guards, and estate operations",
            icon: Building2,
            onClick: () =>
              router.push(
                `/dashboard/estateadmin/${tenantSlug}/estate-management`
              ),
            variant: "default" as const,
          },
          {
            title: "Residents",
            description: "View and manage resident accounts",
            icon: Users,
            onClick: () =>
              router.push(`/dashboard/estateadmin/${tenantSlug}/residents`),
            variant: "outline" as const,
          },
          {
            title: "Guards",
            description: "Manage security personnel",
            icon: UserCheck,
            onClick: () =>
              router.push(`/dashboard/estateadmin/${tenantSlug}/guards`),
            variant: "outline" as const,
          },
          {
            title: "Access Codes",
            description: "Monitor guest access codes",
            icon: KeyRound,
            onClick: () =>
              router.push(`/dashboard/estateadmin/${tenantSlug}/access-codes`),
            variant: "outline" as const,
          },
          ...baseCards,
        ];

      case "GUARD":
        return [
          {
            title: "Guard Portal",
            description: "Monitor access codes and security",
            icon: Shield,
            onClick: () => router.push(`/dashboard/gaurd/${tenantSlug}`),
            variant: "default" as const,
          },
          {
            title: "Activity Log",
            description: "View recent security activities",
            icon: Activity,
            onClick: () => console.log("Activity log clicked"),
            variant: "outline" as const,
          },
          ...baseCards,
        ];

      case "RESIDENT":
        return [
          {
            title: "Resident Portal",
            description: "Generate access codes and manage visitors",
            icon: Home,
            onClick: () => router.push(`/dashboard/resident/${tenantSlug}`),
            variant: "default" as const,
          },
          {
            title: "My Access Codes",
            description: "View and manage your guest codes",
            icon: KeyRound,
            onClick: () => console.log("Access codes clicked"),
            variant: "outline" as const,
          },
          ...baseCards,
        ];

      default:
        return baseCards;
    }
  };

  const roleInfo = getRoleInfo(user.userType);
  const navigationCards = getNavigationCards();
  const RoleIcon = roleInfo.icon;

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy mx-auto"></div>
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-offWhite via-background to-lightGray ">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full">
          <div className="container mx-auto flex h-14  items-center">
            <div className="flex items-end space-x-1">
              <Image
                src={"/logo/logoDark.png"}
                alt={"test"}
                width={48}
                height={48}
              />
              <span className="font-bold text-2xl font-inter text-charcoal">
                Entri
              </span>
            </div>
            <div className="flex items-center space-x-4 ml-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="font-inter"
              >
                <LogOut className="h-4 w-4 mr-2 text-charcoal" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto py-8 px-4 max-w-4xl">
          <div className="mb-8 text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className={`p-3 rounded-full ${roleInfo.color} text-white`}>
                <RoleIcon className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl md:text-3xl font-bold text-charcoal font-inter tracking-tight">
                  Welcome {user.name || "User"}!
                </h1>
                <p className="text-muted-foreground">
                  {roleInfo.name} • Ready to get started?
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {navigationCards.map((card, index) => {
              const CardIcon = card.icon;
              return (
                <Card
                  key={index}
                  className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
                  onClick={card.onClick}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                      <CardIcon className="h-5 w-5 text-primaryCol" />
                      <CardTitle className="text-lg">{card.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {card.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Quick Info</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Role:</span>
                <Badge variant="outline">{roleInfo.name}</Badge>
              </div>
              {/* profile.unit_number */}
              {false && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Unit:</span>
                  {/* profile.unit_number */}
                  <Badge variant="secondary">test</Badge>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status:</span>
                <Badge variant="default">Active</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
