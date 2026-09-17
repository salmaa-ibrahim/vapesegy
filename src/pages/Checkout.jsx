
// // src/pages/Checkout.jsx
// import React, { useState } from "react";
// import emailjs from "@emailjs/browser";
// import { useNavigate, Link } from "react-router-dom";
// import useCart from "../hooks/useCart.js";
// import orderService from "../services/orderService.js";
// import "./Checkout.css";

// // All Egyptian Governorates and Cities Data
// const governoratesData = {
//   القاهرة: [
//     "مدينة نصر",
//     "مصر الجديدة",
//     "الزمالك",
//     "الدقي",
//     "المعادي",
//     "حلوان",
//     "شبرا",
//     "العباسية",
//     "الوايلي",
//     "جاردن سيتي",
//     "وسط البلد",
//     "بولاق",
//     "باب الشعرية",
//     "الأزبكية",
//     "مصر القديمة",
//     "الخليفة",
//     "المطرية",
//     "عين شمس",
//     "الزيتون",
//     "الحدائق القبليه",
//     "حدائق حلوان",
//     "مصر الجديده",
//     "الساحل",
//     "المرج",
//     "السلام",
//     "منشية ناصر",
//     "دار السلام",
//     "التبين",
//     "15 مايو",
//     "بدر",
//     "القاهرة الجديدة",
//     "الشروق",
//   ],
//   الإسكندرية: [
//     "وسط البلد",
//     "محرم بك",
//     "سيدي جابر",
//     "المنتزة",
//     "العجمي",
//     "الابراهيمية",
//     "السيوف",
//     "سموحة",
//     "لوران",
//     "ميامي",
//     "باكوس",
//     "جليم",
//     "ستانلي",
//     "سبورتنج",
//     "العصافرة",
//     "الدخيلة",
//     "القبارى",
//     "أنطونيادس",
//     "كفر عبده",
//     "سيدي بشر",
//     "العامرية",
//     "برج العرب",
//     "المكس",
//     "الكيلو 21",
//   ],
//   الجيزة: [
//     "الدقي",
//     "المهندسين",
//     "الهرم",
//     "فيصل",
//     "أكتوبر",
//     "الشيخ زايد",
//     "البدرشين",
//     "العجوزة",
//     "بني سويف",
//     "نزلة السمان",
//     "أبو النمرس",
//     "كفر غطاطي",
//     "منشأة القناطر",
//     "أوسيم",
//     "أطفيح",
//     "صفط اللبن",
//     "حلوان",
//     "وراق الحضر",
//     "المنيب",
//     "الطالبية",
//     "بولاق الدكرور",
//     "إمبابة",
//     "الوراق",
//     "ناهيا",
//     "كرداسة",
//     "السادس من أكتوبر",
//     "حدائق أكتوبر",
//     "بني يوسف",
//     "الرماية",
//   ],
//   بورسعيد: [
//     "بورسعيد",
//     "الزهور",
//     "العرب",
//     "الضواحي",
//     "المناخ",
//     "حي الشرق",
//     "حي الغرب",
//     "حي الجنوب",
//     "المناصرة",
//     "التوفيقية",
//   ],
//   السويس: [
//     "السويس",
//     "الأربعين",
//     "فيصل",
//     "الجناين",
//     "عتاقة",
//     "ملاحة",
//     "بورتوفيق",
//     "حي السلام",
//     "حي الزهور",
//     "المتحف",
//   ],
//   دمياط: [
//     "دمياط",
//     "فارسكور",
//     "كفر سعد",
//     "دمياط الجديدة",
//     "الزرقا",
//     "رأس البر",
//     "عزبة البرج",
//     "السرو",
//     "شطا",
//     "بني السليم",
//   ],
//   الدقهلية: [
//     "المنصورة",
//     "طلخا",
//     "ميت غمر",
//     "أجا",
//     "نبروه",
//     "تمي الأمديد",
//     "السنبلاوين",
//     "دكرنس",
//     "بلقاس",
//     "منية النصر",
//     "محلة دمنة",
//     "شربين",
//     "جمصة",
//     "المطرية",
//     "بني عبيد",
//     "ميت سلسيل",
//     "كفر البطيخ",
//     "أولاد عفيف",
//     "ميت يزيد",
//   ],
//   الشرقية: [
//     "الزقازيق",
//     "بلبيس",
//     "ههيا",
//     "أبو حماد",
//     "مشتول السوق",
//     "العاشر من رمضان",
//     "منيا القمح",
//     "أبو كبير",
//     "فاقوس",
//     "الإبراهيمية",
//     "ديرب نجم",
//     "كفر صقر",
//     "الحسينية",
//     "قرقيرة",
//     "أولاد صقر",
//     "صان الحجر",
//     "ميت علوان",
//     "أبو شقير",
//     "القرين",
//     "القنايات",
//   ],
//   القليوبية: [
//     "بنها",
//     "شبرا الخيمة",
//     "قليوب",
//     "الخانكة",
//     "طوخ",
//     "القناطر الخيرية",
//     "كفر شكر",
//     "الخصوص",
//     "أبو زعبل",
//     "العبور",
//     "العباسية",
//     "بهادة",
//     "سندبيس",
//     "جزيرة بلهاء",
//   ],
//   المنوفية: [
//     "شبين الكوم",
//     "بركة السبع",
//     "قويسنا",
//     "الباجور",
//     "منوف",
//     "أشمون",
//     "السادات",
//     "تلا",
//     "الشهداء",
//     "ميت خلف",
//     "سدود",
//     "أبو قرقاص",
//     "ميت أبو الكوم",
//   ],
//   الغربية: [
//     "طنطا",
//     "المحلة الكبرى",
//     "كفر الزيات",
//     "زفتى",
//     "بسيون",
//     "قطور",
//     "سمنود",
//     "السنطة",
//     "أبيار",
//     "ميت غمر",
//     "الرحمانية",
//     "فزارة",
//     "تلبنت",
//     "أجهور الرمل",
//   ],
//   "كفر الشيخ": [
//     "كفر الشيخ",
//     "دسوق",
//     "فوه",
//     "مطوبس",
//     "بلطيم",
//     "سيدي سالم",
//     "الرياض",
//     "القلين",
//     "الحامول",
//     "بيلا",
//     "برج البرلس",
//     "مسير",
//   ],
//   الفيوم: [
//     "الفيوم",
//     "سنورس",
//     "طامية",
//     "إطسا",
//     "يوسف الصديق",
//     "أبو شوك",
//     "عين السيلين",
//     "الغازيات",
//     "دمو",
//     "شكشوك",
//   ],
//   "بني سويف": [
//     "بني سويف",
//     "ببا",
//     "الفشن",
//     "ناصر",
//     "الواسطى",
//     "إهناسيا",
//     "سمسطا",
//     "ميدوم",
//     "أبو صير الملق",
//     "العدوة",
//   ],
//   المنيا: [
//     "المنيا",
//     "ملوي",
//     "بني مزار",
//     "مطاي",
//     "سمالوط",
//     "أبو قرقاص",
//     "دير مواس",
//     "العدوة",
//     "مغاغة",
//     "الروضة",
//     "برمشا",
//     "تندة",
//   ],
//   أسيوط: [
//     "أسيوط",
//     "ديروط",
//     "أبو تيج",
//     "منفلوط",
//     "القوصية",
//     "البداري",
//     "صدفا",
//     "الغنايم",
//     "ساحل سليم",
//     "الفتح",
//     "بني زيد",
//     "مطوع",
//   ],
//   سوهاج: [
//     "سوهاج",
//     "أخميم",
//     "البلينا",
//     "المنشأة",
//     "جرجا",
//     "طهطا",
//     "دار السلام",
//     "المراغة",
//     "ساقلتة",
//     "طهطا الجديدة",
//     "كوم غريب",
//     "أولاد يحيى",
//   ],
//   قنا: [
//     "قنا",
//     "نجع حمادي",
//     "دشنا",
//     "الوقف",
//     "فرشوط",
//     "نقادة",
//     "قفط",
//     "أبو تشت",
//     "الحراجية",
//     "حجازة",
//     "دنفيق",
//   ],
//   الأقصر: [
//     "الأقصر",
//     "البياضية",
//     "الطود",
//     "أرمنت",
//     "إسنا",
//     "القرنة",
//     "البر الغربي",
//     "البر الشرقي",
//     "الدير",
//     "الضبعية",
//   ],
//   أسوان: [
//     "أسوان",
//     "إدفو",
//     "السباعية",
//     "بدر",
//     "الرديسية",
//     "نصر النوبة",
//     "كشكول",
//     "المفازة",
//     "أبو الريش",
//     "كلابشة",
//     "أرقين",
//   ],
//   "البحر الأحمر": [
//     "الغردقة",
//     "القصير",
//     "مرسى علم",
//     "رأس غارب",
//     "سفاجا",
//     "الشلاتين",
//     "حلايب",
//     "شلاتين",
//     "أبو رماد",
//     "المثلث",
//   ],
//   "الوادي الجديد": [
//     "الخارجة",
//     "الداخلة",
//     "الفرافرة",
//     "بلاط",
//     "باريس",
//     "منفلوط",
//     "أبو منقار",
//     "العوينات",
//   ],
//   "مرسى مطروح": [
//     "مرسى مطروح",
//     "الضبعة",
//     "سيدي براني",
//     "النجيلة",
//     "السلوم",
//     "فوكة",
//     "جرجوب",
//     "سيدي عبد الرحمن",
//     "رأس الحكمة",
//     "مرسى أبو غصون",
//   ],
//   "شمال سيناء": [
//     "العريش",
//     "رفح",
//     "الشيخ زويد",
//     "بئر العبد",
//     "الحسنة",
//     "نخل",
//     "قسيمة",
//     "الميدان",
//     "الرابعة",
//   ],
//   "جنوب سيناء": [
//     "الطور",
//     "شرم الشيخ",
//     "دهب",
//     "نويبع",
//     "طابا",
//     "رأس سدر",
//     "سانت كاترين",
//     "أبو زنيمة",
//     "أبو رديس",
//     "سيدي سالم",
//     "كلبيا",
//   ],
//   حلوان: [
//     "حلوان",
//     "15 مايو",
//     "حدائق حلوان",
//     "التبين",
//     "معصرة",
//     "عرب الوالدة",
//     "طرة",
//     "المعادن",
//   ],
//   أكتوبر: ["6 أكتوبر", "الشيخ زايد", "الريم", "أكتوبر الجديدة", "حدائق أكتوبر"],
//   "العاصمة الإدارية": [
//     "العاصمة الإدارية الجديدة",
//     "الرحاب",
//     "مدينتي",
//     "القاهرة الجديدة",
//     "التجمع الخامس",
//     "التجمع الثالث",
//   ],
// };

