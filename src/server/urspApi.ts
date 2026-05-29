import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

type JsonBody = Record<string, unknown>;

type ChatRole = "system" | "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type RouteResult<T extends JsonBody = JsonBody> = {
  status: number;
  body: T;
};

function ok<T extends JsonBody>(body: T): RouteResult<T> {
  return { status: 200, body };
}

function fail(message: string, status = 500): RouteResult<{ error: string }> {
  return { status, body: { error: message } };
}

function asObject(value: unknown): JsonBody {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as JsonBody;
  }

  return {};
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

function getAppUrl(): string | null {
  const explicitUrl = process.env.APP_URL?.trim();
  if (explicitUrl) {
    return explicitUrl;
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return null;
}

function getOpenRouterApiKey(): string {
  const rawApiKey = process.env.OPENROUTER_API_KEY;
  if (!rawApiKey) {
    throw new Error("OPENROUTER_API_KEY is missing. Add it to your environment and restart the app.");
  }

  const apiKey = rawApiKey.replace(/^Bearer\s+/i, "").trim();
  if (/^https?:\/\//i.test(apiKey) || /[:/]/.test(apiKey)) {
    throw new Error(
      "OPENROUTER_API_KEY looks malformed or URL-like, not like an API key. Paste the actual key from https://openrouter.ai/keys into your environment and restart the app.",
    );
  }

  return apiKey;
}

function getOpenRouterModel(): string {
  return process.env.OPENROUTER_MODEL || "openrouter/free";
}

function hasOpenRouterConfig(): boolean {
  return Boolean(process.env.OPENROUTER_API_KEY);
}

function getOpenRouterSetupFix(): string {
  const isHostedRuntime = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

  if (process.env.GEMINI_API_KEY && !process.env.OPENROUTER_API_KEY) {
    if (isHostedRuntime) {
      return "**Setup fix:** Replace the legacy `GEMINI_API_KEY` secret with `OPENROUTER_API_KEY` in your hosting environment, then redeploy.";
    }

    return "**Setup fix:** Replace the legacy `GEMINI_API_KEY` in `.env.local` with `OPENROUTER_API_KEY`, then restart `npm run dev`.";
  }

  if (isHostedRuntime) {
    return "**Setup fix:** Add `OPENROUTER_API_KEY` to your hosting environment variables, then redeploy.";
  }

  return "**Setup fix:** Add `OPENROUTER_API_KEY=...` to `.env.local`, then restart `npm run dev`.";
}

function toChatRole(role: string): ChatRole {
  if (role === "assistant" || role === "model") return "assistant";
  if (role === "system") return "system";
  return "user";
}

function extractOpenRouterText(payload: unknown): string {
  const message = asObject(asObject(asObject(payload).choices?.[0]).message);
  const content = message.content;

  if (typeof content === "string" && content.trim()) {
    return content;
  }

  if (Array.isArray(content)) {
    const text = content
      .map((part) => {
        if (typeof part === "string") return part;

        const objectPart = asObject(part);
        if (objectPart.type === "text" && typeof objectPart.text === "string") {
          return objectPart.text;
        }

        return "";
      })
      .filter(Boolean)
      .join("\n")
      .trim();

    if (text) {
      return text;
    }
  }

  return "";
}

async function generateOpenRouterText(messages: ChatMessage[], temperature: number): Promise<string> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${getOpenRouterApiKey()}`,
    "Content-Type": "application/json",
    "X-Title": "Ubuntu Rising Scholars Program",
  };

  const appUrl = getAppUrl();
  if (appUrl) {
    try {
      const parsedUrl = new URL(appUrl);
      if (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") {
        headers["HTTP-Referer"] = parsedUrl.toString();
      }
    } catch {
      // Ignore invalid APP_URL values in local development or hosted envs.
    }
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: getOpenRouterModel(),
      messages,
      temperature,
    }),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const errorPayload = asObject(payload);
    const nestedError = asObject(errorPayload.error);
    const apiError =
      asString(nestedError.message) ||
      asString(errorPayload.message) ||
      `OpenRouter request failed with status ${response.status}.`;

    throw new Error(apiError);
  }

  const text = extractOpenRouterText(payload);
  if (!text) {
    throw new Error("OpenRouter returned an empty response.");
  }

  return text;
}

function offlineGuidanceReply(message: string): string {
  const msgLower = (message || "").toLowerCase();

  if (
    msgLower.includes("toefl") ||
    msgLower.includes("ielts") ||
    msgLower.includes("waiver") ||
    msgLower.includes("english")
  ) {
    return `### TOEFL/IELTS Waiver Guide (Offline Mode)

Many universities in the US, UK, and Canada offer English proficiency waivers for students from Anglophone African countries. Here is the step-by-step process to request one:

1. **Check University Exemption Lists**: Look for the graduate school's admissions requirements page. They often list countries like Ghana, Nigeria, and Kenya whose citizens are automatically exempt.
2. **Request an English Medium of Instruction Letter**: Ask your undergraduate institution's Registrar for an official letter stating that your degree was taught entirely in English.
3. **Draft a Waiver Request Email**: If the system still prompts for tests, email graduate admissions with your letter attached.
4. **URSP Success Rate**: Over 80% of URSP scholars successfully secure English test waivers using this exact method.

*This response was generated locally in Offline Mode because no OPENROUTER_API_KEY is configured.*

${getOpenRouterSetupFix()}`;
  }

  if (
    msgLower.includes("funding") ||
    msgLower.includes("assistantship") ||
    msgLower.includes("scholarship") ||
    msgLower.includes("cost") ||
    msgLower.includes("fee")
  ) {
    return `### Securing Graduate Funding & Assistantships (Offline Mode)

At the Ubuntu Rising Scholars Program, we strongly discourage paying out-of-pocket for graduate school. Focus entirely on fully funded options:

1. **Graduate Assistantships (GAs)**: The primary vehicle for international funding.
2. **Teaching Assistantships (TAs)**: Grading, leading labs, and tutoring.
3. **Research Assistantships (RAs)**: Contributing to faculty research projects.
4. **What they cover**: 100% tuition waiver plus a stipend that helps cover living costs.
5. **Application strategy**: Submit before the priority deadline, often between December 15 and January 15, to maximize funding consideration.

*This response was generated locally in Offline Mode because no OPENROUTER_API_KEY is configured.*

${getOpenRouterSetupFix()}`;
  }

  if (
    msgLower.includes("visa") ||
    msgLower.includes("embassy") ||
    msgLower.includes("interview") ||
    msgLower.includes("f1") ||
    msgLower.includes("f-1")
  ) {
    return `### F-1 Visa Interview Blueprint (Offline Mode)

The visa interview is the final gate. Consular Officers usually evaluate three core pillars:

1. **Ties to Africa**: Show compelling family, professional, or social reasons that will bring you back home.
2. **Financial Sufficiency**: Explain your funding clearly. If you have an assistantship, say so directly.
3. **Academic Credibility**: Know your research topic, your advisor's name, and why this specific university fits your career trajectory.

*This response was generated locally in Offline Mode because no OPENROUTER_API_KEY is configured.*

${getOpenRouterSetupFix()}`;
  }

  return `### Welcome to the URSP Offline Advisor

I am currently running in **Offline Fallback Mode** because an \`OPENROUTER_API_KEY\` is not set in your environment.

You can still explore all features. Ask me about:
- **English test waivers** such as "How do I waive TOEFL?"
- **Graduate Assistantships** such as "How does funding work?"
- **F-1 Visa advice** such as "Tell me about the visa interview"

You can also use the SOP Architect and Embassy Visa Sim tabs while the live AI connection is offline.

${getOpenRouterSetupFix()}`;
}

