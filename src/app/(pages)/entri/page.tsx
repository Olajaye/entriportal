"use client";
import React, { useState, useEffect, use } from "react";
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
import toast from "react-hot-toast";
import { Building2, Users, Shield, Search, UserCog } from "lucide-react";
import {
  Estate,
  useLazyGetAllEstateQuery,
} from "@/src/lib/features/api/estateApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/src/component/Logo";

const Page = () => {
  const [userType, setUserType] = useState<
    "admin" | "resident" | "guard" | null
  >(null);
  const [estateName, setEstateName] = useState("");
  const [estates, setEstates] = useState<Estate[]>([]);
  const [selectedEstate, setSelectedEstate] = useState<Estate | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [getAllEstate] = useLazyGetAllEstateQuery();

  const route = useRouter();

  const user = null;
  const profile = null;

  // Check if user is already authenticated and redirect appropriately
  // useEffect(() => {
  //   if (user && profile) {
  //     if (profile.role === "superadmin") {
  //       navigate("/superadmin-portal");
  //       return;
  //     }

  //     navigate("/dashboard");
  //   }
  // }, [user, profile, navigate]);

  // Load remembered estate from localStorage
  useEffect(() => {
    const rememberedEstate = localStorage.getItem("rememberedEstate");
    if (rememberedEstate) {
      setEstateName(rememberedEstate);
    }
  }, []);

  // Search estates when user types
  useEffect(() => {
    const searchEstates = async () => {
      if (estateName.length < 2) {
        setEstates([]);
        return;
      }

      setIsSearching(true);

      // Pass dynamic timestamp to force cache bypass
      getAllEstate({ search: estateName, ts: Date.now() })
        .unwrap()
        .then((res) => {
          setEstates(res.estates || []);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error searching estates");
        })
        .finally(() => {
          setIsSearching(false);
        });
    };

    const debounceTimer = setTimeout(searchEstates, 300);
    return () => clearTimeout(debounceTimer);
  }, [estateName]);

  const handleEstateSelect = (estate: Estate) => {
    setEstateName(estate.estateName);
    setSelectedEstate(estate);
    setEstates([]);
    localStorage.setItem("rememberedEstate", estate.estateName);
  };

  const handleProceed = async () => {
    if (!userType || !estateName.trim()) {
      toast.error("Missing Information");
      return;
    }

    // setIsLoading(true);

    if (!selectedEstate) {
      toast.error("Please check the estate name and try again.");
      return;
    }

    if (userType === "admin") {
      route.push(`/estate/${selectedEstate.slug}/tenant-admin`);
    } else if (userType === "resident") {
      route.push(`/estate/${selectedEstate.slug}/resident`);
    } else if (userType === "guard") {
      route.push(`/estate/${selectedEstate.slug}/guard`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-offWhite via-background to-lightGray flex items-center justify-center p-4 mobile-scroll">
      <div className="w-full max-w-md space-y-4 md:space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Logo />
          <h1 className="text-2xl sm:text-3xl tracking-tight break-words font-inter  text-charcoal">
            Welcome to Entri
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base break-words text-slateGray ">
            Your estate management solution
          </p>
        </div>

        {/* User Type Selection */}
        {!userType && (
          <Card>
            <CardHeader>
              <CardTitle className="text-charcoal font-inter">
                Who are you?
              </CardTitle>
              <CardDescription className="text-slateGray font-inter">
                Select your role to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full h-auto p-2 md:p-3 text-left tap-target"
                onClick={() => setUserType("admin")}
              >
                <div className="flex flex-wrap items-center space-x-3">
                  <UserCog className="h-7 w-7 md:h-10 md:w-10 flex-shrink-0 text-primaryCol" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm md:text-base font-inter text-charcoal">
                      Estate Admin
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground break-words text-slateGray">
                      Manage residents, guards, and estate operations
                    </div>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full h-auto p-2 md:p-3 text-left tap-target"
                onClick={() => setUserType("resident")}
              >
                <div className="flex items-center space-x-3">
                  <Users className="h-7 w-7 md:h-10 md:w-10  flex-shrink-0 text-primaryCol" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm md:text-base font-inter text-charcoal">
                      Resident
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground break-words">
                      Generate access codes and manage visitors
                    </div>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full h-auto p-2 md:p-3 text-left tap-target"
                onClick={() => setUserType("guard")}
              >
                <div className="flex items-center space-x-3">
                  <Shield className="h-7 w-7 md:h-10 md:w-10  flex-shrink-0 text-primaryCol" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm md:text-base font-inter text-charcoal">
                      Security Guard
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground break-words">
                      Validate access codes and monitor security
                    </div>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Estate Selection */}
        {userType && (
          <Card>
            <CardHeader>
              <CardTitle className="text-charcoal font-inter">
                Enter Your Estate
              </CardTitle>
              <CardDescription className="font-inter text-charcoal">
                {userType === "admin"
                  ? "Enter the name of the estate you manage"
                  : userType === "resident"
                  ? "Enter the name of your estate"
                  : "Enter the name of the estate you work at"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="estate" className="font-inter">
                  Estate Name
                </Label>
                <div className="relative">
                  <Input
                    id="estate"
                    type="text"
                    placeholder="e.g., Sunrise Gardens, Palm Valley..."
                    value={estateName}
                    onChange={(e) => setEstateName(e.target.value)}
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              {/* Estate suggestions */}
              {estates.length > 0 && (
                <div className="space-y-1 max-h-32 overflow-y-auto border rounded-md">
                  {estates.map((estate) => (
                    <button
                      key={estate.id}
                      className="w-full px-3 py-2 text-left hover:bg-muted transition-colors"
                      onClick={() => handleEstateSelect(estate)}
                    >
                      <div className="font-medium">{estate.estateName}</div>
                    </button>
                  ))}
                </div>
              )}

              {isSearching && (
                <div className="text-sm text-muted-foreground flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-navy"></div>
                  <span>Searching estates...</span>
                </div>
              )}

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setUserType(null)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleProceed}
                  disabled={isLoading || !estateName.trim()}
                  className="flex-1"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground px-2">
          <p className="break-words">
            Secure estate management for modern communities
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
