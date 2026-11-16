import { z } from "zod";

export const quoteSchema = z.object({
  // The hero quote starter only asks for pest, ZIP, and phone.
  name: z.string().trim().max(100).optional().default(""),
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "").length === 10, {
      message: "Please enter a 10 digit phone number.",
    }),
  pest: z.string().trim().min(1, "Please pick a pest, or choose Not sure.").max(60),
  zip: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Please enter a 5 digit ZIP code."),
  message: z.string().trim().max(2000).optional().default(""),
  plan: z.enum(["one-time", "quarterly", "commercial"]).optional(),
  source: z.enum(["hero", "form"]).optional().default("form"),
  /** Page the lead came from, e.g. /pests/termites. */
  page: z.string().trim().max(200).optional().default(""),
  // Honeypot. Real people never see or fill this field.
  company: z.string().max(0).optional().default(""),
}).superRefine((data, ctx) => {
  // The full form asks for a name. The hero starter does not.
  if (data.source === "form" && data.name.length < 2) {
    ctx.addIssue({ code: "custom", path: ["name"], message: "Please enter your name." });
  }
});

export type QuoteInput = z.infer<typeof quoteSchema>;
