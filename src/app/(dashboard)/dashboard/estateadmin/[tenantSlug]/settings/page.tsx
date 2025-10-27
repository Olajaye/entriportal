"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/component/ui/card";
import { Badge } from "@/src/component/ui/badge";
import { Button } from "@/src/component/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/component/ui/dialog";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/src/component/ui/input";
import { Label } from "@/src/component/ui/label";
import {
  Settings,
  Building2,
  Globe,
  Copy,
  ExternalLink,
  Plus,
} from "lucide-react";
import { useParams } from "next/navigation";
import {
  Estate,
  useLazyGetEstateBySlguQuery,
} from "@/src/lib/features/api/estateApi";
import { useSelector } from "react-redux";
import { RootState } from "@/src/type";
import toast from "react-hot-toast";
import { generatePassword } from "@/src/utils/generatePassword";
import { useCreateUserMutation } from "@/src/lib/features/api/userApi";

const EstateSettings = () => {
  const { user } = useSelector((s: RootState) => s.user);
  const [estate, setEstate] = useState<Estate | null>(null);
  const { tenantSlug } = useParams<{ tenantSlug: string }>();
  const slug = tenantSlug;
  const [getEstate, { isLoading }] = useLazyGetEstateBySlguQuery();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [refetch, setRefetch] = useState("");
  const [isAddingResident, setIsAddingResident] = useState(false);
  const [createUser] = useCreateUserMutation();
  const [newAdmin, setNewAdmin] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!estate) return;

    setIsAddingResident(true);

    const payload = {
      name: newAdmin.fullName,
      email: newAdmin.email,
      phone: newAdmin.phone,
      userType: "TENANTADMIN",
      estateId: estate.id,
      password: newAdmin.password,
    };

    createUser(payload)
      .unwrap()
      .then((res) => {
        console.log(res);
        toast.success("Estate Admin added successfully");
        setRefetch(Math.random().toString());
        setNewAdmin({
          fullName: "",
          email: "",
          phone: "",
          password: "",
        });
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error adding resident:", error);
        toast.error(`Failed to add resident ${error.data.message || ""}`);
      })
      .finally(() => {
        setIsAddingResident(false);
      });
  };

  const handleGeneratePassword = () => {
    const generatedPassword = generatePassword();
    setNewAdmin({ ...newAdmin, password: generatedPassword });
  };

  useEffect(() => {
    if (!slug) return;
    getEstate(slug)
      .unwrap()
      .then((res) => {
        setEstate(res);
      });
  }, []);

  const copyAccessUrl = () => {
    const url = `${window.location.origin}/estate/${slug}/tenant-admin`;
    navigator.clipboard.writeText(url);
    toast.success("Access URL copied to clipboard");
  };

  const openAccessUrl = () => {
    const url = `${window.location.origin}/estate/${slug}/tenant-admin`;
    window.open(url, "_blank");
  };

  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryCol"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Estate Settings</h1>
            <p className="text-muted-foreground">
              Manage your estate configuration and information
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* <Button variant="default" size="sm">
              Edit Settings
            </Button> */}

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Admin
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Estate Admin</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddAdmin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={newAdmin.fullName}
                      onChange={(e) =>
                        setNewAdmin({
                          ...newAdmin,
                          fullName: e.target.value,
                        })
                      }
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newAdmin.email}
                      onChange={(e) =>
                        setNewAdmin({
                          ...newAdmin,
                          email: e.target.value,
                        })
                      }
                      placeholder="Enter email address"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={newAdmin.phone}
                      onChange={(e) =>
                        setNewAdmin({
                          ...newAdmin,
                          phone: e.target.value,
                        })
                      }
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg border">
                    <h4 className="font-semibold text-sm mb-2">
                      Generate Temporary Password
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Password:</span>
                        <span className="font-mono bg-background px-2 py-1 rounded">
                          {showPassword
                            ? `${newAdmin.password || "Not generated"}`
                            : "••••••••••••••"}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2 w-full"
                      onClick={handleGeneratePassword}
                    >
                      Generate Temporary Password
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Share these credentials securely. They must change their
                      password on first login.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isAddingResident}
                  >
                    {isAddingResident ? "Adding..." : "Add Resident"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Estate Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Estate Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium">Estate Name</label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {estate?.estateName}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium">Estate Slug</label>
                  <p className="text-sm text-muted-foreground mt-1 font-mono">
                    {estate?.slug}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium">Status</label>
                  <div className="mt-1">
                    {/* tenant.is_active */}
                    <Badge variant={true ? "default" : "secondary"}>
                      {true ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Created</label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(estate?.createdAt ?? "").toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Access URL */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Access Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Estate Access URL</label>
                <div className="mt-2 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <code className="text-sm font-mono">
                      {window.location.origin}/estate/{slug}/tenant-admin
                    </code>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyAccessUrl}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={openAccessUrl}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Share this URL with residents and staff to access the estate
                  portal
                </p>
              </div>

              <div>
                <label className="text-sm font-medium">Your Role</label>
                <p className="text-sm text-muted-foreground mt-1 capitalize">
                  {user?.userType}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Estate Address (if available) */}

          {estate?.estateAddress && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Estate Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium">Street</label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {estate.estateAddress.streetName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">City</label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {estate.estateAddress.city}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">State</label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {estate.estateAddress.state}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">ZIP Code</label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {estate.estateAddress.zipCode}
                    </p>
                  </div>
                  <div className="md:col-span-2 lg:col-span-4">
                    <label className="text-sm font-medium">Country</label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {estate.estateAddress.country}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* System Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <label className="font-medium">Current Version</label>
                  <p className="text-muted-foreground mt-1">v1.0.0</p>
                </div>
                <div>
                  <label className="font-medium">Last Updated</label>
                  <p className="text-muted-foreground mt-1">
                    {new Date(estate?.updatedAt ?? "").toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="font-medium">Estate ID</label>
                  <p className="text-muted-foreground mt-1 font-mono text-xs">
                    {estate?.id}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default EstateSettings;
