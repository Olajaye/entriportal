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
// import { Plus, Shield, Edit, Trash2, Copy, Eye, EyeOff, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

// interface Guard {
//   id: string;
//   user_id: string;
//   full_name: string;
//   phone: string;
//   email?: string;
//   created_at: string;
//   password_change_required?: boolean;
//   temp_password_expires?: string;
//   role: 'guard';
// }

// const GuardManagement = () => {
//   const [guards, setGuards] = useState<Guard[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isAddingGuard, setIsAddingGuard] = useState(false);
//   const [newGuard, setNewGuard] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//   });
//   const [tempCredentials, setTempCredentials] = useState<{email: string, password: string} | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [selectedGuard, setSelectedGuard] = useState<Guard | null>(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editModalTempCredentials, setEditModalTempCredentials] = useState<{email: string, password: string} | null>(null);
//   const { profile } = useAuth();
//   const { tenant } = useTenant();
//   const { toast } = useToast();

//   useEffect(() => {
//     if (profile?.tenant_id && tenant) {
//       fetchGuards();
//     }
//   }, [profile, tenant]);

//   const fetchGuards = async () => {
//     if (!profile?.tenant_id) return;

//     setLoading(true);
//     try {
//       // Get guards with password status
//       const { data: profilesData, error: profilesError } = await supabase
//         .from('profiles')
//         .select('id, user_id, full_name, phone, created_at, password_change_required, temp_password_expires')
//         .eq('tenant_id', profile.tenant_id)
//         .eq('role', 'guard')
//         .order('created_at', { ascending: false });

//       if (profilesError) throw profilesError;

//       // Fetch emails for guards using the new function
//       const guardsWithEmailPromises = (profilesData || []).map(async (guard) => {
//         try {
//           const { data: emailData, error: emailError } = await supabase.rpc('get_user_email_for_tenant_admin', { user_uuid: guard.user_id });

//           if (emailError) {
//             console.error('Error fetching email for guard:', guard.user_id, emailError);
//             return { ...guard, email: 'Email unavailable', role: 'guard' as const };
//           }

//           return { ...guard, email: emailData || 'Email unavailable', role: 'guard' as const };
//         } catch (error) {
//           console.error('Exception fetching email for guard:', guard.user_id, error);
//           return { ...guard, email: 'Email unavailable', role: 'guard' as const };
//         }
//       });

//       const guardsWithEmails = await Promise.all(guardsWithEmailPromises);
//       setGuards(guardsWithEmails);
//     } catch (error) {
//       console.error('Error fetching guards:', error);
//       toast({
//         title: 'Error',
//         description: 'Failed to fetch guards',
//         variant: 'destructive',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddGuard = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!tenant) return;

//     setIsAddingGuard(true);
//     try {
//       // Create user via edge function
//       const { data, error } = await supabase.functions.invoke('create-tenant-user', {
//         body: {
//           email: newGuard.email,
//           fullName: newGuard.fullName,
//           role: 'guard',
//           tenantId: tenant.id,
//           phone: newGuard.phone,
//         },
//       });

//       if (error) {
//         // Extract error message from the response
//         let errorMessage = 'Failed to add security guard';
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
//         description: `Security guard ${newGuard.fullName} has been added successfully. Temporary credentials are displayed below.`,
//       });

//       setNewGuard({
//         fullName: '',
//         email: '',
//         phone: '',
//       });

//       await fetchGuards();
//     } catch (error: any) {
//       console.error('Error adding guard:', error);
//       toast({
//         title: 'Error',
//         description: error.message || 'Failed to add security guard',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsAddingGuard(false);
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

//   const handleEditGuard = (guard: Guard) => {
//     setSelectedGuard(guard);
//     setIsEditModalOpen(true);
//   };

//   const handleCloseEditModal = () => {
//     setIsEditModalOpen(false);
//     setSelectedGuard(null);
//   };

//   const getPasswordStatusBadge = (guard: Guard) => {
//     if (!guard.password_change_required) {
//       return <Badge variant="default" className="flex items-center gap-1"><CheckCircle className="h-3 w-3" />Active</Badge>;
//     }

//     const hasExpired = guard.temp_password_expires && new Date(guard.temp_password_expires) < new Date();
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
//             <h1 className="text-3xl font-bold">Security Guard Management</h1>
//             <p className="text-muted-foreground">Manage security guards for your estate</p>
//           </div>

//           <Dialog>
//             <DialogTrigger asChild>
//               <Button>
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add Guard
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-md">
//               <DialogHeader>
//                 <DialogTitle>Add New Security Guard</DialogTitle>
//               </DialogHeader>
//               <form onSubmit={handleAddGuard} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="fullName">Full Name</Label>
//                   <Input
//                     id="fullName"
//                     value={newGuard.fullName}
//                     onChange={(e) => setNewGuard({ ...newGuard, fullName: e.target.value })}
//                     placeholder="Enter full name"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={newGuard.email}
//                     onChange={(e) => setNewGuard({ ...newGuard, email: e.target.value })}
//                     placeholder="Enter email address"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="phone">Phone Number</Label>
//                   <Input
//                     id="phone"
//                     value={newGuard.phone}
//                     onChange={(e) => setNewGuard({ ...newGuard, phone: e.target.value })}
//                     placeholder="Enter phone number"
//                   />
//                 </div>

//                 <Button type="submit" className="w-full" disabled={isAddingGuard}>
//                   {isAddingGuard ? 'Adding...' : 'Add Security Guard'}
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
//                       Share these credentials securely with the security guard. They must change their password on first login.
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
//               <Shield className="h-5 w-5" />
//               Security Guards ({guards.length})
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {guards.length === 0 ? (
//               <div className="text-center py-8">
//                 <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//                 <h3 className="text-lg font-semibold mb-2">No security guards found</h3>
//                 <p className="text-muted-foreground mb-4">
//                   Add security guards to help manage access to your estate.
//                 </p>
//               </div>
//             ) : (
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Email</TableHead>
//                     <TableHead>Phone</TableHead>
//                     <TableHead>Added</TableHead>
//                     <TableHead>Password Status</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {guards.map((guard) => (
//                     <TableRow key={guard.id}>
//                       <TableCell className="font-medium">{guard.full_name}</TableCell>
//                       <TableCell className="text-muted-foreground">{guard.email}</TableCell>
//                       <TableCell>{guard.phone || 'N/A'}</TableCell>
//                       <TableCell>{new Date(guard.created_at).toLocaleDateString()}</TableCell>
//                       <TableCell>{getPasswordStatusBadge(guard)}</TableCell>
//                       <TableCell>
//                         <div className="flex items-center gap-2">
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => handleEditGuard(guard)}
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
//         user={selectedGuard}
//         isOpen={isEditModalOpen}
//         onClose={handleCloseEditModal}
//         onUserUpdated={fetchGuards}
//         tempCredentials={editModalTempCredentials}
//         onSetTempCredentials={setEditModalTempCredentials}
//       />
//     </TenantLayout>
//   );
// };

// export default GuardManagement;
