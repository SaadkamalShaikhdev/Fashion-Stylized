import * as React from "react"

type OrderProduct = {
  title: string
  quantity: number
  price: number
  category: string
}

type Props = {
  orderId: string
  customerName: string
  customerEmail: string
  mobileNumber: string
  city: string
  address: string
  paymentMethod: string
  shippingFee: number
  products: OrderProduct[]
  totalAmount: number
  adminUrl: string
}

export default function OrderNotificationEmail({
  orderId,
  customerName,
  customerEmail,
  mobileNumber,
  city,
  address,
  shippingFee,
  paymentMethod,
  products,
  totalAmount,
  adminUrl,
}: Props) {
  const subtotal = totalAmount - shippingFee

  return (
    <div style={{ backgroundColor: "#f4f4f4", padding: "40px 0", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      <div style={{ maxWidth: "580px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "4px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>

        {/* ── top accent bar ── */}
        <div style={{ backgroundColor: "#F59E0B", height: "4px" }} />

        {/* ── header ── */}
        <div style={{ backgroundColor: "#0a0a0a", padding: "32px 40px", textAlign: "center" }}>
          <h1 style={{ margin: "0 0 4px 0", fontSize: "22px", color: "#F59E0B", letterSpacing: "4px", textTransform: "uppercase", fontWeight: "700" }}>
            FASHION STYLIZED
          </h1>
          <p style={{ margin: 0, fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "3px", textTransform: "uppercase" }}>
            Admin Order Notification
          </p>
        </div>

        {/* ── alert banner ── */}
        <div style={{ backgroundColor: "#FEF3C7", padding: "20px 40px", textAlign: "center", borderBottom: "1px solid #FDE68A" }}>
          <p style={{ margin: "0 0 4px 0", fontSize: "20px" }}>🛍️</p>
          <p style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: "700", color: "#92400E", letterSpacing: "1px" }}>
            New Order Received!
          </p>
          <p style={{ margin: 0, fontSize: "12px", color: "#B45309" }}>
            A customer has placed an order. Please review and process it.
          </p>
        </div>

        {/* ── order id banner ── */}
        <div style={{ backgroundColor: "#0a0a0a", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "2px", textTransform: "uppercase" }}>Order Reference</span>
          <span style={{ fontSize: "14px", color: "#F59E0B", fontFamily: "monospace", fontWeight: "bold", letterSpacing: "2px" }}>
            #{orderId.slice(-8).toUpperCase()}
          </span>
        </div>

        {/* ── body ── */}
        <div style={{ padding: "32px 40px" }}>

          {/* customer info */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ width: "3px", height: "16px", backgroundColor: "#F59E0B", borderRadius: "2px" }} />
              <h2 style={{ margin: 0, fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", color: "#374151", fontWeight: "700" }}>
                Customer Details
              </h2>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              {[
                { label: "Name", value: customerName },
                { label: "Email", value: customerEmail },
                { label: "Phone", value: mobileNumber },
                { label: "City", value: city },
                { label: "Address", value: address },
                { label: "Payment", value: paymentMethod === "COD" ? "Cash on Delivery" : "Online" },
              ].map((item, i) => (
                <tr key={item.label} style={{ backgroundColor: i % 2 === 0 ? "#f9fafb" : "#ffffff" }}>
                  <td style={{ padding: "10px 12px", fontSize: "11px", color: "#6B7280", textTransform: "uppercase", letterSpacing: "1px", width: "35%", fontWeight: "600" }}>
                    {item.label}
                  </td>
                  <td style={{ padding: "10px 12px", fontSize: "13px", color: "#111827", fontWeight: "500" }}>
                    {item.value}
                  </td>
                </tr>
              ))}
            </table>
          </div>

          {/* items ordered */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ width: "3px", height: "16px", backgroundColor: "#F59E0B", borderRadius: "2px" }} />
              <h2 style={{ margin: 0, fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", color: "#374151", fontWeight: "700" }}>
                Items Ordered ({products.length})
              </h2>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #E5E7EB" }}>
              <thead>
                <tr style={{ backgroundColor: "#0a0a0a" }}>
                  <th style={{ padding: "10px 12px", fontSize: "10px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "1px", textAlign: "left", fontWeight: "600" }}>
                    Product
                  </th>
                  <th style={{ padding: "10px 12px", fontSize: "10px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "1px", textAlign: "center", fontWeight: "600" }}>
                    Qty
                  </th>
                  <th style={{ padding: "10px 12px", fontSize: "10px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "1px", textAlign: "right", fontWeight: "600" }}>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #E5E7EB", backgroundColor: i % 2 === 0 ? "#ffffff" : "#f9fafb" }}>
                    <td style={{ padding: "12px" }}>
                      <p style={{ margin: "0 0 2px 0", fontSize: "13px", color: "#111827", fontWeight: "500" }}>
                        {product.title}
                      </p>
                      <p style={{ margin: 0, fontSize: "11px", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        {product.category}
                      </p>
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

          {/* order summary */}
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

          {/* CTA */}
          <div style={{ textAlign: "center" }}>
            <a
              href={adminUrl}
              style={{
                display: "inline-block",
                backgroundColor: "#F59E0B",
                color: "#000000",
                padding: "14px 40px",
                textDecoration: "none",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontWeight: "700",
                borderRadius: "2px",
              }}>
              View Order in Admin Panel →
            </a>
          </div>
        </div>

        {/* ── footer ── */}
        <div style={{ backgroundColor: "#0a0a0a", padding: "20px 40px", textAlign: "center" }}>
          <p style={{ margin: "0 0 4px 0", fontSize: "10px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "2px" }}>
            Fashion Stylized
          </p>
          <p style={{ margin: 0, fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "1px" }}>
            Orangi Town, Karachi · allauddinkamaluddin@gmail.com
          </p>
        </div>

        {/* ── bottom accent ── */}
        <div style={{ backgroundColor: "#F59E0B", height: "4px" }} />

      </div>
    </div>
  )
}
  