function offlineSopReply(
  academicBackground: string,
  targetDegree: string,
  targetMajor: string,
  motivation: string,
  careerGoals: string,
  keyAchievements: string,
): string {
  return `### SOP Architecture Blueprint (Offline Mode)

Here is a tailored Statement of Purpose outline designed for your application profile:

---

#### 1. **Academic Branding Summary**
"As a graduate candidate prepared with a background in **${academicBackground || "your field"}**, I am driven to pursue a **${targetDegree || "Graduate Degree"} in ${targetMajor || "your major"}** to address critical challenges in **${motivation || "your focus area"}**. Leveraging achievements such as **${keyAchievements || "your key projects"}**, my goal is to transition into **${careerGoals || "your long-term aspirations"}** to promote collective development and community advancement."

---

#### 2. **SOP Section-by-Section Outline**

* **Paragraph 1: The Hook & Ubuntu Alignment**
  * **Objective**: Grab attention with a core issue in **${targetMajor || "your discipline"}**.
  * **Ubuntu Connection**: Connect your personal motivation (*"${motivation || "your research interest"}"*) with a vision of returning value to your academic and local community.
  * **Drafting Tip**: Avoid starting with "I am writing to apply..."; start with the real-world problem you want to solve.

* **Paragraph 2: Academic & Professional Foundation**
  * **Objective**: Build credibility and demonstrate readiness.
  * **Key Elements**: Focus on **${academicBackground || "your academic milestone"}** and detail the technical depth of your achievements in **${keyAchievements || "your project portfolio"}**.
  * **Drafting Tip**: Explain the methodology and outcomes of your projects to show your technical skills.

* **Paragraph 3: Why This Program & Alignment**
  * **Objective**: Show that you have thoroughly researched the university.
  * **Key Elements**: Mention specific courses, research centers, or 1-2 faculty members whose work aligns with your goals in **${targetMajor || "your field"}**.
  * **Drafting Tip**: Connect their resources directly to what you need to master to achieve your goals.

* **Paragraph 4: Career Vision & Giving Back**
  * **Objective**: Clearly state what you will do after graduation.
  * **Key Elements**: Lay out your career path (**${careerGoals || "your future roles"}**). Tie it back to the Ubuntu philosophy: how will you train others or uplift the next generation in Africa?

---

#### 3. **Refinement Master Tips**
1. **Show, Don't Just Tell**: Instead of saying you are hardworking, prove it by detailing your achievement: **${keyAchievements || "your key accomplishment"}**.
2. **Be Specific About Faculty**: Before submitting, look up two professors in your target department who study areas related to **${motivation || "your interests"}** and mention them.
3. **Keep it Concise**: Aim for 800 to 1000 words. Keep paragraphs balanced and transitions logical.

*This outline was compiled locally in Offline Mode because no OPENROUTER_API_KEY is configured.*

${getOpenRouterSetupFix()}`;
}