// function Checkout() {
//   const { cart, cartTotal, clearCart } = useCart();

//   const navigate = useNavigate();
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [shippingMethod, setShippingMethod] = useState("regular"); // "regular" | "express"
//   const [formData, setFormData] = useState({
//     customerName: "",
//     phone: "",
//     whatsapp: "",
//     governorate: "",
//     city: "",
//     street: "",
//     buildingNumber: "",
//     apartmentNumber: "",
//     additionalDetails: "",
//   });

//   // Shipping fee calculation based on selected method
//   const shippingFee = shippingMethod === "regular" ? 100 : 0;
//   const orderTotal = cartTotal + shippingFee;

//   // Extract governorates for the dropdown list
//   const governorates = Object.keys(governoratesData).sort();

//   if (cart.length === 0 && !showSuccessMessage) {
//     return (
//       <div className="checkout-page">
//         <div className="checkout-empty">
//           <h2>Your cart is empty</h2>
//           <Link to="/" className="back-btn">
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//       // If governorate changes, reset the city
//       ...(name === "governorate" && { city: "" }),
//     }));
//   };

//   const handleShippingChange = (e) => {
//     setShippingMethod(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Prevent multiple submissions
//     if (isProcessing) return;
//     setIsProcessing(true);

//     // Build full address from details
//     const fullAddress = `${formData.street}, Building ${formData.buildingNumber}, Apartment ${formData.apartmentNumber}, ${formData.city}, ${formData.governorate}${
//       formData.additionalDetails ? ` - ${formData.additionalDetails}` : ""
//     }`;

