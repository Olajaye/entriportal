"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/src/component/ui/button";
import { Badge } from "@/src/component/ui/badge";
// import { useAuth } from "@/hooks/useAuth";
// import { useTenant } from "@/contexts/TenantContext";
// import { useIsMobile } from "@/hooks/use-mobile";
import {
  Building2,
  LogOut,
  Users,
  Shield,
  Key,
  CreditCard,
  Settings,
  LayoutDashboard,
  User,
} from "lucide-react";
// import MobileLayout from "@/components/mobile/MobileLayout";
import { Metadata } from "next";
import path from "path";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/type";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  Estate,
  useLazyGetEstateBySlguQuery,
} from "@/src/lib/features/api/estateApi";
import { logoutUser } from "@/src/lib/slice/userSlice";
import UserSettingsModal from "@/src/component/model/UserSettingsModal";
import Image from "next/image";

interface TenantLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = useSelector((s: RootState) => s.user);
  const { tenantSlug } = useParams<{ tenantSlug: string }>(); //tenantSlug
  const slug = tenantSlug;
  const [estate, setEstate] = useState<Estate>({} as Estate);
  const [getEstate] = useLazyGetEstateBySlguQuery();
  const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState(false);
  const pathname = usePathname();
  const route = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!slug) return;
    // setLoading(true);
    getEstate(slug)
      .unwrap()
      .then((res) => {
        setEstate(res);
        // setLoading(false);
      });
  }, []);

  // const isMobile = useIsMobile();

  const handleSignOut = async () => {
    dispatch(logoutUser());
    route.push("/entri");
  };

  const menuItems = [
    {
      path: `/dashboard/estateadmin/${tenantSlug}/estate-management`,
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: `/dashboard/estateadmin/${tenantSlug}/residents`,
      label: "Residents",
      icon: Users,
    },
    {
      path: `/dashboard/estateadmin/${tenantSlug}/guards`,
      label: "Guards",
      icon: Shield,
    },
    {
      path: `/dashboard/estateadmin/${tenantSlug}/access-codes`,
      label: "Access Codes",
      icon: Key,
    },
    {
      path: `/dashboard/estateadmin/${tenantSlug}/payment`,
      label: "Payments",
      icon: CreditCard,
    },
    {
      path: `/dashboard/estateadmin/${tenantSlug}/settings`,
      label: "Settings",
      icon: Settings,
    },
  ];

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // For mobile, use MobileLayout with bottom navigation
  // if (isMobile) {
  //   return (
  //     <MobileLayout showBottomNav={true}>
  //       {children}
  //       <UserSettingsModal
  //         isOpen={isSettingsModalOpen}
  //         onClose={() => setIsSettingsModalOpen(false)}
  //       />
  //     </MobileLayout>
  //   );
  // }

  // Desktop layout with sidebar
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card flex-shrink-0">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Image
                src={"/logo/logoDark.png"}
                alt={"test"}
                width={40}
                height={40}
              />
              <h1 className="text-xl font-bold text-navy">
                {estate.estateName}
              </h1>
            </div>

            <Badge variant={user.status === "ACTIVE" ? "default" : "secondary"}>
              {user.status === "ACTIVE" ? "Active" : "Inactive"}
            </Badge>
            <p className="text-sm font-medium">
              Estate Plan {estate.estatePlan}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              {/* {profile?.full_name} */}
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {user.userType.replace("_", " ").toLowerCase()}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSettingsModalOpen(true)}
            >
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Settings</span>
            </Button>

            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card flex-shrink-0">
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => route.push(item.path)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content - Scrollable Area */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>

      <UserSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </div>
  );
}