function offlineVisaReply(questionText: string, studentAnswer: string): string {
  let strength = "You provided a direct answer to the visa question.";
  let risks = "Avoid generic answers. Make sure your financial support and academic goals are clear.";
  let revised =
    "I am going to pursue my degree at my target university. My education is funded by a Graduate Assistantship which covers my tuition and provides a stipend. After graduation, I intend to return to apply these skills in my field.";

  if ((studentAnswer || "").length < 15) {
    risks =
      "**High Risk: Answer is too brief.** Consular interviews are very short, but one-sentence or two-word answers can appear uncooperative or unprepared. Expand with details of your assistantship and academic intent.";
  }

  if (questionText.toLowerCase().includes("funding") || questionText.toLowerCase().includes("pay")) {
    strength = "You directly address the source of financial support.";
    risks =
      "Make sure to clearly distinguish between personal funds and institutional sponsorship. Mentioning part-time work is a major red flag.";
    revised =
      '"My studies are fully funded by a Graduate Assistantship from the university, which covers 100% of my tuition fees and provides a monthly living stipend. I have my official admission and assistantship letter to verify this."';
  } else if (questionText.toLowerCase().includes("why") || questionText.toLowerCase().includes("choose")) {
    strength = "You express interest in the program or school.";
    risks =
      "Avoid general statements like 'it is a great country' or 'it is a top school'. Focus on specific courses or research alignment.";
    revised =
      '"I chose this university because their curriculum offers a specialized concentration in my field, and I want to work with the research labs focusing on these technologies. This program aligns perfectly with my research background in Africa."';
  } else if (questionText.toLowerCase().includes("return") || questionText.toLowerCase().includes("after")) {
    strength = "You discuss your plans after graduation.";
    risks =
      "Expressing intent to seek permanent employment or migrate during the F-1 interview is a primary risk under Section 214(b). Focus on your ties and return plans.";
    revised =
      '"Upon completing my degree, I plan to return to my home country to work as a specialist or university lecturer. There is a major shortage of expertise in this sector locally, and my degree will position me to lead development projects."';
  }

  return `### Visa Sim Feedback (Offline Mode)

---

#### 1. **Strength Check**
- ${strength}

---

#### 2. **Risk Factors**
- ${risks}

---

#### 3. **Revised Script Recommendation**
*Try practicing this organic, confident response:*
> ${revised}

*This feedback was compiled locally in Offline Mode because no OPENROUTER_API_KEY is configured.*

${getOpenRouterSetupFix()}`;
}