//     const order = {
//       customerName: formData.customerName,
//       phone: formData.phone,
//       whatsapp: formData.whatsapp,
//       address: fullAddress,
//       addressDetails: {
//         governorate: formData.governorate,
//         city: formData.city,
//         street: formData.street,
//         buildingNumber: formData.buildingNumber,
//         apartmentNumber: formData.apartmentNumber,
//         additionalDetails: formData.additionalDetails,
//       },
//       items: cart.map((item) => ({
//         productId: item.id,
//         name: item.name,
//         flavor: item.flavor,
//         quantity: item.quantity,
//         price: item.price,
//       })),
//       subtotal: cartTotal,
//       shipping_method: shippingMethod,
//       shipping_fee: shippingFee,
//       total: orderTotal,
//       status: "pending",
//     };

//     try {
//       // Create the order first
//       await orderService.createOrder(order);

//       const orderDetails = cart
//         .map(
//           (item) => `
//   <tr>
//     <td>${item.name}</td>
//     <td>${item.flavor || "-"}</td>
//     <td>${item.quantity}</td>
//     <td>LE ${(item.price * item.quantity).toFixed(2)}</td>
//   </tr>
// `,
//         )
//         .join("");

//       await emailjs.send(
//         import.meta.env.VITE_EMAILJS_SERVICE_ID,
//         import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
//         {
//           customer_name: formData.customerName,
//           phone: formData.phone,
//           whatsapp: formData.whatsapp || "-",
//           governorate: formData.governorate,
//           address: fullAddress,
//           order_details: `
//       <table style="width:100%; border-collapse:collapse;">
//         <thead>
//           <tr>
//             <th>Product</th>
//             <th>Flavor</th>
//             <th>Qty</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${orderDetails}
//         </tbody>
//       </table>
//     `,
//           shipping_method:
//             shippingMethod === "regular"
//               ? "شحن عادي بشركة شحن"
//               : "شحن سريع في نفس اليوم (حسب الاتفاق عبر واتساب)",
//           subtotal: cartTotal.toFixed(2),
//           shipping_fee:
//             shippingMethod === "regular"
//               ? shippingFee.toFixed(2)
//               : "حسب الاتفاق عبر واتساب",
//           total:
//             shippingMethod === "regular"
//               ? orderTotal.toFixed(2)
//               : `${cartTotal.toFixed(2)} + رسوم الشحن السريع (حسب الاتفاق)`,
//         },
//         import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
//       );

//       // Show success message
//       setShowSuccessMessage(true);

//       // Clear cart after showing success message
//       clearCart();

//       // Navigate after 6 seconds to give user time to read the message
//       setTimeout(() => {
//         navigate("/");
//       }, 6000);
//     } catch (error) {
//       console.error("Error creating order:", error);
//       setIsProcessing(false);
//       // You might want to show an error message here
//     }
//   };

//   // Get cities list based on selected governorate
//   const cities = formData.governorate
//     ? governoratesData[formData.governorate]
//     : [];

//   return (
//     <div className="checkout-page">
//       <div className="checkout-container">
//         <Link to="/" className="back-link">
//           ← Back to Home
//         </Link>

//         <h1 className="checkout-title">Checkout</h1>

