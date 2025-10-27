import { prisma } from "@/src/lib/prisma";
import { sendEmail } from "../email/emailUtils";

export async function sendSubscriptionReminders() {
  const emailData = {
    name: "job test",
    resetUrl: "Test",
    expiryTime: "1 hour",
    supportEmail: "support@yourapp.com",
  };
  await sendEmail(
    "jayeolajeremiah@gmail.com",
    "Reset Your Password",
    "passwordResetTemplate",
    emailData
  );
  // const now = new Date();
  // const reminderDate = new Date();
  // reminderDate.setDate(now.getDate() + 5); // 5 days ahead

  // // Find estates whose subscription expires in exactly 5 days
  // const estates = await prisma.estate.findMany({
  //   where: {
  //     subscriptionEndDate: {
  //       gte: new Date(reminderDate.setHours(0, 0, 0, 0)),
  //       lt: new Date(reminderDate.setHours(23, 59, 59, 999)),
  //     },
  //   },
  // });

  // for (const estate of estates) {
  //   await sendEmail(
  //     "jayeolajeremiah@gmail.com", // assuming you store the admin’s email
  //     "Your subscription is about to expire",
  //     "subscriptionReminderTemplate",
  //     {
  //       estateName: estate.estateName,
  //       plan: estate.estatePlan,
  //       expirationDate: estate.subscriptionEndDate?.toDateString(),
  //     }
  //   );

  //   console.log(`Reminder sent to ${estate.estateName}`);
  // }
}