const guidanceSystemPrompt = `
You are the URSP AI Advisor, a specialized virtual mentor representing the Ubuntu Rising Scholars Program (URSP).
The program was founded by Festus Cobena Ainoo, a Ghanaian scholar-practitioner and higher education administrator at UMass Amherst.
The program is built on the African philosophy of Ubuntu ("I am because we are") and provides free mentorship and application support to help African students secure admission, assistantships, and F-1 visas for international study (mainly in the US, but also Canada, UK, Australia, Europe).

Keep your tone supportive, encouraging, expert, and deeply professional. Avoid robotic phrases.
Provide actionable, specific advice:
- Funding: Highlight Graduate Assistantships (GAs, TAs, RAs) which cover tuition and provide stipends.
- School Selection: Advise looking for schools that offer complete tuition waivers.
- Statement of Purpose: Ensure applicants emphasize community return, academic drive, research alignment, and leadership.
- F-1 Visa: Advise applicants to focus on ties to their home country, honest preparation, clear plans of study, and explaining their funding clearly. Highlight that URSP has a strong track record of supporting F-1 visa approvals.

Answer the user's inquiry concisely in elegant Markdown. Limit response to 300-400 words. Keep it scannable.
`.trim();

const sopSystemPrompt =
  "You are an elite Graduate Admissions consultant specializing in fully funded opportunities in the Global North. Your focus is helper outlines that are structured and impactful.";

const visaSystemPrompt =
  "You are a former Consular Officer and F-1 Visa Interview Coach. Your feedback is candid, encourages honesty, and polishes language to sound organic and confident.";

export function getHealthResult(): RouteResult<{ status: string; time: string }> {
  return ok({ status: "ok", time: new Date().toISOString() });
}

export async function getGuidanceResult(payload: unknown): Promise<RouteResult<{ text: string } | { error: string }>> {
  try {
    const body = asObject(payload);
    const message = asString(body.message);
    const chatHistory = Array.isArray(body.chatHistory) ? body.chatHistory : [];

    if (!hasOpenRouterConfig()) {
      return ok({ text: offlineGuidanceReply(message) });
    }

    const messages: ChatMessage[] = [{ role: "system", content: guidanceSystemPrompt }];

    for (const turn of chatHistory) {
      const chatTurn = asObject(turn);
      const text = asString(chatTurn.text);

      if (!text) continue;

      messages.push({
        role: toChatRole(asString(chatTurn.role)),
        content: text,
      });
    }

    messages.push({
      role: "user",
      content: message,
    });

    const responseText = await generateOpenRouterText(messages, 0.7);
    return ok({ text: responseText });
  } catch (error) {
    console.error("OpenRouter Guidance Error:", error);
    return fail(getErrorMessage(error, "An unexpected error occurred during your consultation."));
  }
}