//         {showSuccessMessage ? (
//           <div className="success-message">
//             <div className="success-content">
//               <div className="success-icon">✓</div>
//               <h2>Thank You for Your Order! 🎉</h2>
//               <p>Your order has been confirmed successfully.</p>
//               {shippingMethod === "express" && (
//                 <p className="success-subtext" style={{ color: "#c9a227" }}>
//                   ⚡ سيتم التواصل معك عبر واتساب لتحديد تكلفة الشحن السريع.
//                 </p>
//               )}
//               <p className="success-subtext">
//                 You will be redirected to the home page shortly...
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="checkout-content">
//             <form className="checkout-form" onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="customerName">Full Name</label>
//                 <input
//                   type="text"
//                   id="customerName"
//                   name="customerName"
//                   value={formData.customerName}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="Enter your full name"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="phone">Phone Number</label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="Enter your phone number"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="whatsapp">
//                   WhatsApp Number
//                   {shippingMethod === "express" && (
//                     <span style={{ color: "#c9a227", marginLeft: "6px" }}>
//                       (مطلوب للشحن السريع)
//                     </span>
//                   )}
//                 </label>
//                 <input
//                   type="tel"
//                   id="whatsapp"
//                   name="whatsapp"
//                   value={formData.whatsapp}
//                   onChange={handleInputChange}
//                   required={shippingMethod === "express"}
//                   placeholder={
//                     shippingMethod === "express"
//                       ? "رقم الواتساب مطلوب للشحن السريع"
//                       : "Enter your WhatsApp number (optional)"
//                   }
//                 />
//               </div>

//               <div className="form-row">
//                 <div className="form-group half">
//                   <label htmlFor="governorate">Governorate</label>
//                   <select
//                     id="governorate"
//                     name="governorate"
//                     value={formData.governorate}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     <option value="">Select Governorate</option>
//                     {governorates.map((gov) => (
//                       <option key={gov} value={gov}>
//                         {gov}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="form-group half">
//                   <label htmlFor="city">City</label>
//                   <select
//                     id="city"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     required
//                     disabled={!formData.governorate}
//                   >
//                     <option value="">Select City</option>
//                     {cities.map((city) => (
//                       <option key={city} value={city}>
//                         {city}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="street">Street</label>
//                 <input
//                   type="text"
//                   id="street"
//                   name="street"
//                   value={formData.street}
//                   onChange={handleInputChange}
//                   placeholder="Enter street name"
//                 />
//               </div>

//               <div className="form-row">
//                 <div className="form-group half">
//                   <label htmlFor="buildingNumber">Building Number</label>
//                   <input
//                     type="text"
//                     id="buildingNumber"
//                     name="buildingNumber"
//                     value={formData.buildingNumber}
//                     onChange={handleInputChange}
//                     placeholder="Building number"
//                   />
//                 </div>

//                 <div className="form-group half">
//                   <label htmlFor="apartmentNumber">Apartment Number</label>
//                   <input
//                     type="text"
//                     id="apartmentNumber"
//                     name="apartmentNumber"
//                     value={formData.apartmentNumber}
//                     onChange={handleInputChange}
//                     placeholder="Apartment number"
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="additionalDetails">
//                   Additional Address Details
//                 </label>
//                 <textarea
//                   id="additionalDetails"
//                   name="additionalDetails"
//                   value={formData.additionalDetails}
//                   onChange={handleInputChange}
//                   placeholder="e.g., Landmark, floor number, delivery instructions, etc."
//                   rows="2"
//                 />
//               </div>

//               {/* Shipping Method Selection */}
//               <div className="form-group">
//                 <label>طريقة الشحن</label>

//                 <div className="shipping-options">
//                   <label
//                     className={`shipping-option ${
//                       shippingMethod === "regular" ? "selected" : ""
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name="shippingMethod"
//                       value="regular"
//                       checked={shippingMethod === "regular"}
//                       onChange={handleShippingChange}
//                     />
//                     <div className="shipping-option-content">
//                       <span className="shipping-option-title">
//                         🚚 شحن بشركة شحن
//                       </span>
//                       <span className="shipping-option-desc">
//                         التوصيل خلال 2-5 أيام عمل
//                       </span>
//                       <span className="shipping-option-price">100 جنيه</span>
//                     </div>
//                   </label>

//                   <label
//                     className={`shipping-option ${
//                       shippingMethod === "express" ? "selected" : ""
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name="shippingMethod"
//                       value="express"
//                       checked={shippingMethod === "express"}
//                       onChange={handleShippingChange}
//                     />
//                     <div className="shipping-option-content">
//                       <span className="shipping-option-title">
//                         ⚡ شحن سريع (نفس اليوم)
//                       </span>
//                       <span className="shipping-option-desc">
//                         سيتم تحديد سعر الشحن بالاتفاق عبر واتساب
//                       </span>
//                       <span className="shipping-option-price">
//                         حسب الاتفاق
//                       </span>
//                     </div>
//                   </label>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="place-order-btn"
//                 disabled={isProcessing}
//               >
//                 {isProcessing
//                   ? "Processing..."
//                   : shippingMethod === "regular"
//                     ? "Place Order - 100 EGP Shipping"
//                     : "Place Order - Express Shipping- Contact via WhatsApp"}
//               </button>
//             </form>

