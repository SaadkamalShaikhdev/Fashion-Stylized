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
  paymentMethod,
  products,
  totalAmount,
  adminUrl,
}: Props) {
  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "#0a0a0a",
      color: "#ffffff",
      padding: "32px",
    }}>

      {/* header */}
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        paddingBottom: "24px",
        marginBottom: "24px",
      }}>
        <h1 style={{
          fontSize: "24px",
          margin: "0 0 8px 0",
          color: "#F59E0B",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}>
          Fashion Stylized
        </h1>
        <p style={{ margin: 0, color: "rgba(255,255,255,0.5)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
          New Order Notification
        </p>
      </div>

      {/* alert banner */}
      <div style={{
        backgroundColor: "rgba(245,158,11,0.15)",
        border: "1px solid rgba(245,158,11,0.4)",
        padding: "16px",
        marginBottom: "24px",
        textAlign: "center",
      }}>
        <p style={{ margin: 0, fontSize: "16px", color: "#F59E0B", textTransform: "uppercase", letterSpacing: "2px" }}>
          🛍 New Order Received!
        </p>
      </div>

      {/* order id */}
      <div style={{
        backgroundColor: "rgba(255,255,255,0.05)",
        padding: "12px 16px",
        marginBottom: "24px",
        display: "flex",
        justifyContent: "space-between",
      }}>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Order ID</span>
        <span style={{ color: "#ffffff", fontSize: "12px", fontFamily: "monospace" }}>#{orderId.slice(-8).toUpperCase()}</span>
      </div>

      {/* customer info */}
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "2px",
          color: "rgba(255,255,255,0.5)",
          margin: "0 0 12px 0",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          paddingBottom: "8px",
        }}>
          Customer Information
        </h2>
        {[
          { label: "Name : ", value: customerName },
          { label: "Email : ", value: customerEmail },
          { label: "Phone : ", value: mobileNumber },
          { label: "City : ", value: city },
          { label: "Address : ", value: address },
          { label: "Payment : ", value: paymentMethod },
        ].map(item => (
          <div key={item.label} style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
              {item.label}
            </span>
            <span className="pl-2" style={{ color: "#ffffff", fontSize: "12px" }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* order items */}
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "2px",
          color: "rgba(255,255,255,0.5)",
          margin: "0 0 12px 0",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          paddingBottom: "8px",
        }}>
          Items Ordered
        </h2>
        {products.map((product, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}>
            <div>
              <p style={{ margin: "0 0 2px 0", fontSize: "13px", color: "#ffffff" }}>
                {product.title}
              </p>
              <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
                {product.category} · Qty: {product.quantity}
              </p>
            </div>
            <p style={{ margin: 0, color: "#F59E0B", fontSize: "13px" }}>
              Rs. {(product.price * product.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* total */}
      <div style={{
        backgroundColor: "rgba(245,158,11,0.1)",
        border: "1px solid rgba(245,158,11,0.3)",
        padding: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
      }}>
        <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", color: "rgba(255,255,255,0.7)" }}>
          Total Amount
        </span>
        <span style={{ fontSize: "22px", color: "#F59E0B", fontWeight: "bold" }}>
          Rs. {totalAmount.toLocaleString()}
        </span>
      </div>

      {/* CTA button */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <a
          href={adminUrl}
          target="_blank"
          rel="noreferrer noopener"
          style={{
            display: "inline-block",
            backgroundColor: "#F59E0B",
            color: "#000000",
            padding: "14px 32px",
            textDecoration: "none",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontWeight: "bold",
          }}
        >
          View Order in Admin Panel
        </a>
      </div>

      {/* footer */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.1)",
        paddingTop: "16px",
        textAlign: "center",
      }}>
        <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "1px" }}>
          Fashion Stylized · Orangi Town, Karachi
        </p>
      </div>

    </div>
  )
}