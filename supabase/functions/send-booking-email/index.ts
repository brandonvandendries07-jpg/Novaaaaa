import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface BookingData {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  vehicle_type: string;
  service: string;
  preferred_date: string;
  comment: string;
  status: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { booking }: { booking: BookingData } = await req.json();

    if (!booking) {
      return new Response(
        JSON.stringify({ error: "Booking data is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const serviceName = booking.service
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l: string) => l.toUpperCase());

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="utf-8">
        <title>Nouvelle Réservation - Nova Detail</title>
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #0A0F4D 0%, #1a1f5d 100%); padding: 30px; text-align: center;">
            <h1 style="color: #FF5A36; margin: 0; font-size: 28px;">Nova Detail</h1>
            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px;">La perfection dans chaque détail</p>
          </div>

          <div style="padding: 30px;">
            <h2 style="color: #0A0F4D; margin-top: 0;">Nouvelle réservation reçue !</h2>

            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #0A0F4D; margin: 0 0 15px 0;">Informations client</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; width: 40%;">Nom complet :</td>
                  <td style="padding: 8px 0; color: #0A0F4D; font-weight: bold;">${booking.first_name} ${booking.last_name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Téléphone :</td>
                  <td style="padding: 8px 0; color: #0A0F4D;">${booking.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Email :</td>
                  <td style="padding: 8px 0; color: #0A0F4D;">${booking.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Adresse :</td>
                  <td style="padding: 8px 0; color: #0A0F4D;">${booking.address}</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #fff3e0; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #FF5A36;">
              <h3 style="color: #FF5A36; margin: 0 0 15px 0;">Détails de la réservation</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; width: 40%;">Service :</td>
                  <td style="padding: 8px 0; color: #0A0F4D; font-weight: bold;">${serviceName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Type de véhicule :</td>
                  <td style="padding: 8px 0; color: #0A0F4D;">${booking.vehicle_type}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Date souhaitée :</td>
                  <td style="padding: 8px 0; color: #0A0F4D; font-weight: bold;">${new Date(booking.preferred_date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                </tr>
                ${booking.comment ? `
                <tr>
                  <td style="padding: 8px 0; color: #666;">Commentaire :</td>
                  <td style="padding: 8px 0; color: #0A0F4D; font-style: italic;">${booking.comment}</td>
                </tr>
                ` : ''}
              </table>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="tel:${booking.phone}" style="display: inline-block; background-color: #FF5A36; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">Appeler le client</a>
            </div>
          </div>

          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
            <p style="color: #666; margin: 0; font-size: 12px;">
              Cet email a été généré automatiquement par le système de réservation Nova Detail.
            </p>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 12px;">
              ID de réservation : ${booking.id}
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Nova Detail <noreply@novadetail.be>",
        to: ["novadetail.be@gmail.com"],
        subject: `Nouvelle réservation - ${booking.first_name} ${booking.last_name} - ${serviceName}`,
        html: emailHtml,
        reply_to: booking.email,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      console.error("Failed to send email:", error);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: error }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const result = await emailResponse.json();
    console.log("Email sent successfully:", result);

    return new Response(
      JSON.stringify({ success: true, messageId: result.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
