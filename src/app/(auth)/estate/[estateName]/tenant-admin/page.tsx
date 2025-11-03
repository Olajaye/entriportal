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
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import {
  Estate,
  useLazyGetEstateBySlguQuery,
} from "@/src/lib/features/api/estateApi";
import { useParams, useRouter } from "next/navigation";
import { useLoginMutation } from "@/src/lib/features/api/authApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginUser, updatePassword } from "@/src/lib/slice/userSlice";
import Logo from "@/src/component/Logo";
import PasswordChangeModal from "@/src/component/model/PasswordChangeModal";
import Link from "next/link";

interface Tenant {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
  branding: any;
}

const TenantLogin = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const { estateName } = useParams<{ estateName: string }>();
  const slug = estateName;
  const [estate, setEstate] = useState<Estate>({} as Estate);
  const [userEmail, setUserEmail] = useState("");
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [isTemporaryPassword, setIsTemporaryPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [getEstate] = useLazyGetEstateBySlguQuery();
  const [login] = useLoginMutation();
  const router = useRouter();
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

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsSigningIn(true);

    login({ email, password, estateId: estate.id })
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.user.temporaryPassword) {
          setIsTemporaryPassword(true);
          setEmail(res.user.email);
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
      .finally(() => setIsSigningIn(false));
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-offWhite via-background to-lightGray">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy"></div>
      </div>
    );
  }

  if (!estate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4 font-inter">
              Estate Not Found
            </h2>
            <p className="text-muted-foreground mb-4">
              The estate you are looking for does not exist or is inactive.
            </p>
            <Button onClick={() => router.push("/")} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const renderPasswordVisibilityToggle = () => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="absolute right-0 top-0 h-full px-3 py-2 "
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
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-offWhite via-background to-lightGray">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center pb-2">
            <Logo />
            <CardTitle className="text-2xl font-bold text-charcoal font-inter">
              {estate.estateName}
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Estate Management System
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="flex items-center text-charcoal gap-2"
                >
                  <Mail className="h-4 w-4 text-charcoal" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="flex items-center text-charcoal gap-2"
                >
                  <Lock className="h-4 w-4 text-charcoal" />
                  Password
                </Label>
                <div className="relative w-full">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="pr-10"
                  />

                  {renderPasswordVisibilityToggle()}
                </div>
              </div>
              <div className="flex justify-end items-end">
                <Link href={"/forgetPassword"} className="text-navy font-inter">
                  Forgot Password?
                </Link>
              </div>
              <Button type="submit" className="w-full" disabled={isSigningIn}>
                {isSigningIn ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center pt-4 border-t">
              <Button
                variant="ghost"
                onClick={() => router.push("/entri")}
                className="text-sm"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Main Portal
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <PasswordChangeModal
        key={showPasswordChange ? "open" : "closed"}
        isOpen={showPasswordChange}
        onClose={handlePasswordChangeComplete}
        userEmail={userEmail}
      />
    </>
  );
};

export default TenantLogin;
