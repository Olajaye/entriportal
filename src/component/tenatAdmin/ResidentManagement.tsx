// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Badge } from '@/components/ui/badge';
// import { useToast } from '@/hooks/use-toast';
// import { supabase } from '@/integrations/supabase/client';
// import { useAuth } from '@/hooks/useAuth';
// import { useTenant } from '@/contexts/TenantContext';
// import TenantLayout from './TenantLayout';
// import UserEditModal from './UserEditModal';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Plus, Users, Edit, Trash2, Copy, Eye, EyeOff, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

// interface Resident {
//   id: string;
//   user_id: string;
//   full_name: string;
//   unit_number: string;
//   phone: string;
//   email?: string;
//   created_at: string;
//   password_change_required?: boolean;
//   temp_password_expires?: string;
//   role: 'resident';
// }

// const ResidentManagement = () => {
//   const [residents, setResidents] = useState<Resident[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isAddingResident, setIsAddingResident] = useState(false);
//   const [newResident, setNewResident] = useState({
//     fullName: '',
//     email: '',
//     unitNumber: '',
//     phone: '',
//   });
//   const [tempCredentials, setTempCredentials] = useState<{email: string, password: string} | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const { profile } = useAuth();
//   const { tenant } = useTenant();
//   const { toast } = useToast();

//   useEffect(() => {
//     if (profile?.tenant_id && tenant) {
//       fetchResidents();
//     }
//   }, [profile, tenant]);

//   const fetchResidents = async () => {
//     if (!profile?.tenant_id) return;

//     setLoading(true);
//     try {
//       // Get residents with password status
//       const { data: profilesData, error: profilesError } = await supabase
//         .from('profiles')
//         .select('id, user_id, full_name, unit_number, phone, created_at, password_change_required, temp_password_expires')
//         .eq('tenant_id', profile.tenant_id)
//         .eq('role', 'resident')
//         .order('created_at', { ascending: false });

//       if (profilesError) throw profilesError;

//       // Fetch emails for residents using the new function
//       const residentsWithEmailPromises = (profilesData || []).map(async (resident) => {
//         try {
//           const { data: emailData, error: emailError } = await supabase.rpc('get_user_email_for_tenant_admin', { user_uuid: resident.user_id });

//           if (emailError) {
//             console.error('Error fetching email for resident:', resident.user_id, emailError);
//             return { ...resident, email: 'Email unavailable', role: 'resident' as const };
//           }

//           return { ...resident, email: emailData || 'Email unavailable', role: 'resident' as const };
//         } catch (error) {
//           console.error('Exception fetching email for resident:', resident.user_id, error);
//           return { ...resident, email: 'Email unavailable', role: 'resident' as const };
//         }
//       });

//       const residentsWithEmails = await Promise.all(residentsWithEmailPromises);
//       setResidents(residentsWithEmails);
//     } catch (error) {
//       console.error('Error fetching residents:', error);
//       toast({
//         title: 'Error',
//         description: 'Failed to fetch residents',
//         variant: 'destructive',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddResident = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!tenant) return;

//     setIsAddingResident(true);
//     try {
//       // Create user via edge function
//       const { data, error } = await supabase.functions.invoke('create-tenant-user', {
//         body: {
//           email: newResident.email,
//           fullName: newResident.fullName,
//           role: 'resident',
//           tenantId: tenant.id,
//           unitNumber: newResident.unitNumber,
//           phone: newResident.phone,
//         },
//       });

//       if (error) {
//         // Extract error message from the response
//         let errorMessage = 'Failed to add resident';
//         if (error.message) {
//           errorMessage = error.message;
//         }
//         throw new Error(errorMessage);
//       }

//       // Check if the function returned an error in the response
//       if (data && data.error) {
//         throw new Error(data.error);
//       }

//       // Store temporary credentials for display
//       if (data && data.tempPassword) {
//         setTempCredentials({
//           email: data.email,
//           password: data.tempPassword
//         });
//       }

//       toast({
//         title: 'Success',
//         description: `Resident ${newResident.fullName} has been added successfully. Temporary credentials are displayed below.`,
//       });

//       setNewResident({
//         fullName: '',
//         email: '',
//         unitNumber: '',
//         phone: '',
//       });

//       await fetchResidents();
//     } catch (error: any) {
//       console.error('Error adding resident:', error);
//       toast({
//         title: 'Error',
//         description: error.message || 'Failed to add resident',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsAddingResident(false);
//     }
//   };

//   const copyCredentials = () => {
//     if (tempCredentials) {
//       const text = `Email: ${tempCredentials.email}\nTemporary Password: ${tempCredentials.password}`;
//       navigator.clipboard.writeText(text);
//       toast({
//         title: 'Copied',
//         description: 'Login credentials copied to clipboard',
//       });
//     }
//   };

//   const handleEditResident = (resident: Resident) => {
//     setSelectedResident(resident);
//     setIsEditModalOpen(true);
//   };

//   const handleCloseEditModal = () => {
//     setIsEditModalOpen(false);
//     setSelectedResident(null);
//   };

