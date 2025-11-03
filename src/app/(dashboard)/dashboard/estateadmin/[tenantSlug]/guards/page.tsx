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
  UserPlus,
  Phone,
  Mail,
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
      <div className="">
        <div className="sm:flex items-center justify-between mb-4">
          <div className="mb-5 sm:mb-0">
            <h1 className="text-xl lg:text-3xl font-bold">
              Security Guard Management
            </h1>
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

          <CardContent className="p-0">
            {guards.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  No Security Guards Found
                </h3>
                <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                  Add security guards to help manage access control and monitor
                  estate security.
                </p>
                <Button onClick={() => setOpen(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add First Guard
                </Button>
              </div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="md:hidden space-y-4 p-4">
                  {guards.map((guard) => (
                    <Card
                      key={guard.id}
                      className="p-4 border-l-4 border-l-blue-500"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Shield className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">
                              {guard.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {guard.email}
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <div className="text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            Phone
                          </div>
                          <div className="font-medium">
                            {guard.phone || "N/A"}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Added</div>
                          <div className="font-medium">
                            {new Date(guard.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-3 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditGuard(guard)}
                          className="flex-1"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[220px] min-w-[200px]">
                            Security Guard
                          </TableHead>
                          <TableHead className="w-[220px] min-w-[180px]">
                            Email
                          </TableHead>
                          <TableHead className="w-[140px] min-w-[120px]">
                            Phone
                          </TableHead>
                          <TableHead className="w-[120px] min-w-[120px]">
                            Added
                          </TableHead>
                          <TableHead className="w-[140px] min-w-[120px]">
                            Status
                          </TableHead>
                          <TableHead className="w-[120px] min-w-[100px] text-right">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {guards.map((guard) => (
                          <TableRow
                            key={guard.id}
                            className="hover:bg-muted/50"
                          >
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <Shield className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-foreground">
                                    {guard.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Security Guard
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Mail className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                <span className="truncate text-muted-foreground">
                                  {guard.email}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Phone className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                <span className="truncate">
                                  {guard.phone || "N/A"}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-muted-foreground">
                                {new Date(guard.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="secondary"
                                className="flex items-center gap-1 w-fit bg-green-50 text-green-700 border-green-200"
                              >
                                <CheckCircle className="h-3 w-3" />
                                Active
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditGuard(guard)}
                                  className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                  <span className="sr-only">Edit guard</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  <span className="sr-only">Delete guard</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </>
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
