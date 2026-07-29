import * as React from "react"

type OrderProduct = {
  title: string
  quantity: number
  price: number
  category: string
}

type Props = {
  customerName: string
  orderId: string
  products: OrderProduct[]
  totalAmount: number
  shippingFee: number
  address: string
  city: string
  mobileNumber: string
  paymentMethod: string
}

export default function OrderConfirmationEmail({
  customerName,
  orderId,
  products,
  totalAmount,
  shippingFee,
  address,
  city,
  mobileNumber,
  paymentMethod,
}: Props) {
  const subtotal = totalAmount - shippingFee

  return (
    <div style={{ backgroundColor: "#f4f4f4", padding: "40px 0", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      <div style={{ maxWidth: "580px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "4px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>

        {/* top accent */}
        <div style={{ backgroundColor: "#F59E0B", height: "4px" }} />

        {/* header */}
        <div style={{ backgroundColor: "#0a0a0a", padding: "32px 40px", textAlign: "center" }}>
          <h1 style={{ margin: "0 0 4px 0", fontSize: "22px", color: "#F59E0B", letterSpacing: "4px", textTransform: "uppercase", fontWeight: "700" }}>
            FASHION STYLIZED
          </h1>
          <p style={{ margin: 0, fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "3px", textTransform: "uppercase" }}>
            Order Confirmation
          </p>
        </div>

        {/* success banner */}
        <div style={{ backgroundColor: "#ECFDF5", padding: "24px 40px", textAlign: "center", borderBottom: "1px solid #A7F3D0" }}>
          <p style={{ margin: "0 0 6px 0", fontSize: "24px" }}>✅</p>
          <p style={{ margin: "0 0 6px 0", fontSize: "18px", fontWeight: "700", color: "#065F46" }}>
            Order Confirmed!
          </p>
          <p style={{ margin: 0, fontSize: "13px", color: "#047857" }}>
            Thank you {customerName.split(" ")[0]}! Your order has been received and is being processed.
          </p>
        </div>

        {/* order id */}
        <div style={{ backgroundColor: "#0a0a0a", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "2px", textTransform: "uppercase" }}>
            Your Order ID
          </span>
          <span style={{ fontSize: "14px", color: "#F59E0B", fontFamily: "monospace", fontWeight: "bold", letterSpacing: "2px" }}>
            #{orderId.slice(-8).toUpperCase()}
          </span>
        </div>

        {/* body */}
        <div style={{ padding: "32px 40px" }}>

          {/* greeting */}
          <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#374151", lineHeight: "1.6" }}>
            Hello <strong>{customerName}</strong>,<br />
            We have received your order and it is now being processed. You will receive another email once your order has been dispatched. Below is a summary of your order.
          </p>

          {/* items */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ width: "3px", height: "16px", backgroundColor: "#F59E0B", borderRadius: "2px" }} />
              <h2 style={{ margin: 0, fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", color: "#374151", fontWeight: "700" }}>
                Items Ordered
              </h2>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #E5E7EB" }}>
              <thead>
                <tr style={{ backgroundColor: "#0a0a0a" }}>
                  <th style={{ padding: "10px 12px", fontSize: "10px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "1px", textAlign: "left" }}>Product</th>
                  <th style={{ padding: "10px 12px", fontSize: "10px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "1px", textAlign: "center" }}>Qty</th>
                  <th style={{ padding: "10px 12px", fontSize: "10px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "1px", textAlign: "right" }}>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #E5E7EB", backgroundColor: i % 2 === 0 ? "#ffffff" : "#f9fafb" }}>
                    <td style={{ padding: "12px" }}>
                      <p style={{ margin: "0 0 2px 0", fontSize: "13px", color: "#111827", fontWeight: "500" }}>{product.title}</p>
                      <p style={{ margin: 0, fontSize: "11px", color: "#9CA3AF", textTransform: "uppercase" }}>{product.category}</p>
                    </td>
                    <td style={{ padding: "12px", textAlign: "center", fontSize: "13px", color: "#374151", fontWeight: "600" }}>
                      {product.quantity}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", fontSize: "13px", color: "#F59E0B", fontWeight: "600" }}>
                      Rs. {(product.price * product.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* order total */}
          <div style={{ backgroundColor: "#f9fafb", border: "1px solid #E5E7EB", borderRadius: "4px", overflow: "hidden", marginBottom: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid #E5E7EB" }}>
              <span style={{ fontSize: "12px", color: "#6B7280" }}>Subtotal</span>
              <span style={{ fontSize: "12px", color: "#111827" }}>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid #E5E7EB" }}>
              <span style={{ fontSize: "12px", color: "#6B7280" }}>Shipping</span>
              <span style={{ fontSize: "12px", color: "#111827" }}>Rs. {shippingFee.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", backgroundColor: "#0a0a0a" }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "1px" }}>Total</span>
              <span style={{ fontSize: "18px", color: "#F59E0B", fontWeight: "700" }}>Rs. {totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* delivery details */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ width: "3px", height: "16px", backgroundColor: "#F59E0B", borderRadius: "2px" }} />
              <h2 style={{ margin: 0, fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", color: "#374151", fontWeight: "700" }}>
                Delivery Details
              </h2>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              {[
                { label: "Address", value: address },
                { label: "City", value: city },
                { label: "Phone", value: mobileNumber },
                { label: "Payment", value: paymentMethod === "COD" ? "Cash on Delivery" : "Online" },
              ].map((item, i) => (
                <tr key={item.label} style={{ backgroundColor: i % 2 === 0 ? "#f9fafb" : "#ffffff" }}>
                  <td style={{ padding: "10px 12px", fontSize: "11px", color: "#6B7280", textTransform: "uppercase", letterSpacing: "1px", width: "35%", fontWeight: "600" }}>
                    {item.label}
                  </td>
                  <td style={{ padding: "10px 12px", fontSize: "13px", color: "#111827" }}>
                    {item.value}
                  </td>
                </tr>
              ))}
            </table>
          </div>

          {/* estimated delivery */}
          <div style={{ backgroundColor: "#FEF3C7", border: "1px solid #FDE68A", borderRadius: "4px", padding: "16px", marginBottom: "28px" }}>
            <p style={{ margin: "0 0 6px 0", fontSize: "12px", fontWeight: "700", color: "#92400E", textTransform: "uppercase", letterSpacing: "1px" }}>
              📦 Estimated Delivery
            </p>
            <p style={{ margin: 0, fontSize: "12px", color: "#B45309", lineHeight: "1.5" }}>
              Your order will be delivered within <strong>3-7 business days</strong>. Our team will contact you before delivery.
            </p>
          </div>

          {/* support */}
          <div style={{ backgroundColor: "#f9fafb", border: "1px solid #E5E7EB", borderRadius: "4px", padding: "16px", textAlign: "center" }}>
            <p style={{ margin: "0 0 8px 0", fontSize: "12px", fontWeight: "600", color: "#374151" }}>
              Need Help?
            </p>
            <p style={{ margin: "0 0 4px 0", fontSize: "12px", color: "#6B7280" }}>
              📱 WhatsApp: <a href="https://wa.me/923182942654" style={{ color: "#F59E0B", textDecoration: "none" }}>0318 2942654</a>
            </p>
            <p style={{ margin: 0, fontSize: "12px", color: "#6B7280" }}>
              ✉️ Email: <a href="mailto:allauddinkamaluddin@gmail.com" style={{ color: "#F59E0B", textDecoration: "none" }}>allauddinkamaluddin@gmail.com</a>
            </p>
          </div>
        </div>

        {/* footer */}
        <div style={{ backgroundColor: "#0a0a0a", padding: "20px 40px", textAlign: "center" }}>
          <p style={{ margin: "0 0 4px 0", fontSize: "10px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "2px" }}>
            Fashion Stylized
          </p>
          <p style={{ margin: "0 0 8px 0", fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "1px" }}>
            Orangi Town, Karachi
          </p>
          <p style={{ margin: 0, fontSize: "10px", color: "rgba(255,255,255,0.15)" }}>
            You received this email because you placed an order on fashionstylized.store
          </p>
        </div>

        {/* bottom accent */}
        <div style={{ backgroundColor: "#F59E0B", height: "4px" }} />

      </div>
    </div>
  )
}