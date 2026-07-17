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
          Order Confirmation
        </p>
      </div>

      {/* greeting */}
      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontSize: "16px", color: "#ffffff", margin: "0 0 8px 0" }}>
          Hello {customerName},
        </p>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", margin: 0 }}>
          Thank you for your order. We have received your order and it is now being processed. Below is a summary of your order details.
        </p>
      </div>

      {/* order id */}
      <div style={{
        backgroundColor: "rgba(245,158,11,0.1)",
        border: "1px solid rgba(245,158,11,0.3)",
        padding: "16px",
        marginBottom: "24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px" }}>
          Order ID
        </span>
        <span style={{ color: "#F59E0B", fontSize: "14px", fontFamily: "monospace", fontWeight: "bold" }}>
          #{orderId.slice(-8).toUpperCase()}
        </span>
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

      {/* subtotal */}
      <div style={{
        padding: "10px 16px",
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>Subtotal</span>
        <span style={{ color: "#ffffff", fontSize: "12px" }}>Rs. {subtotal.toLocaleString()}</span>
      </div>

      {/* shipping */}
      <div style={{
        padding: "10px 16px",
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>Shipping</span>
        <span style={{ color: "#ffffff", fontSize: "12px" }}>Rs. {shippingFee.toLocaleString()}</span>
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
          Total
        </span>
        <span style={{ fontSize: "22px", color: "#F59E0B", fontWeight: "bold" }}>
          Rs. {totalAmount.toLocaleString()}
        </span>
      </div>

      {/* delivery details */}
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
          Delivery Details
        </h2>
        {[
          { label: "Address", value: address },
          { label: "City", value: city },
          { label: "Phone", value: mobileNumber },
          { label: "Payment", value: paymentMethod === "COD" ? "Cash on Delivery" : "Online" },
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
            <span style={{ color: "#ffffff", fontSize: "12px", textAlign: "right", maxWidth: "60%" }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* delivery note */}
      <div style={{
        backgroundColor: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "16px",
        marginBottom: "24px",
      }}>
        <p style={{ margin: "0 0 8px 0", fontSize: "13px", color: "#ffffff" }}>
          Estimated Delivery
        </p>
        <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
          Your order will be delivered within 3-7 business days. You will receive a notification once your order has been dispatched.
        </p>
      </div>

      {/* support */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.1)",
        paddingTop: "16px",
        marginBottom: "16px",
      }}>
        <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
          If you have any questions about your order, please contact us:
        </p>
        <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
          WhatsApp: 0318 2942654 · Email: allauddinkamaluddin@gmail.com
        </p>
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
