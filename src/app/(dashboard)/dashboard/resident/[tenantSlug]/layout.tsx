"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/src/component/ui/button";
import { Badge } from "@/src/component/ui/badge";
import { cn } from "@/src/lib/utils";
import { LogOut, Home, QrCode, User } from "lucide-react";
// import MobileLayout from "@/components/mobile/MobileLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/type";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  Estate,
  useLazyGetEstateBySlguQuery,
} from "@/src/lib/features/api/estateApi";
import { logoutUser } from "@/src/lib/slice/userSlice";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = useSelector((s: RootState) => s.user);
  const { tenantSlug } = useParams<{ tenantSlug: string }>();
  const slug = tenantSlug;
  const [estate, setEstate] = useState<Estate>({} as Estate);
  const [getEstate] = useLazyGetEstateBySlguQuery();
  const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState(false);
  const [showBottomNav, setShowBottomNav] = useState();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              <Image
                src={"/logo/logoDark.png"}
                alt={"test"}
                width={40}
                height={40}
              />
              <h1 className="text-xl font-bold text-navy">Entri</h1>
            </div>
            <div>
              <h1 className="font-semibold text-foreground text-sm md:text-base">
                {user?.name}
              </h1>
              <p className="text-xs text-muted-foreground">Resident Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <Badge variant="default" className="hidden sm:flex text-xs">
              {estate.estateName}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSettingsModalOpen(true)}
              className="tap-target flex items-center gap-1 p-2"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Settings</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="tap-target flex items-center gap-1 p-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main
        className={cn("flex-1 px-4 py-6", showBottomNav && "pb-20 md:pb-6")}
      >
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>

      {/* Mobile Bottom Navigation */}
      {/* {showBottomNav && (
        <MobileBottomNav tenantSlug={tenant?.slug} userRole={profile?.role} />
      )} */}
    </div>
  );
}
