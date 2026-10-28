import { z } from "zod";
import { partnershipTypes } from "./site";

export type FormState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
};

const phoneRe = /^[+\d][\d\s()-]{5,19}$/;

export const inquirySchema = z
  .object({
    kind: z.enum(["partnership", "interest", "contact"]),
    orgName: z.string().trim().max(150).default(""),
    contactName: z.string().trim().min(2, "Нэрээ оруулна уу").max(100),
    phone: z.string().trim().max(30).default(""),
    email: z.string().trim().max(150).default(""),
    topic: z.string().trim().max(150).default(""),
    message: z.string().trim().max(3000).default(""),
  })
  .superRefine((v, ctx) => {
    if (!v.phone && !v.email) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "Утас эсвэл имэйлийн аль нэгийг оруулна уу" });
    }
    if (v.phone && !phoneRe.test(v.phone)) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "Утасны дугаар буруу байна" });
    }
    if (v.email && !z.email().safeParse(v.email).success) {
      ctx.addIssue({ code: "custom", path: ["email"], message: "Имэйл хаяг буруу байна" });
    }
    if (v.kind === "partnership") {
      if (!v.orgName) ctx.addIssue({ code: "custom", path: ["orgName"], message: "Байгууллагын нэрээ оруулна уу" });
      if (!(partnershipTypes as readonly string[]).includes(v.topic)) {
        ctx.addIssue({ code: "custom", path: ["topic"], message: "Хамтын ажиллагааны төрлөө сонгоно уу" });
      }
      if (v.message.length < 10) {
        ctx.addIssue({ code: "custom", path: ["message"], message: "Мессежээ бага зэрэг дэлгэрэнгүй бичнэ үү" });
      }
    }
    if (v.kind === "contact" && v.message.length < 5) {
      ctx.addIssue({ code: "custom", path: ["message"], message: "Мессежээ бичнэ үү" });
    }
  });