//             <div className="order-summary">
//               <h2>Order Summary</h2>
//               {cart.map((item) => (
//                 <div key={item.id} className="summary-item">
//                   <span className="summary-item-name">
//                     {item.name} × {item.quantity}
//                   </span>
//                   <span className="summary-item-price">
//                     LE {(item.price * item.quantity).toFixed(2)}
//                   </span>
//                 </div>
//               ))}
//               <div className="summary-shipping">
//                 <span>
//                   الشحن{" "}
//                   {shippingMethod === "express" && "(سريع - حسب الاتفاق)"}
//                 </span>
//                 <span>
//                   {shippingMethod === "regular"
//                     ? "100.00"
//                     : "حسب الاتفاق عبر واتساب"}
//                 </span>
//               </div>
//               <div className="summary-total">
//                 <span>الإجمالي</span>
//                 <span className="total-price">
//                   {shippingMethod === "regular"
//                     ? `LE ${orderTotal.toFixed(2)}`
//                     : `LE ${cartTotal.toFixed(2)} + الشحن`}
//                 </span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Checkout;




// src/pages/Checkout.jsx
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate, Link } from "react-router-dom";
import useCart from "../hooks/useCart.js";
import orderService from "../services/orderService.js";
import config from "../data/config.js";
import "./Checkout.css";

