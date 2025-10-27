import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/component/ui/dialog";
import { Button } from "@/src/component/ui/button";
import { Badge } from "@/src/component/ui/badge";
// import { supabase } from "@/integrations/supabase/client";
import {
  Clock,
  RefreshCw,
  Copy,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Guard, IUser, Resident } from "@/src/type";

interface UserEditModalProps {
  user: Resident | Guard | null;
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
  tempCredentials: { email: string; password: string } | null;
  onSetTempCredentials: (
    credentials: { email: string; password: string } | null
  ) => void;
}

const UserEditModal: React.FC<UserEditModalProps> = ({
  user,
  isOpen,
  onClose,
  onUserUpdated,
  tempCredentials,
  onSetTempCredentials,
}) => {
  const [isResetting, setIsResetting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Clear credentials when modal closes or different user is selected
  useEffect(() => {
    console.log("UserEditModal useEffect triggered:", {
      isOpen,
      userId: user?.id,
      currentTempCredentials: tempCredentials,
    });

    if (!isOpen) {
      console.log("Modal closed, clearing credentials");
      onSetTempCredentials(null);
      setShowPassword(false);
    }
  }, [isOpen, onSetTempCredentials]);

  // Add another useEffect to monitor tempCredentials changes
  useEffect(() => {
    console.log("tempCredentials changed:", tempCredentials);
  }, [tempCredentials]);

  if (!user) return null;

  // const needsPasswordChange = user.password_change_required;
  // const hasExpiredPassword =
  //   user.temp_password_expires &&
  //   new Date(user.temp_password_expires) < new Date();
  // const passwordExpiresIn = user.temp_password_expires
  //   ? Math.max(
  //       0,
  //       Math.ceil(
  //         (new Date(user.temp_password_expires).getTime() - Date.now()) /
  //           (1000 * 60 * 60)
  //       )
  //     )
  //   : 0;

  // const getPasswordStatus = () => {
  //   if (!needsPasswordChange) {
  //     return {
  //       status: "Changed",
  //       variant: "default" as const,
  //       icon: CheckCircle,
  //     };
  //   }
  //   if (hasExpiredPassword) {
  //     return {
  //       status: "Expired",
  //       variant: "destructive" as const,
  //       icon: AlertTriangle,
  //     };
  //   }
  //   return { status: "Temporary", variant: "secondary" as const, icon: Clock };
  // };

  const passwordStatus = {
    status: "Changed",
    variant: "default" as const,
    icon: CheckCircle,
  }; //getPasswordStatus();

  const handlePasswordReset = async () => {
    setIsResetting(true);
    console.log("Starting password reset for user:", user.id);

    try {
      // const { data, error } = await supabase.functions.invoke(
      //   "reset-user-password",
      //   {
      //     body: {
      //       userId: user.id,
      //       userEmail: user.email || "Not available",
      //       role: user.role,
      //     },
      //   }
      // );

      const data = {
        success: true,
        tempPassword: "TempPass123!",
        email: user.email || "Not available",
      };
      const error = null;
      console.log("Password reset response:", { data, error });

      if (error) throw error;

      if (data?.success && data?.tempPassword) {
        const credentials = {
          email: data.email || user.email || "Not available",
          password: data.tempPassword,
        };

        console.log("Setting temp credentials:", credentials);
        onSetTempCredentials(credentials);

        // toast({
        //   title: 'Password Reset',
        //   description: 'New temporary password generated successfully',
        // });

        // Call onUserUpdated but credentials will persist due to our useEffect logic
        onUserUpdated();
      } else {
        throw new Error("Invalid response from password reset");
      }
    } catch (error: any) {
      console.error("Error resetting password:", error);
      // toast({
      //   title: 'Error',
      //   description: error.message || 'Failed to reset password',
      //   variant: 'destructive',
      // });
    } finally {
      setIsResetting(false);
    }
  };

  const copyCredentials = () => {
    if (tempCredentials) {
      const text = `Email: ${tempCredentials.email}\nTemporary Password: ${tempCredentials.password}`;
      navigator.clipboard.writeText(text);
      // toast({
      //   title: 'Copied',
      //   description: 'Login credentials copied to clipboard',
      // });
    }
  };

  const StatusIcon = passwordStatus.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Manage {user.userType === "RESIDENT" ? "Resident" : "Guard"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Info */}
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Name</label>
              <p className="text-sm text-muted-foreground">{user.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="text-sm text-muted-foreground">
                {user.email || "Not available"}
              </p>
            </div>
            {user.phone && (
              <div>
                <label className="text-sm font-medium">Phone</label>
                <p className="text-sm text-muted-foreground">{user.phone}</p>
              </div>
            )}
            {user.unitNumber && (
              <div>
                <label className="text-sm font-medium">Unit Number</label>
                <p className="text-sm text-muted-foreground">
                  {user.unitNumber}
                </p>
              </div>
            )}
          </div>

          {/* Password Status */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Password Status</label>
            {/* <div className="flex items-center gap-2">
              <Badge
                variant={passwordStatus.variant}
                className="flex items-center gap-1"
              >
                <StatusIcon className="h-3 w-3" />
                {passwordStatus.status}
              </Badge>
              {needsPasswordChange && passwordExpiresIn > 0 && (
                <span className="text-xs text-muted-foreground">
                  Expires in {passwordExpiresIn}h
                </span>
              )}
            </div> */}

            {/* {needsPasswordChange && (
              <p className="text-xs text-muted-foreground">
                {hasExpiredPassword
                  ? "The temporary password has expired. Generate a new one."
                  : "User must change their password on next login."}
              </p>
            )} */}
          </div>

          {/* Reset Password */}
          <div className="space-y-3">
            <Button
              onClick={handlePasswordReset}
              disabled={isResetting}
              variant="outline"
              className="w-full"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isResetting ? "animate-spin" : ""}`}
              />
              {isResetting ? "Generating..." : "Reset Password"}
            </Button>

            {tempCredentials && (
              <div className="p-4 bg-muted/50 rounded-lg border">
                <h4 className="font-semibold text-sm mb-2">
                  New Temporary Credentials
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Email:</span>{" "}
                    {tempCredentials.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Password:</span>
                    <span className="font-mono bg-background px-2 py-1 rounded">
                      {showPassword ? tempCredentials.password : "••••••••••"}
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
                  Share these credentials securely. They must change their
                  password on first login.
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditModal;
