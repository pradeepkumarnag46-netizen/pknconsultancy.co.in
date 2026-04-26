const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are the friendly AI assistant for PKN Consultancy, a professional financial and business services firm in India. PKN Consultancy provides:

- GST Registration & Return Filing
- TDS Return Filing
- Income Tax Return Filing
- Company Registration (Pvt Ltd, LLP, OPC, Partnership)
- Payroll Management
- Business Compliance & ROC Filings
- Trademark Registration
- PAN & TAN Application
- Website Creation

Your role:
- Answer questions about our services, pricing approach (affordable, custom-quoted), process, and Indian tax/compliance basics.
- Be concise, professional, and helpful. Use simple English.
- For specific quotes or detailed cases, direct the user to the Contact page on our website.
- IMPORTANT: NEVER share or display the phone number, WhatsApp number, email address, or office address in your replies. If a user asks for contact details, simply tell them to visit the Contact page on the website.
- Do not invent prices, deadlines, or legal advice you are unsure about — instead, suggest booking a consultation via the Contact page.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds to your workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
