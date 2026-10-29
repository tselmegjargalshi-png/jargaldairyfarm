import { z } from "zod";
import { dayParts, meetingTypes, partnershipTypes, trainingTopics } from "./site";

export type FormState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
  /** Echoed back on validation errors so React's form reset does not wipe what the visitor typed */
  values?: Record<string, string>;
};

const phoneRe = /^[+\d][\d\s()-]{5,19}$/;

export const inquirySchema = z
  .object({
    kind: z.enum(["partnership", "interest", "contact", "meeting", "training"]),
    orgName: z.string().trim().max(150).default(""),
    contactName: z.string().trim().min(2, "Нэрээ оруулна уу").max(100),
    phone: z.string().trim().max(30).default(""),
    email: z.string().trim().max(150).default(""),
    topic: z.string().trim().max(150).default(""),
    preferredDate: z.string().trim().max(10).default(""),
    preferredPart: z.string().trim().max(20).default(""),
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
    if (v.kind === "meeting") {
      if (!(meetingTypes as readonly string[]).includes(v.topic)) {
        ctx.addIssue({ code: "custom", path: ["topic"], message: "Уулзалтын төрлөө сонгоно уу" });
      }
      const d = /^\d{4}-\d{2}-\d{2}$/.test(v.preferredDate) ? new Date(`${v.preferredDate}T00:00:00Z`) : null;
      const todayUb = new Date(Date.now() + 8 * 3600_000).toISOString().slice(0, 10); // Ulaanbaatar is UTC+8
      if (!d || Number.isNaN(d.getTime()) || v.preferredDate < todayUb) {
        ctx.addIssue({ code: "custom", path: ["preferredDate"], message: "Өнөөдрөөс хойших огноо сонгоно уу" });
      }
      if (!(dayParts as readonly string[]).includes(v.preferredPart)) {
        ctx.addIssue({ code: "custom", path: ["preferredPart"], message: "Өдрийн аль үеэр тохиромжтойг сонгоно уу" });
      }
    }
    if (v.kind === "training" && !(trainingTopics as readonly string[]).includes(v.topic)) {
      ctx.addIssue({ code: "custom", path: ["topic"], message: "Сургалтын чиглэлээ сонгоно уу" });
    }
    if (v.kind === "contact" && v.message.length < 5) {
      ctx.addIssue({ code: "custom", path: ["message"], message: "Мессежээ бичнэ үү" });
    }
  });
