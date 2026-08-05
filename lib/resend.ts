import {Resend} from "resend";
import VerificationEmail from "@/app/components/email-template";
import OrderNotificationEmail from "@/app/components/email/OrderNotificationEmail";
import OrderConfirmationEmail from "@/app/components/email/OrderConfirmationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendOTPEmailParams = {
  email: string;
  username: string;
  otp: string;
};

export async function sendOTPEmail({email, username,otp}: SendOTPEmailParams){
    try {
          const { data, error } = await resend.emails.send({
      from: 'Fashion Stylized <noreply@fashionstylized.store>', // change in production
      to: [email],
      subject: 'Your Verification Code',
      react: VerificationEmail({ username, otp }),
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Failed to send email');
    }

    return data;
    } catch (error) {
        throw new Error('Failed to send email');
    }
}

type OrderNotificationParams = {
  orderId: string
  customerName: string
  customerEmail: string
  mobileNumber: string
  city: string
  address: string
  paymentMethod: string
  shippingFee: number
  products: {
    title: string
    quantity: number
    price: number
    category: string
  }[]
  totalAmount: number
}

export async function sendOrderNotificationEmail(order: OrderNotificationParams) {
  const adminUrl = `${process.env.NEXTAUTH_URL}/admin/orders/${order.orderId}`

  const { data, error } = await resend.emails.send({
    from: "Fashion Stylized <noreply@fashionstylized.store>",
    to: ["allauddinkamaluddin@gmail.com"], // ✅ your email
    subject: `🛍 New Order #${order.orderId.slice(-8).toUpperCase()} — Rs. ${order.totalAmount.toLocaleString()}`,
    react: OrderNotificationEmail({
      ...order,
      adminUrl,
    }),
  })

  if (error) {
    console.error("Order notification email error:", error)
    // ✅ don't throw — order already saved, email failure shouldn't break anything
  }

  return data
}

type OrderConfirmationParams = {
  customerName: string
  customerEmail: string
  orderId: string
  products: {
    title: string
    quantity: number
    price: number
    category: string
  }[]
  totalAmount: number
  shippingFee: number
  address: string
  city: string
  mobileNumber: string
  paymentMethod: string
}

export async function sendOrderConfirmationEmail(order: OrderConfirmationParams) {
  const { data, error } = await resend.emails.send({
    from: "Fashion Stylized <noreply@fashionstylized.store>",
    to: [order.customerEmail],
    subject: `Order Confirmed #${order.orderId.slice(-8).toUpperCase()} — Fashion Stylized`,
    react: OrderConfirmationEmail({
      customerName: order.customerName,
      orderId: order.orderId,
      products: order.products,
      totalAmount: order.totalAmount,
      shippingFee: order.shippingFee,
      address: order.address,
      city: order.city,
      mobileNumber: order.mobileNumber,
      paymentMethod: order.paymentMethod,
    }),
  })

  if (error) {
    console.error("Order confirmation email error:", error)
  }

  return data
}