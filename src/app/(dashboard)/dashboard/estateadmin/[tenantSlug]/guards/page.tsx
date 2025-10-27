"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/component/ui/card";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/component/ui/dialog";
import {
  Plus,
  Shield,
  Edit,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/src/component/ui/button";
import { Input } from "@/src/component/ui/input";
import { Label } from "@/src/component/ui/label";
import { Badge } from "@/src/component/ui/badge";
import { generatePassword } from "@/src/utils/generatePassword";
import UserEditModal from "@/src/component/miniComp/UserEditModal";
import { Guard } from "@/src/type";
import {
  useCreateUserMutation,
  useLazyGetUsersQuery,
} from "@/src/lib/features/api/userApi";
import { useParams } from "next/navigation";
import {
  Estate,
  useLazyGetEstateBySlguQuery,
} from "@/src/lib/features/api/estateApi";
import toast from "react-hot-toast";

const GuardManagement = () => {
  const [guards, setGuards] = useState<Guard[]>([]);
  const { tenantSlug } = useParams<{ tenantSlug: string }>();
  const slug = tenantSlug;
  const [loading, setLoading] = useState(true);
  const [isAddingGuard, setIsAddingGuard] = useState(false);
  const [newGuard, setNewGuard] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [tempCredentials, setTempCredentials] = useState<{
    email: string;
    password: string;
  } | null>(null);
  const [getUsers] = useLazyGetUsersQuery();
  const [showPassword, setShowPassword] = useState(true);
  const [selectedGuard, setSelectedGuard] = useState<Guard | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [estate, setEstate] = useState<Estate | null>(null);
  const [refetch, setRefetch] = useState("");
  const [getEstate] = useLazyGetEstateBySlguQuery();
  const [createUser] = useCreateUserMutation();
  const [open, setOpen] = useState(false);
  const [editModalTempCredentials, setEditModalTempCredentials] = useState<{
    email: string;
    password: string;
  } | null>(null);

  useEffect(() => {
    if (!slug) return;
    getEstate(slug)
      .unwrap()
      .then((res) => {
        setEstate(res);
      });
  }, []);

  useEffect(() => {
    if (!estate) return;
    setLoading(true);
    getUsers({ estateId: estate?.id || "", userType: "GUARD" })
      .unwrap()
      .then((res) => {
        setGuards(res);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Failed to fetch residents ${error}`);
      })
      .finally(() => setLoading(false));
  }, [estate, refetch]);

  const handleGeneratePassword = () => {
    const generatedPassword = generatePassword();
    setNewGuard({ ...newGuard, password: generatedPassword });
  };

  const handleAddGuard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!estate) return;

    setIsAddingGuard(true);

    const payload = {
      name: newGuard.fullName,
      email: newGuard.email,
      phone: newGuard.phone,
      userType: "GUARD",
      estateId: estate.id,
      password: newGuard.password,
    };

    createUser(payload)
      .unwrap()
      .then((res) => {
        toast.success("Resident added successfully");
        setRefetch(Math.random().toString());
        setNewGuard({
          fullName: "",
          email: "",

          phone: "",
          password: "",
        });
        setOpen(false); // 👈 CLOSE THE DIALOG HERE
      })
      .catch((error) => {
        console.error("Error adding resident:", error);
        toast.error(`Failed to add resident ${error.data.message || ""}`);
      })
      .finally(() => {
        setIsAddingGuard(false);
      });
  };

  const copyCredentials = () => {
    if (tempCredentials) {
      const text = `Email: ${tempCredentials.email}\nTemporary Password: ${tempCredentials.password}`;
      navigator.clipboard.writeText(text);
      // toast({
      //   title: "Copied",
      //   description: "Login credentials copied to clipboard",
      // });
    }
  };

  const handleEditGuard = (guard: Guard) => {
    setSelectedGuard(guard);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedGuard(null);
  };

  const getPasswordStatusBadge = (guard: Guard) => {
    // if (!guard.password_change_required) {
    //   return (
    //     <Badge variant="default" className="flex items-center gap-1">
    //       <CheckCircle className="h-3 w-3" />
    //       Active
    //     </Badge>
    //   );
    // }
    // const hasExpired =
    //   guard.temp_password_expires &&
    //   new Date(guard.temp_password_expires) < new Date();
    // if (hasExpired) {
    //   return (
    //     <Badge variant="destructive" className="flex items-center gap-1">
    //       <AlertTriangle className="h-3 w-3" />
    //       Expired
    //     </Badge>
    //   );
    // }
    // return (
    //   <Badge variant="secondary" className="flex items-center gap-1">
    //     <Clock className="h-3 w-3" />
    //     Temp Password
    //   </Badge>
    // );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Security Guard Management</h1>
            <p className="text-muted-foreground">
              Manage security guards for your estate
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Guard
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Security Guard</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddGuard} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={newGuard.fullName}
                    onChange={(e) =>
                      setNewGuard({ ...newGuard, fullName: e.target.value })
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
                    value={newGuard.email}
                    onChange={(e) =>
                      setNewGuard({ ...newGuard, email: e.target.value })
                    }
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newGuard.phone}
                    onChange={(e) =>
                      setNewGuard({ ...newGuard, phone: e.target.value })
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
                          ? `${newGuard.password || "Not generated"}`
                          : "Not generated••••••••••"}
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
                  disabled={isAddingGuard}
                >
                  {isAddingGuard ? "Adding..." : "Add Security Guard"}
                </Button>

                {tempCredentials && (
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
                    <h4 className="font-semibold text-sm mb-2">
                      Temporary Login Credentials
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Email:</span>{" "}
                        {tempCredentials.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Password:</span>
                        <span className="font-mono bg-background px-2 py-1 rounded">
                          {showPassword
                            ? tempCredentials.password
                            : "••••••••••"}
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
                      onClick={copyCredentials}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Credentials
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Share these credentials securely with the security guard.
                      They must change their password on first login.
                    </p>
                  </div>
                )}
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Guards ({guards.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {guards.length === 0 ? (
              <div className="text-center py-8">
                <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No security guards found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Add security guards to help manage access to your estate.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Added</TableHead>
                    <TableHead>Password Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guards.map((guard) => (
                    <TableRow key={guard.id}>
                      <TableCell className="font-medium">
                        {guard.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {guard.email}
                      </TableCell>
                      <TableCell>{guard.phone || "N/A"}</TableCell>
                      <TableCell>
                        {new Date(guard.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="default"
                          className="flex items-center gap-1"
                        >
                          <CheckCircle className="h-3 w-3" />
                          Active
                        </Badge>
                      </TableCell>
                      {/* <TableCell>{getPasswordStatusBadge(guard.status)}</TableCell> */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditGuard(guard)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
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

      <UserEditModal
        user={selectedGuard}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onUserUpdated={() => console.log("run")}
        tempCredentials={editModalTempCredentials}
        onSetTempCredentials={setEditModalTempCredentials}
      />
    </>
  );
};

export default GuardManagement;
