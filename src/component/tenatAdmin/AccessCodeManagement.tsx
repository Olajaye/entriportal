// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { useToast } from '@/hooks/use-toast';
// import { supabase } from '@/integrations/supabase/client';
// import { useAuth } from '@/hooks/useAuth';
// import { useTenant } from '@/contexts/TenantContext';
// import TenantLayout from './TenantLayout';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Key, Eye, Clock, CheckCircle } from 'lucide-react';

// interface AccessCode {
//   id: string;
//   code: string;
//   guest_name: string;
//   resident_id: string;
//   status: string;
//   expires_at: string;
//   created_at: string;
//   used_at: string;
//   resident_name?: string;
// }

// const AccessCodeManagement = () => {
//   const [accessCodes, setAccessCodes] = useState<AccessCode[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { profile } = useAuth();
//   const { tenant } = useTenant();
//   const { toast } = useToast();

//   useEffect(() => {
//     if (profile?.tenant_id && tenant) {
//       fetchAccessCodes();
//     }
//   }, [profile, tenant]);

//   const fetchAccessCodes = async () => {
//     if (!profile?.tenant_id) return;

//     setLoading(true);
//     try {
//       const { data, error } = await supabase
//         .from('access_codes')
//         .select('*')
//         .eq('tenant_id', profile.tenant_id)
//         .order('created_at', { ascending: false })
//         .limit(50);

//       // Fetch resident names separately
//       if (data) {
//         const residentIds = [...new Set(data.map(code => code.resident_id))];
//         const { data: residents } = await supabase
//           .from('profiles')
//           .select('user_id, full_name')
//           .in('user_id', residentIds);

//         const residentMap = residents?.reduce((acc, resident) => {
//           acc[resident.user_id] = resident.full_name;
//           return acc;
//         }, {} as Record<string, string>) || {};

//         const enrichedData = data.map(code => ({
//           ...code,
//           resident_name: residentMap[code.resident_id] || 'Unknown'
//         }));

//         setAccessCodes(enrichedData as any);
//       }

//       if (error) throw error;
//     } catch (error) {
//       console.error('Error fetching access codes:', error);
//       toast({
//         title: 'Error',
//         description: 'Failed to fetch access codes',
//         variant: 'destructive',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'active':
//         return 'default';
//       case 'used':
//         return 'secondary';
//       case 'expired':
//         return 'destructive';
//       default:
//         return 'outline';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'active':
//         return <Key className="h-4 w-4" />;
//       case 'used':
//         return <CheckCircle className="h-4 w-4" />;
//       case 'expired':
//         return <Clock className="h-4 w-4" />;
//       default:
//         return <Eye className="h-4 w-4" />;
//     }
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

//   const activeCount = accessCodes.filter(code => code.status === 'active').length;
//   const usedCount = accessCodes.filter(code => code.status === 'used').length;
//   const expiredCount = accessCodes.filter(code => code.status === 'expired').length;

//   return (
//     <TenantLayout>
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold">Access Code Management</h1>
//           <p className="text-muted-foreground">Monitor and manage guest access codes</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Active Codes</CardTitle>
//               <Key className="h-4 w-4 text-green-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{activeCount}</div>
//               <p className="text-xs text-muted-foreground">Currently valid</p>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Used Codes</CardTitle>
//               <CheckCircle className="h-4 w-4 text-blue-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{usedCount}</div>
//               <p className="text-xs text-muted-foreground">Successfully used</p>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Expired Codes</CardTitle>
//               <Clock className="h-4 w-4 text-red-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{expiredCount}</div>
//               <p className="text-xs text-muted-foreground">No longer valid</p>
//             </CardContent>
//           </Card>
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Key className="h-5 w-5" />
//               Recent Access Codes ({accessCodes.length})
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {accessCodes.length === 0 ? (
//               <div className="text-center py-8">
//                 <Key className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//                 <h3 className="text-lg font-semibold mb-2">No access codes found</h3>
//                 <p className="text-muted-foreground">
//                   Access codes generated by residents will appear here.
//                 </p>
//               </div>
//             ) : (
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Code</TableHead>
//                     <TableHead>Guest Name</TableHead>
//                     <TableHead>Resident</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Expires</TableHead>
//                     <TableHead>Used At</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {accessCodes.map((code) => (
//                     <TableRow key={code.id}>
//                       <TableCell className="font-mono font-medium">{code.code}</TableCell>
//                       <TableCell>{code.guest_name}</TableCell>
//                       <TableCell>{code.resident_name || 'Unknown'}</TableCell>
//                       <TableCell>
//                         <Badge
//                           variant={getStatusColor(code.status)}
//                           className="flex items-center gap-1 w-fit"
//                         >
//                           {getStatusIcon(code.status)}
//                           {code.status}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>{new Date(code.expires_at).toLocaleString()}</TableCell>
//                       <TableCell>
//                         {code.used_at ? new Date(code.used_at).toLocaleString() : 'Not used'}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </TenantLayout>
//   );
// };

// export default AccessCodeManagement;