// All Egyptian Governorates and Cities Data
const governoratesData = {
  القاهرة: [
    "مدينة نصر",
    "مصر الجديدة",
    "الزمالك",
    "الدقي",
    "المعادي",
    "حلوان",
    "شبرا",
    "العباسية",
    "الوايلي",
    "جاردن سيتي",
    "وسط البلد",
    "بولاق",
    "باب الشعرية",
    "الأزبكية",
    "مصر القديمة",
    "الخليفة",
    "المطرية",
    "عين شمس",
    "الزيتون",
    "الحدائق القبليه",
    "حدائق حلوان",
    "مصر الجديده",
    "الساحل",
    "المرج",
    "السلام",
    "منشية ناصر",
    "دار السلام",
    "التبين",
    "15 مايو",
    "بدر",
    "القاهرة الجديدة",
    "الشروق",
  ],
  الإسكندرية: [
    "وسط البلد",
    "محرم بك",
    "سيدي جابر",
    "المنتزة",
    "العجمي",
    "الابراهيمية",
    "السيوف",
    "سموحة",
    "لوران",
    "ميامي",
    "باكوس",
    "جليم",
    "ستانلي",
    "سبورتنج",
    "العصافرة",
    "الدخيلة",
    "القبارى",
    "أنطونيادس",
    "كفر عبده",
    "سيدي بشر",
    "العامرية",
    "برج العرب",
    "المكس",
    "الكيلو 21",
  ],
  الجيزة: [
    "الدقي",
    "المهندسين",
    "الهرم",
    "فيصل",
    "أكتوبر",
    "الشيخ زايد",
    "البدرشين",
    "العجوزة",
    "بني سويف",
    "نزلة السمان",
    "أبو النمرس",
    "كفر غطاطي",
    "منشأة القناطر",
    "أوسيم",
    "أطفيح",
    "صفط اللبن",
    "حلوان",
    "وراق الحضر",
    "المنيب",
    "الطالبية",
    "بولاق الدكرور",
    "إمبابة",
    "الوراق",
    "ناهيا",
    "كرداسة",
    "السادس من أكتوبر",
    "حدائق أكتوبر",
    "بني يوسف",
    "الرماية",
  ],
  بورسعيد: [
    "بورسعيد",
    "الزهور",
    "العرب",
    "الضواحي",
    "المناخ",
    "حي الشرق",
    "حي الغرب",
    "حي الجنوب",
    "المناصرة",
    "التوفيقية",
  ],
  السويس: [
    "السويس",
    "الأربعين",
    "فيصل",
    "الجناين",
    "عتاقة",
    "ملاحة",
    "بورتوفيق",
    "حي السلام",
    "حي الزهور",
    "المتحف",
  ],
  دمياط: [
    "دمياط",
    "فارسكور",
    "كفر سعد",
    "دمياط الجديدة",
    "الزرقا",
    "رأس البر",
    "عزبة البرج",
    "السرو",
    "شطا",
    "بني السليم",
  ],
  الدقهلية: [
    "المنصورة",
    "طلخا",
    "ميت غمر",
    "أجا",
    "نبروه",
    "تمي الأمديد",
    "السنبلاوين",
    "دكرنس",
    "بلقاس",
    "منية النصر",
    "محلة دمنة",
    "شربين",
    "جمصة",
    "المطرية",
    "بني عبيد",
    "ميت سلسيل",
    "كفر البطيخ",
    "أولاد عفيف",
    "ميت يزيد",
  ],
  الشرقية: [
    "الزقازيق",
    "بلبيس",
    "ههيا",
    "أبو حماد",
    "مشتول السوق",
    "العاشر من رمضان",
    "منيا القمح",
    "أبو كبير",
    "فاقوس",
    "الإبراهيمية",
    "ديرب نجم",
    "كفر صقر",
    "الحسينية",
    "قرقيرة",
    "أولاد صقر",
    "صان الحجر",
    "ميت علوان",
    "أبو شقير",
    "القرين",
    "القنايات",
  ],
  القليوبية: [
    "بنها",
    "شبرا الخيمة",
    "قليوب",
    "الخانكة",
    "طوخ",
    "القناطر الخيرية",
    "كفر شكر",
    "الخصوص",
    "أبو زعبل",
    "العبور",
    "العباسية",
    "بهادة",
    "سندبيس",
    "جزيرة بلهاء",
  ],
  المنوفية: [
    "شبين الكوم",
    "بركة السبع",
    "قويسنا",
    "الباجور",
    "منوف",
    "أشمون",
    "السادات",
    "تلا",
    "الشهداء",
    "ميت خلف",
    "سدود",
    "أبو قرقاص",
    "ميت أبو الكوم",
  ],
  الغربية: [
    "طنطا",
    "المحلة الكبرى",
    "كفر الزيات",
    "زفتى",
    "بسيون",
    "قطور",
    "سمنود",
    "السنطة",
    "أبيار",
    "ميت غمر",
    "الرحمانية",
    "فزارة",
    "تلبنت",
    "أجهور الرمل",
  ],
  "كفر الشيخ": [
    "كفر الشيخ",
    "دسوق",
    "فوه",
    "مطوبس",
    "بلطيم",
    "سيدي سالم",
    "الرياض",
    "القلين",
    "الحامول",
    "بيلا",
    "برج البرلس",
    "مسير",
  ],
  الفيوم: [
    "الفيوم",
    "سنورس",
    "طامية",
    "إطسا",
    "يوسف الصديق",
    "أبو شوك",
    "عين السيلين",
    "الغازيات",
    "دمو",
    "شكشوك",
  ],
  "بني سويف": [
    "بني سويف",
    "ببا",
    "الفشن",
    "ناصر",
    "الواسطى",
    "إهناسيا",
    "سمسطا",
    "ميدوم",
    "أبو صير الملق",
    "العدوة",
  ],
  المنيا: [
    "المنيا",
    "ملوي",
    "بني مزار",
    "مطاي",
    "سمالوط",
    "أبو قرقاص",
    "دير مواس",
    "العدوة",
    "مغاغة",
    "الروضة",
    "برمشا",
    "تندة",
  ],
  أسيوط: [
    "أسيوط",
    "ديروط",
    "أبو تيج",
    "منفلوط",
    "القوصية",
    "البداري",
    "صدفا",
    "الغنايم",
    "ساحل سليم",
    "الفتح",
    "بني زيد",
    "مطوع",
  ],
  سوهاج: [
    "سوهاج",
    "أخميم",
    "البلينا",
    "المنشأة",
    "جرجا",
    "طهطا",
    "دار السلام",
    "المراغة",
    "ساقلتة",
    "طهطا الجديدة",
    "كوم غريب",
    "أولاد يحيى",
  ],
  قنا: [
    "قنا",
    "نجع حمادي",
    "دشنا",
    "الوقف",
    "فرشوط",
    "نقادة",
    "قفط",
    "أبو تشت",
    "الحراجية",
    "حجازة",
    "دنفيق",
  ],
  الأقصر: [
    "الأقصر",
    "البياضية",
    "الطود",
    "أرمنت",
    "إسنا",
    "القرنة",
    "البر الغربي",
    "البر الشرقي",
    "الدير",
    "الضبعية",
  ],
  أسوان: [
    "أسوان",
    "إدفو",
    "السباعية",
    "بدر",
    "الرديسية",
    "نصر النوبة",
    "كشكول",
    "المفازة",
    "أبو الريش",
    "كلابشة",
    "أرقين",
  ],
  "البحر الأحمر": [
    "الغردقة",
    "القصير",
    "مرسى علم",
    "رأس غارب",
    "سفاجا",
    "الشلاتين",
    "حلايب",
    "شلاتين",
    "أبو رماد",
    "المثلث",
  ],
  "الوادي الجديد": [
    "الخارجة",
    "الداخلة",
    "الفرافرة",
    "بلاط",
    "باريس",
    "منفلوط",
    "أبو منقار",
    "العوينات",
  ],
  "مرسى مطروح": [
    "مرسى مطروح",
    "الضبعة",
    "سيدي براني",
    "النجيلة",
    "السلوم",
    "فوكة",
    "جرجوب",
    "سيدي عبد الرحمن",
    "رأس الحكمة",
    "مرسى أبو غصون",
  ],
  "شمال سيناء": [
    "العريش",
    "رفح",
    "الشيخ زويد",
    "بئر العبد",
    "الحسنة",
    "نخل",
    "قسيمة",
    "الميدان",
    "الرابعة",
  ],
  "جنوب سيناء": [
    "الطور",
    "شرم الشيخ",
    "دهب",
    "نويبع",
    "طابا",
    "رأس سدر",
    "سانت كاترين",
    "أبو زنيمة",
    "أبو رديس",
    "سيدي سالم",
    "كلبيا",
  ],
  حلوان: [
    "حلوان",
    "15 مايو",
    "حدائق حلوان",
    "التبين",
    "معصرة",
    "عرب الوالدة",
    "طرة",
    "المعادن",
  ],
  أكتوبر: ["6 أكتوبر", "الشيخ زايد", "الريم", "أكتوبر الجديدة", "حدائق أكتوبر"],
  "العاصمة الإدارية": [
    "العاصمة الإدارية الجديدة",
    "الرحاب",
    "مدينتي",
    "القاهرة الجديدة",
    "التجمع الخامس",
    "التجمع الثالث",
  ],
};

