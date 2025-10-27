"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/component/ui/card";
import { Button } from "@/src/component/ui/button";
import { Input } from "@/src/component/ui/input";
import { Label } from "@/src/component/ui/label";

import { Shield, Home, Loader2 } from "lucide-react";
import PasswordChangeModal from "@/src/component/model/PasswordChangeModal";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import {
  Estate,
  useLazyGetEstateBySlguQuery,
} from "@/src/lib/features/api/estateApi";
import { useLoginMutation } from "@/src/lib/features/api/authApi";
import { loginUser, updatePassword } from "@/src/lib/slice/userSlice";
import { useDispatch } from "react-redux";
import Logo from "@/src/component/Logo";
import Link from "next/link";

interface PortalLoginProps {
  type: "resident" | "guard";
}

const LoginPortal = ({ type }: PortalLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const { estateName } = useParams<{ estateName: string }>();
  const slug = estateName;
  const [estate, setEstate] = useState<Estate>({} as Estate);
  const [loading, setLoading] = useState(true);
  const [isTemporaryPassword, setIsTemporaryPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();
  const [getEstate] = useLazyGetEstateBySlguQuery();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isTemporaryPassword) {
      setShowPasswordChange(true);
      setUserEmail(email);
    }
  }, [isTemporaryPassword, email]);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getEstate(slug)
      .unwrap()
      .then((res) => {
        setEstate(res);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    login({ email, password, estateId: estate.id })
      .unwrap()
      .then((res) => {
        if (res.user.temporaryPassword) {
          setIsTemporaryPassword(true);
          setEmail(res.userEmail);
          dispatch(updatePassword(res.user));
        } else {
          toast.success("Welcome back!");
          dispatch(loginUser(res.user));
          router.push(`/dashboard`);
        }
      })
      .catch((err) => {
        toast.error(
          err?.data?.error || "Login failed. Please check your credentials."
        );
        console.error("Login error:", err);
      })
      .finally(() => setIsLoading(false));
  };

  const handlePasswordChangeComplete = useCallback(
    (passwordChanged: boolean) => {
      setEmail("");
      setPassword("");
      setShowPasswordChange(false);
      setIsTemporaryPassword(false);

      if (passwordChanged) {
        toast.success("Welcome back! Your password has been updated.");
        // Optionally redirect after successful password change
        //estate/penelope-mendez/guard
        // router.push(`/estate/${slug}/${type}`);
      }
    },
    [router]
  );

  const Icon = type === "guard" ? Shield : Home;
  const title = type === "guard" ? "Security Portal" : "Resident Portal";
  const subtitle =
    type === "guard"
      ? "Sign in to access the security dashboard"
      : "Sign in to manage your guest access codes";

  // Show loading state while tenant is being fetched

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-offWhite via-background to-lightGray">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy"></div>
      </div>
    );
  }

  // Show error if tenant not found
  if (!estate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-offWhite via-background to-lightGray p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-destructive" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Estate Not Found</h3>
              <p className="text-sm text-muted-foreground">
                The estate you're trying to access could not be found or is not
                active.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className="mt-4"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Logo />
          <CardTitle className="text-2xl font-bold text-charcoal font-inter">
            {title}
          </CardTitle>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-foreground text-charcoal font-inter">
              {estate.estateName}
            </p>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="flex justify-end items-end">
              <Link href={"/forgetPassword"} className="text-navy font-inter">
                Forgot Password?
              </Link>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Need access? Contact your building administrator.
            </p>
          </div>
        </CardContent>
      </Card>

      <PasswordChangeModal
        key={showPasswordChange ? "open" : "closed"}
        isOpen={showPasswordChange}
        onClose={handlePasswordChangeComplete}
        userEmail={userEmail}
      />
    </div>
  );
};

export default LoginPortal;
