"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/component/ui/card";
import { Button } from "@/src/component/ui/button";
import { Input } from "@/src/component/ui/input";
import { Label } from "@/src/component/ui/label";
import { Badge } from "@/src/component/ui/badge";

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
  Users,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  UserPlus,
  Mail,
  Phone,
  Shield,
} from "lucide-react";
import { useParams } from "next/navigation";
import {
  Estate,
  useLazyGetEstateBySlguQuery,
} from "@/src/lib/features/api/estateApi";
import toast from "react-hot-toast";
import { generatePassword } from "@/src/utils/generatePassword";
import {
  useCreateUserMutation,
  useLazyGetUsersQuery,
} from "@/src/lib/features/api/userApi";
import UserEditModal from "@/src/component/miniComp/UserEditModal";
import { Resident } from "@/src/type";

const ResidentManagement = () => {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingResident, setIsAddingResident] = useState(false);
  const [newResident, setNewResident] = useState({
    fullName: "",
    email: "",
    unitNumber: "",
    phone: "",
    password: "",
  });

  const [tempCredentials, setTempCredentials] = useState<{
    email: string;
    password: string;
  } | null>(null);

  const [showPassword, setShowPassword] = useState(true);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { tenantSlug } = useParams<{ tenantSlug: string }>();
  const slug = tenantSlug;
  const [estate, setEstate] = useState<Estate | null>(null);
  const [refetch, setRefetch] = useState("");
  const [getEstate] = useLazyGetEstateBySlguQuery();
  const [createUser] = useCreateUserMutation();
  const [getUsers] = useLazyGetUsersQuery();
  const [open, setOpen] = useState(false);

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
    getUsers({ estateId: estate?.id || "", userType: "RESIDENT" })
      .unwrap()
      .then((res) => {
        setResidents(res);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(`Failed to fetch residents ${error}`);
      })
      .finally(() => setLoading(false));
  }, [estate, refetch]);

  const handleGeneratePassword = () => {
    const generatedPassword = generatePassword();
    setNewResident({ ...newResident, password: generatedPassword });
  };

  const handleAddResident = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!estate) return;

    setIsAddingResident(true);

    const payload = {
      name: newResident.fullName,
      email: newResident.email,
      phone: newResident.phone,
      unitNumber: newResident.unitNumber,
      userType: "RESIDENT",
      estateId: estate.id,
      password: newResident.password,
    };

    createUser(payload)
      .unwrap()
      .then((res) => {
        toast.success("Resident added successfully");
        setRefetch(Math.random().toString());
        setNewResident({
          fullName: "",
          email: "",
          unitNumber: "",
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
        setIsAddingResident(false);
      });
  };

  const copyCredentials = () => {
    if (tempCredentials) {
      const text = `Email: ${tempCredentials.email}\nTemporary Password: ${tempCredentials.password}`;
      navigator.clipboard.writeText(text);
      toast.success("Login credentials copied to clipboard");
    }
  };

  const handleEditResident = (resident: Resident) => {
    setSelectedResident(resident);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedResident(null);
  };

  // const getPasswordStatusBadge = (resident: Resident) => {
  //   if (!resident) {
  //     return (
  //       <Badge variant="default" className="flex items-center gap-1">
  //         <CheckCircle className="h-3 w-3" />
  //         Active
  //       </Badge>
  //     );
  //   }

  //   const hasExpired =
  //     resident.temp_password_expires &&
  //     new Date(resident.temp_password_expires) < new Date();
  //   if (hasExpired) {
  //     return (
  //       <Badge variant="destructive" className="flex items-center gap-1">
  //         <AlertTriangle className="h-3 w-3" />
  //         Expired
  //       </Badge>
  //     );
  //   }

  //   return (
  //     <Badge variant="secondary" className="flex items-center gap-1">
  //       <Clock className="h-3 w-3" />
  //       Temp Password
  //     </Badge>
  //   );
  // };

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
              Resident Management
            </h1>
            <p className="text-muted-foreground">
              Manage residents in your estate
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Resident
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Resident</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddResident} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={newResident.fullName}
                    onChange={(e) =>
                      setNewResident({
                        ...newResident,
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
                    value={newResident.email}
                    onChange={(e) =>
                      setNewResident({ ...newResident, email: e.target.value })
                    }
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unitNumber">Unit Number</Label>
                  <Input
                    id="unitNumber"
                    value={newResident.unitNumber}
                    onChange={(e) =>
                      setNewResident({
                        ...newResident,
                        unitNumber: e.target.value,
                      })
                    }
                    placeholder="Enter unit number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newResident.phone}
                    onChange={(e) =>
                      setNewResident({ ...newResident, phone: e.target.value })
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
                          ? `${newResident.password || "Not generated"}`
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Residents ({residents.length})
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            {residents.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  No Residents Found
                </h3>
                <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                  Get started by adding your first resident to the estate
                  management system.
                </p>
                <Button onClick={() => setOpen(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add First Resident
                </Button>
              </div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="md:hidden space-y-4 p-4">
                  {residents.map((resident) => (
                    <Card
                      key={resident.id}
                      className="p-4 border-l-4 border-l-blue-500"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Shield className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">
                              {resident.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {resident.email}
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
                            {resident.phone || "N/A"}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Added</div>
                          <div className="font-medium">
                            {new Date(resident.createdAt).toLocaleDateString(
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
                          onClick={() => handleEditResident(resident)}
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
                <div className="hidden md:block overflow-hidden">
                  <div className="overflow-hidden">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[180px] min-w-[150px]">
                              Name
                            </TableHead>
                            <TableHead className="w-[220px] min-w-[180px]">
                              Email
                            </TableHead>
                            <TableHead className="w-[120px] min-w-[100px]">
                              Unit
                            </TableHead>
                            <TableHead className="w-[140px] min-w-[120px]">
                              Phone
                            </TableHead>
                            <TableHead className="w-[140px] min-w-[120px]">
                              Status
                            </TableHead>
                            <TableHead className="w-[120px] min-w-[130px]">
                              Registered
                            </TableHead>
                            <TableHead className="w-[120px] min-w-[100px] text-right">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {residents.map((resident) => (
                            <TableRow
                              key={resident.id}
                              className="hover:bg-muted/50"
                            >
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-medium text-primary">
                                      {resident.name.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                  <span className="truncate">
                                    {resident.name}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Mail className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                  <span className="truncate text-muted-foreground">
                                    {resident.email}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className="font-normal"
                                >
                                  {resident.unitNumber || "N/A"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                  <span className="truncate">
                                    {resident.phone || "N/A"}
                                  </span>
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
                                <div className="text-sm text-muted-foreground">
                                  {new Date(
                                    resident.createdAt
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center justify-end gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEditResident(resident)}
                                    className="h-8 w-8 p-0 hover:bg-primary/10"
                                  >
                                    <Edit className="h-3.5 w-3.5" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <UserEditModal
        user={selectedResident}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onUserUpdated={() => console.log("run")}
        tempCredentials={tempCredentials}
        onSetTempCredentials={setTempCredentials}
      />
    </>
  );
};

export default ResidentManagement;
