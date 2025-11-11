export function createEmailHtml(products, orderID, customerData) {
  const productHtml = products.map(product => `
    <div style="margin-bottom: 20px;">
      <h2 style="font-size: 20px; color: #333333;">${product.title}</h2>
      <div style="display: flex; justify-content: center">
      <img src="${product.img[0]}" alt="${product.title}" style="width: 25%; height: 25%; object-fit: cover; border-radius: 8px;"/>
      </div>
      <p style="font-size: 18px; color: #1a8a27; font-weight: bold;">${product.currency} ${product.amount}</p>
      <p style="font-size: 16px;">size: ${product.size}</p>
      <p style="font-size: 16px;">qty: ${product.quantity}</p>
    </div>
  `).join('');

  const shippingDetailsHtml = `
    <div style="margin-bottom: 20px;">
      <h2 style="font-size: 20px; color: #333333;">Shipping Details</h2>
      <p style="font-size: 16px; color: #333333; margin-bottom: 5px;">
        <strong>Name:</strong> ${customerData.firstName} ${customerData.lastName}
      </p>
      <p style="font-size: 16px; color: #333333; margin-bottom: 5px;">
        <strong>Phone Number:</strong> ${customerData.phoneNumber}
      </p>
      <p style="font-size: 16px; color: #333333; margin-bottom: 5px;">
        <strong>Address:</strong> ${customerData.address}, ${customerData.city}, ${customerData.state}, ${customerData.zipcode}
      </p>
      <p style="font-size: 16px; color: #333333;">
        <strong>Country:</strong> ${customerData.country}
      </p>
    </div>
  `;

  return `
    <html lang="en">
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h1 style="font-size: 24px; color: #333333;">Order Confirmation</h1>
          <p style="font-size: 16px; color: #666666;">Thank you for your purchase!</p>
          <h2>Your OrderID is: ${orderID}</h2>
          <h2 style="font-size: 20px; color: #333333;">To view your order(s), please visit our orders page.</h2>
          ${productHtml}
          <hr style="margin: 30px 0; border-top: 1px solid #dddddd;"/>
          ${shippingDetailsHtml}
          <hr style="margin: 30px 0; border-top: 1px solid #dddddd;"/>
          <p style="font-size: 14px; color: #999999; text-align: center;">We hope you enjoy your purchase. If you have any questions, feel free to contact us.</p>
        </div>
      </body>
    </html>
  `;
}
