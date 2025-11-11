import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { excelBuffer } = await req.json();

    if (!excelBuffer) {
      return NextResponse.json({ error: 'No buffer data provided' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const bufferData = Buffer.from(excelBuffer, 'base64');

    await resend.emails.send({
      from: 'order_history@ggccomp.in',
      to: ["alok.akrt@gmail.com"],
      subject: 'Monthly Orders Report',
      html: '<p>Please find attached the monthly orders report.</p>',
      attachments: [
        {
          filename: 'orders.xlsx',
          content: bufferData.toString('base64'),
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          disposition: 'attachment',
        },
      ],
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Failed to send email:', error.message);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
