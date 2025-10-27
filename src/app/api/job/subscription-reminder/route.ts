import { sendSubscriptionReminders } from "@/src/lib/job/subscriptionReminder";
import { NextResponse } from "next/server";

export async function GET() {
  await sendSubscriptionReminders();
  return NextResponse.json({ message: "Subscription reminders sent" });
}
