// app/api/cron/route.ts
import { sendEmail } from "@/src/lib/email/emailUtils";
import { NextResponse } from "next/server";

export async function GET() {
  // Your task logic here
  try {
    await performDailyTask();
    return NextResponse.json({ success: true, message: "Cron job executed" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

async function performDailyTask() {
  const emailData = {
    FULL_NAME: "jaye Ola",
    EXPIRY_DATE: `${new Date().toISOString()}`,
    RENEWAL_URL: "#",
    ESTATE_NAME: "Olajaye",
    PLAN_NAME: "Basic",
    AMOUNT: "3000",
    DAYS_REMAINING: "5",
  };

  await sendEmail(
    "jayeolajeremiah@gmail.com",
    "Estate Subscription Reminder",
    "subscriptionReminderTemplate",
    emailData
  );

  console.log("Executing daily task at:", new Date().toISOString());
}
