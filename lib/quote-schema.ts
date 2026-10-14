import { z } from "zod";

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
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
  // Honeypot. Real people never see or fill this field.
  company: z.string().max(0).optional().default(""),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
