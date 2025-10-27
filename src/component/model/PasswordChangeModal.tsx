"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/component/ui/dialog";
import { Button } from "@/src/component/ui/button";
import { Input } from "@/src/component/ui/input";
import { Label } from "@/src/component/ui/label";
import { Eye, EyeOff, Lock, CheckCircle2, XCircle, X } from "lucide-react";
import { useUpdateUserMutation } from "@/src/lib/features/api/userApi";
import { RootState } from "@/src/type";

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: (passwordChanged: boolean) => void;
  userEmail: string;
}

// Constants
const PASSWORD_REQUIREMENTS_CONFIG = [
  {
    text: "At least 8 characters",
    validator: (pwd: string) => pwd.length >= 8,
  },
  {
    text: "Contains uppercase letter",
    validator: (pwd: string) => /[A-Z]/.test(pwd),
  },
  {
    text: "Contains lowercase letter",
    validator: (pwd: string) => /[a-z]/.test(pwd),
  },
  { text: "Contains number", validator: (pwd: string) => /\d/.test(pwd) },
  {
    text: "Contains special character",
    validator: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
  },
] as const;

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({
  isOpen,
  onClose,
  userEmail,
}) => {
  // State
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  // Hooks
  const { updatePassData } = useSelector((s: RootState) => s.user);
  const [updateUser] = useUpdateUserMutation();

  // Memoized values
  const passwordRequirements = useMemo(
    () =>
      PASSWORD_REQUIREMENTS_CONFIG.map(({ text, validator }) => ({
        text,
        met: validator(newPassword),
      })),
    [newPassword]
  );

  const passwordsMatch = useMemo(
    () => newPassword === confirmPassword,
    [newPassword, confirmPassword]
  );

  const isPasswordValid = useMemo(
    () => passwordRequirements.every((req) => req.met) && passwordsMatch,
    [passwordRequirements, passwordsMatch]
  );

  // Reset form
  const resetForm = useCallback(() => {
    setNewPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setIsChanging(false);
  }, []);

  // Close handlers
  const handleClose = useCallback(
    (passwordChanged: boolean = false) => {
      resetForm();
      onClose(passwordChanged);
    },
    [onClose, resetForm]
  );

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleForceClose = useCallback(() => {
    resetForm();
    onClose(false);
  }, [onClose, resetForm]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handlePasswordChange = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!isPasswordValid) {
        toast.error(
          "Please ensure your password meets all requirements and matches the confirmation."
        );
        return;
      }

      setIsChanging(true);

      try {
        const payload = {
          password: newPassword,
          temporaryPassword: false,
          id: updatePassData.id,
        };

        await updateUser(payload).unwrap();

        // SUCCESS: Only call onClose once with success status
        onClose(true);
        // handleClose(true);
        // handleForceClose();
        // toast.success("Password changed successfully!");
      } catch (error: any) {
        toast.error(error?.message || "Failed to change password");
        setIsChanging(false);
      }
    },
    [isPasswordValid, newPassword, updateUser, handleClose]
  );

  const handleNewPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewPassword(e.target.value);
    },
    []
  );

  const handleConfirmPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.target.value);
    },
    []
  );

  // Render helpers
  const renderRequirementIcon = (met: boolean) =>
    met ? (
      <CheckCircle2 className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-muted-foreground" />
    );

  const renderPasswordVisibilityToggle = () => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
      onClick={togglePasswordVisibility}
    >
      {showPassword ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleForceClose}>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={handleForceClose}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Change Your Password
          </DialogTitle>

          {/* <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={handleForceClose}
            disabled={isChanging}
          >
            <X className="h-4 w-4" />
          </Button> */}
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Welcome, <strong>{userEmail}</strong>! You're using a temporary
              password. Please create a new secure password to continue.
            </p>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  placeholder="Enter new password"
                  required
                  disabled={isChanging}
                />
                {renderPasswordVisibilityToggle()}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm new password"
                required
                disabled={isChanging}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Password Requirements
              </Label>
              <div className="space-y-1">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    {renderRequirementIcon(req.met)}
                    <span
                      className={
                        req.met ? "text-green-700" : "text-muted-foreground"
                      }
                    >
                      {req.text}
                    </span>
                  </div>
                ))}
                {newPassword && confirmPassword && (
                  <div className="flex items-center gap-2 text-sm">
                    {renderRequirementIcon(passwordsMatch)}
                    <span
                      className={
                        passwordsMatch
                          ? "text-green-700"
                          : "text-muted-foreground"
                      }
                    >
                      Passwords match
                    </span>
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!isPasswordValid || isChanging}
            >
              {isChanging ? "Changing Password..." : "Change Password"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordChangeModal;
