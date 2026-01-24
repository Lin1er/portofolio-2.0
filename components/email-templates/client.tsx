import * as React from "react";

interface ClientEmailProps{
  clientName: string;
  clientEmail: string;
  message: string;
}

export function ClientEmail({ clientName, clientEmail, message }: ClientEmailProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
      <h2 style={{ color: '#0070f3' }}>New Message from {clientName}</h2>
      <p><strong>Name:</strong> {clientName}</p>
      <p><strong>Email:</strong> {clientEmail}</p>
      <p><strong>Message:</strong></p>
      <p>{message}</p>
      <hr />
      <p style={{ fontSize: '0.9em', color: '#666' }}>
        This email was sent from your portfolio website's contact form.
      </p>
    </div>
  );
}
