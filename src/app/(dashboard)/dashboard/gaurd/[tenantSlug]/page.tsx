"use client";
import React, { useState } from "react";
import { Button } from "@/src/component/ui/button";
import { Input } from "@/src/component/ui/input";
import { Label } from "@/src/component/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/component/ui/card";
import { Alert, AlertDescription } from "@/src/component/ui/alert";
import { CheckCircle, XCircle, Shield, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/type";
import { useVerifyAccessCodeMutation } from "@/src/lib/features/api/accessCode";
import toast from "react-hot-toast";

interface ValidationResult {
  isValid: boolean;
  code?: string;
  guestName?: string;
  residentName?: string;
  unitNumber?: string;
  error?: string;
}

const page = () => {
  const { user } = useSelector((s: RootState) => s.user);
  const [codeInput, setCodeInput] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] =
    useState<ValidationResult | null>(null);

  const [verifyAccess] = useVerifyAccessCodeMutation();

  const validateCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeInput.trim()) return;

    setIsValidating(true);
    setValidationResult(null);

    const payload = {
      code: codeInput,
    };

    verifyAccess(payload)
      .unwrap()
      .then((codeData) => {
        console.log(codeData);
        setIsValidating(false);
        if (!codeData.valid) {
          toast.error(`${codeData.reason}`);
        }

        setValidationResult({
          isValid: true,
          code: codeData.data.code,
          guestName: codeData.data.guestName,
          residentName: codeData.data.user.name || "Unknown Resident",
          unitNumber: codeData.data.user.unitNumber,
        });

        toast.success(`Access granted for ${codeData.data.user.name}`);
      })
      .catch((error) => {
        console.log(error);
        setValidationResult({
          isValid: false,
          error: "Invalid code. Please check and try again.",
        });
        toast.error("Invalid code. Please check and try again.");
      });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-offWhite via-background to-lightGray">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome, {user?.name}
        </h1>
        <p className="text-muted-foreground">Security Dashboard</p>
      </div>

      {/* Code Validation Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Validate Access Code
          </CardTitle>
          <CardDescription>
            Enter the guest's access code to validate entry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={validateCode} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="access-code">Access Code</Label>
              <Input
                id="access-code"
                type="text"
                placeholder="Enter 6-character code"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                maxLength={6}
                className="font-mono text-center text-lg"
                required
              />
            </div>
            <Button type="submit" disabled={isValidating} className="w-full">
              {isValidating ? "Validating..." : "Validate Code"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Validation Result */}
      {validationResult && (
        <Card>
          <CardContent className="pt-6">
            {validationResult.isValid ? (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <div className="space-y-2">
                    <p className="font-semibold">✅ Valid Access Code</p>
                    <div className="text-sm">
                      <p>
                        <strong>Code:</strong> {validationResult.code}
                      </p>
                      <p>
                        <strong>Guest:</strong> {validationResult.guestName}
                      </p>
                      <p>
                        <strong>Resident:</strong>{" "}
                        {validationResult.residentName}
                        {validationResult.unitNumber
                          ? ` (Unit ${validationResult.unitNumber})`
                          : ""}
                      </p>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="border-red-200 bg-red-50">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <p className="font-semibold">❌ Invalid Code</p>
                  <p className="text-sm mt-1">{validationResult.error}</p>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Instructions</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• Ask guests for their 6-character access code</p>
          <p>• Enter the code exactly as provided</p>
          <p>• Valid codes will show guest and resident details</p>
          <p>• Each code can only be used once</p>
          <p>• Codes expire at 11:59 PM daily</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