export async function getSopPolishResult(payload: unknown): Promise<RouteResult<{ text: string } | { error: string }>> {
  try {
    const body = asObject(payload);
    const academicBackground = asString(body.academicBackground);
    const targetDegree = asString(body.targetDegree);
    const targetMajor = asString(body.targetMajor);
    const motivation = asString(body.motivation);
    const careerGoals = asString(body.careerGoals);
    const keyAchievements = asString(body.keyAchievements);

    if (!hasOpenRouterConfig()) {
      return ok({
        text: offlineSopReply(
          academicBackground,
          targetDegree,
          targetMajor,
          motivation,
          careerGoals,
          keyAchievements,
        ),
      });
    }

    const prompt = `
Please draft a highly compelling and professional Statement of Purpose (SOP) Outline & Academic Brand Profile.

Applicant Details:
- Target Degree: ${targetDegree} in ${targetMajor}
- Academic Background: ${academicBackground}
- Core Motivation & Passion: ${motivation}
- Key Achievements: ${keyAchievements}
- Long-Term Career Goals: ${careerGoals}

Utilize the Ubuntu Rising Scholars philosophy (community upliftment, scholarship, leadership).
Provide the output in beautiful Markdown with three main sections:
1. **Academic Branding Summary**: A powerful, 3-sentence summary that highlights their unique narrative and value proposition.
2. **SOP Section-by-Section Outline**:
   - Paragraph 1: The Hook (Connecting their background to global problems, introducing Ubuntu philosophy).
   - Paragraph 2: Academic & Professional Foundation (Detailing achievements and motivation).
   - Paragraph 3: Why This Program / School (How to research faculty, alignment with research or curriculum).
   - Paragraph 4: Long-Term Vision & Community Impact (How they will give back to their community/country).
3. **Refinement Master Tips**: 3 actionable, high-impact tips specifically customized for their profile to secure Graduate Assistantships or funding.
    `.trim();

    const responseText = await generateOpenRouterText(
      [
        {
          role: "system",
          content: sopSystemPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      0.8,
    );

    return ok({ text: responseText });
  } catch (error) {
    console.error("OpenRouter SOP Error:", error);
    return fail(getErrorMessage(error, "An unexpected error occurred during your outline formatting."));
  }
}

export async function getVisaFeedbackResult(
  payload: unknown,
): Promise<RouteResult<{ text: string } | { error: string }>> {
  try {
    const body = asObject(payload);
    const questionText = asString(body.questionText);
    const studentAnswer = asString(body.studentAnswer);

    if (!hasOpenRouterConfig()) {
      return ok({ text: offlineVisaReply(questionText, studentAnswer) });
    }

    const prompt = `
In an F-1 Visa Interview simulation, the student was asked:
"${questionText}"

The student's drafted answer is:
"${studentAnswer}"

Please evaluate this response objectively and provide coaching feedback with the standard expected by visa experts under Festus Cobena Ainoo (URSP Founder).

Analyze based on:
1. **Credibility**: Does the student show genuine academic intent? (Rather than just wanting to migrate or work).
2. **Sponsorship Clarity**: Is the source of funding clear, realistic, and documented?
3. **Home Country Ties**: Does the student convey clear intent to return or make global impact in Africa post-study?

Provide the feedback in formatted Markdown with:
- **Strength Check**: What was good about their response.
- **Risk Factors**: Any red flags (e.g., vague funding, work-heavy language, overconfident statements).
- **Revised Script Recommendation**: A polished, natural-sounding, and honest alternative draft of their answer that they can speak confidently while remaining fully authentic. Keep the script to 3-5 concise sentences.
    `.trim();

    const responseText = await generateOpenRouterText(
      [
        {
          role: "system",
          content: visaSystemPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      0.7,
    );

    return ok({ text: responseText });
  } catch (error) {
    console.error("OpenRouter Visa Evaluation Error:", error);
    return fail(getErrorMessage(error, "An unexpected error occurred during your response evaluation."));
  }
}