//   const getPasswordStatusBadge = (resident: Resident) => {
//     if (!resident.password_change_required) {
//       return <Badge variant="default" className="flex items-center gap-1"><CheckCircle className="h-3 w-3" />Active</Badge>;
//     }

//     const hasExpired = resident.temp_password_expires && new Date(resident.temp_password_expires) < new Date();
//     if (hasExpired) {
//       return <Badge variant="destructive" className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" />Expired</Badge>;
//     }

//     return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="h-3 w-3" />Temp Password</Badge>;
//   };

//   if (loading) {
//     return (
//       <TenantLayout>
//         <div className="flex items-center justify-center min-h-[400px]">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//         </div>
//       </TenantLayout>
//     );
//   }

//   return (
//     <TenantLayout>
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold">Resident Management</h1>
//             <p className="text-muted-foreground">Manage residents in your estate</p>
//           </div>

//           <Dialog>
//             <DialogTrigger asChild>
//               <Button>
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add Resident
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-md">
//               <DialogHeader>
//                 <DialogTitle>Add New Resident</DialogTitle>
//               </DialogHeader>
//               <form onSubmit={handleAddResident} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="fullName">Full Name</Label>
//                   <Input
//                     id="fullName"
//                     value={newResident.fullName}
//                     onChange={(e) => setNewResident({ ...newResident, fullName: e.target.value })}
//                     placeholder="Enter full name"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={newResident.email}
//                     onChange={(e) => setNewResident({ ...newResident, email: e.target.value })}
//                     placeholder="Enter email address"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="unitNumber">Unit Number</Label>
//                   <Input
//                     id="unitNumber"
//                     value={newResident.unitNumber}
//                     onChange={(e) => setNewResident({ ...newResident, unitNumber: e.target.value })}
//                     placeholder="Enter unit number"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="phone">Phone Number</Label>
//                   <Input
//                     id="phone"
//                     value={newResident.phone}
//                     onChange={(e) => setNewResident({ ...newResident, phone: e.target.value })}
//                     placeholder="Enter phone number"
//                   />
//                 </div>

//                 <Button type="submit" className="w-full" disabled={isAddingResident}>
//                   {isAddingResident ? 'Adding...' : 'Add Resident'}
//                 </Button>

//                 {tempCredentials && (
//                   <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
//                     <h4 className="font-semibold text-sm mb-2">Temporary Login Credentials</h4>
//                     <div className="space-y-2 text-sm">
//                       <div>
//                         <span className="font-medium">Email:</span> {tempCredentials.email}
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span className="font-medium">Password:</span>
//                         <span className="font-mono bg-background px-2 py-1 rounded">
//                           {showPassword ? tempCredentials.password : '••••••••••'}
//                         </span>
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => setShowPassword(!showPassword)}
//                         >
//                           {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                         </Button>
//                       </div>
//                     </div>
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       className="mt-2 w-full"
//                       onClick={copyCredentials}
//                     >
//                       <Copy className="h-4 w-4 mr-2" />
//                       Copy Credentials
//                     </Button>
//                     <p className="text-xs text-muted-foreground mt-2">
//                       Share these credentials securely with the resident. They must change their password on first login.
//                     </p>
//                   </div>
//                 )}
//               </form>
//             </DialogContent>
//           </Dialog>
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Users className="h-5 w-5" />
//               Residents ({residents.length})
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {residents.length === 0 ? (
//               <div className="text-center py-8">
//                 <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//                 <h3 className="text-lg font-semibold mb-2">No residents found</h3>
//                 <p className="text-muted-foreground mb-4">
//                   Get started by adding your first resident to the estate.
//                 </p>
//               </div>
//             ) : (
//                 <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Email</TableHead>
//                     <TableHead>Unit Number</TableHead>
//                     <TableHead>Phone</TableHead>
//                     <TableHead>Password Status</TableHead>
//                     <TableHead>Registered</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {residents.map((resident) => (
//                     <TableRow key={resident.id}>
//                       <TableCell className="font-medium">{resident.full_name}</TableCell>
//                       <TableCell className="text-muted-foreground">{resident.email}</TableCell>
//                       <TableCell>{resident.unit_number || 'N/A'}</TableCell>
//                       <TableCell>{resident.phone || 'N/A'}</TableCell>
//                       <TableCell>{getPasswordStatusBadge(resident)}</TableCell>
//                       <TableCell>{new Date(resident.created_at).toLocaleDateString()}</TableCell>
//                       <TableCell>
//                         <div className="flex items-center gap-2">
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => handleEditResident(resident)}
//                           >
//                             <Edit className="h-4 w-4" />
//                           </Button>
//                           <Button variant="outline" size="sm">
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             )}
//           </CardContent>
//         </Card>
//       </div>

//       <UserEditModal
//         user={selectedResident}
//         isOpen={isEditModalOpen}
//         onClose={handleCloseEditModal}
//         onUserUpdated={fetchResidents}
//         tempCredentials={tempCredentials}
//         onSetTempCredentials={setTempCredentials}
//       />
//     </TenantLayout>
//   );
// };

// export default ResidentManagement;
