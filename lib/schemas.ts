import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(2000)
});

export type ContactPayload = z.infer<typeof ContactSchema>;