// دالة بناء رسالة الواتساب بتفاصيل الأوردر
const buildWhatsAppMessage = ({
  formData,
  fullAddress,
  cart,
  cartTotal,
}) => {
  const itemsList = cart
    .map(
      (item, index) =>
        `${index + 1}. ${item.name}${item.flavor ? ` - ${item.flavor}` : ""} × ${item.quantity} = ${(item.price * item.quantity).toFixed(2)} ج.م`,
    )
    .join("\n");

  return ` *مرحبا اريد الطلب - شحن سريع (نفس اليوم)*

━━━━━━━━━━━━━━━━━━
👤 *بيانات العميل:*
• الاسم: ${formData.customerName}
• الموبايل: ${formData.phone}
• واتساب: ${formData.whatsapp || "-"}

📍 *العنوان:*
• المحافظة: ${formData.governorate}
• المدينة: ${formData.city}
• الشارع: ${formData.street}
• رقم العمارة: ${formData.buildingNumber}
• رقم الشقة: ${formData.apartmentNumber}
${formData.additionalDetails ? `• تفاصيل إضافية: ${formData.additionalDetails}` : ""}

━━━━━━━━━━━━━━━━━━
📦 *تفاصيل الأوردر:*
${itemsList}

━━━━━━━━━━━━━━━━━━
💰 *الإجمالي:*
• المنتجات: ${cartTotal.toFixed(2)} ج.م
• الشحن السريع: حسب الاتفاق
• *الإجمالي النهائي:* ${cartTotal.toFixed(2)} ج.م + الشحن

━━━━━━━━━━━━━━━━━━
⚡ *ملاحظة:* الشحن السريع في نفس اليوم، برجاء تحديد تكلفة الشحن بالاتفاق.`;
};

function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();

  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("regular"); // "regular" | "express"
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    whatsapp: "",
    governorate: "",
    city: "",
    street: "",
    buildingNumber: "",
    apartmentNumber: "",
    additionalDetails: "",
  });

  // Shipping fee calculation based on selected method
  const shippingFee = shippingMethod === "regular" ? 100 : 0;
  const orderTotal = cartTotal + shippingFee;

  // Extract governorates for the dropdown list
  const governorates = Object.keys(governoratesData).sort();

  if (cart.length === 0 && !showSuccessMessage) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">
          <h2>Your cart is empty</h2>
          <Link to="/" className="back-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // If governorate changes, reset the city
      ...(name === "governorate" && { city: "" }),
    }));
  };

  const handleShippingChange = (e) => {
    setShippingMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isProcessing) return;
    setIsProcessing(true);

    // Build full address from details
    const fullAddress = `${formData.street}, Building ${formData.buildingNumber}, Apartment ${formData.apartmentNumber}, ${formData.city}, ${formData.governorate}${
      formData.additionalDetails ? ` - ${formData.additionalDetails}` : ""
    }`;

    const order = {
      customerName: formData.customerName,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      address: fullAddress,
      addressDetails: {
        governorate: formData.governorate,
        city: formData.city,
        street: formData.street,
        buildingNumber: formData.buildingNumber,
        apartmentNumber: formData.apartmentNumber,
        additionalDetails: formData.additionalDetails,
      },
      items: cart.map((item) => ({
        productId: item.id,
        name: item.name,
        flavor: item.flavor,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal: cartTotal,
      shipping_method: shippingMethod,
      shipping_fee: shippingFee,
      total: orderTotal,
      status: "pending",
    };

    try {
      // Create the order first
      await orderService.createOrder(order);

      const orderDetails = cart
        .map(
          (item) => `
  <tr>
    <td>${item.name}</td>
    <td>${item.flavor || "-"}</td>
    <td>${item.quantity}</td>
    <td>LE ${(item.price * item.quantity).toFixed(2)}</td>
  </tr>
`,
        )
        .join("");

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          customer_name: formData.customerName,
          phone: formData.phone,
          whatsapp: formData.whatsapp || "-",
          governorate: formData.governorate,
          address: fullAddress,
          order_details: `
      <table style="width:100%; border-collapse:collapse;">
        <thead>
          <tr>
            <th>Product</th>
            <th>Flavor</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${orderDetails}
        </tbody>
      </table>
    `,
          shipping_method:
            shippingMethod === "regular"
              ? "شحن عادي بشركة شحن"
              : "شحن سريع في نفس اليوم (حسب الاتفاق عبر واتساب)",
          subtotal: cartTotal.toFixed(2),
          shipping_fee:
            shippingMethod === "regular"
              ? shippingFee.toFixed(2)
              : "حسب الاتفاق عبر واتساب",
          total:
            shippingMethod === "regular"
              ? orderTotal.toFixed(2)
              : `${cartTotal.toFixed(2)} + رسوم الشحن السريع (حسب الاتفاق)`,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      // Show success message
      setShowSuccessMessage(true);

      // Clear cart after showing success message
      clearCart();

      // ⚡ لو الشحن سريع: حوّلي العميل لواتساب مع تفاصيل الأوردر
      if (shippingMethod === "express") {
        // ✅ رقم الواتساب من config (بنشيل الـ + والرموز غير الرقمية)
        const storeWhatsApp = config.whatsapp.number.replace(/\D/g, "");

        const whatsappMessage = buildWhatsAppMessage({
          formData,
          fullAddress,
          cart,
          cartTotal,
        });

        const whatsappURL = `https://wa.me/${storeWhatsApp}?text=${encodeURIComponent(
          whatsappMessage,
        )}`;

        // نفتح واتساب في تاب جديد مع fallback لو المتصفح منع
        const newWindow = window.open(whatsappURL, "_blank");
        if (!newWindow) {
          window.location.href = whatsappURL;
        }

        // Navigate after 6 seconds
        setTimeout(() => {
          navigate("/");
        }, 6000);
      } else {
        // Navigate after 6 seconds for regular shipping
        setTimeout(() => {
          navigate("/");
        }, 6000);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setIsProcessing(false);
      // You might want to show an error message here
    }
  };

  // Get cities list based on selected governorate
  const cities = formData.governorate
    ? governoratesData[formData.governorate]
    : [];

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>

        <h1 className="checkout-title">Checkout</h1>

        {showSuccessMessage ? (
          <div className="success-message">
            <div className="success-content">
              <div className="success-icon">✓</div>
              <h2>Thank You for Your Order! 🎉</h2>
              <p>Your order has been confirmed successfully.</p>
              {shippingMethod === "express" && (
                <p className="success-subtext" style={{ color: "#c9a227" }}>
                  ⚡ سيتم تحويلك إلى واتساب لتأكيد تفاصيل الشحن السريع.
                </p>
              )}
              <p className="success-subtext">
                You will be redirected to the home page shortly...
              </p>
            </div>
          </div>
        ) : (
          <div className="checkout-content">
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="customerName">Full Name</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="whatsapp">
                  WhatsApp Number
                  {shippingMethod === "express" && (
                    <span style={{ color: "#c9a227", marginLeft: "6px" }}>
                      (مطلوب للشحن السريع)
                    </span>
                  )}
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  required={shippingMethod === "express"}
                  placeholder={
                    shippingMethod === "express"
                      ? "رقم الواتساب مطلوب للشحن السريع"
                      : "Enter your WhatsApp number (optional)"
                  }
                />
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="governorate">Governorate</label>
                  <select
                    id="governorate"
                    name="governorate"
                    value={formData.governorate}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Governorate</option>
                    {governorates.map((gov) => (
                      <option key={gov} value={gov}>
                        {gov}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group half">
                  <label htmlFor="city">City</label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    disabled={!formData.governorate}
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="street">Street</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  placeholder="Enter street name"
                />
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="buildingNumber">Building Number</label>
                  <input
                    type="text"
                    id="buildingNumber"
                    name="buildingNumber"
                    value={formData.buildingNumber}
                    onChange={handleInputChange}
                    placeholder="Building number"
                  />
                </div>

                <div className="form-group half">
                  <label htmlFor="apartmentNumber">Apartment Number</label>
                  <input
                    type="text"
                    id="apartmentNumber"
                    name="apartmentNumber"
                    value={formData.apartmentNumber}
                    onChange={handleInputChange}
                    placeholder="Apartment number"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="additionalDetails">
                  Additional Address Details
                </label>
                <textarea
                  id="additionalDetails"
                  name="additionalDetails"
                  value={formData.additionalDetails}
                  onChange={handleInputChange}
                  placeholder="e.g., Landmark, floor number, delivery instructions, etc."
                  rows="2"
                />
              </div>

              {/* Shipping Method Selection */}
              <div className="form-group">
                <label>طريقة الشحن</label>

                <div className="shipping-options">
                  <label
                    className={`shipping-option ${
                      shippingMethod === "regular" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="regular"
                      checked={shippingMethod === "regular"}
                      onChange={handleShippingChange}
                    />
                    <div className="shipping-option-content">
                      <span className="shipping-option-title">
                        🚚 شحن بشركة شحن
                      </span>
                      <span className="shipping-option-desc">
                        التوصيل خلال 2-5 أيام عمل
                      </span>
                      <span className="shipping-option-price">100 جنيه</span>
                    </div>
                  </label>

                  <label
                    className={`shipping-option ${
                      shippingMethod === "express" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={shippingMethod === "express"}
                      onChange={handleShippingChange}
                    />
                    <div className="shipping-option-content">
                      <span className="shipping-option-title">
                        ⚡ شحن سريع (نفس اليوم)
                      </span>
                      <span className="shipping-option-desc">
                        سيتم تحديد سعر الشحن بالاتفاق عبر واتساب
                      </span>
                      <span className="shipping-option-price">
                        حسب الاتفاق
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="place-order-btn"
                disabled={isProcessing}
              >
                {isProcessing
                  ? "Processing..."
                  : shippingMethod === "regular"
                    ? "Place Order - 100 EGP Shipping"
                    : "Place Order - Express Shipping - Contact via WhatsApp"}
              </button>
            </form>

            <div className="order-summary">
              <h2>Order Summary</h2>
              {cart.map((item) => (
                <div key={item.id} className="summary-item">
                  <span className="summary-item-name">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="summary-item-price">
                    LE {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="summary-shipping">
                <span>
                  الشحن{" "}
                  {shippingMethod === "express" && "(سريع - حسب الاتفاق)"}
                </span>
                <span>
                  {shippingMethod === "regular"
                    ? "100.00"
                    : "حسب الاتفاق عبر واتساب"}
                </span>
              </div>
              <div className="summary-total">
                <span>الإجمالي</span>
                <span className="total-price">
                  {shippingMethod === "regular"
                    ? `LE ${orderTotal.toFixed(2)}`
                    : `LE ${cartTotal.toFixed(2)} + الشحن`}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;