# عملية قطع الاتصال مع Socket.io

عشان نعمل عملية **قطع الاتصال** في **Socket.io**، هنحتاج نستخدم الـ `disconnect` event.

### من جانب السيرفر:
في البداية، بنحتاج نضيف الـ `callback` الخاص بالاتصال (connection) لنتعامل مع قطع الاتصال. لما الـ client يقطع الاتصال، هنستخدم الميثود `disconnect` على الـ `client` اللي كان متصل.

مثال للكود:

```js
io.on("connection", (client) => {
  console.log("A user connected");
  // عند قطع الاتصال من العميل
  client.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
```

في الكود ده، الـ `client.on("disconnect")` بيهندل الحدث ويطبع رسالة في الـ console لما العميل يقطع الاتصال.

### ملاحظات:
- لو دخلت على الموقع لأول مرة، هتظهر رسالة "A user connected".
- لما تعمل **refresh** هيتم قطع الاتصال وفتح اتصال جديد.
- **السيرفر الأساسي** مش هيتأثر. اللي بيفصل هو السيرفر الخاص بـ `socket.io` للعميل المتصل فقط.

### من جانب العميل (Client-Side):
في **الـ client**، هنقدر نستخدم الكود التالي لالتقاط الحدث لما يتقطع الاتصال:

```js
socket.on("disconnect", () => {
  console.log("Disconnected from client");
});
```

### التحكم في الاتصال:
ممكن كمان نضيف **أزرار** للتحكم في الاتصال من خلال العميل:

- **تشغيل السيرفر**: `socket.connect()`
- **إيقاف السيرفر**: `socket.disconnect()`

كده نكون انتهينا من شرح عملية الاتصال والقطع في **Socket.io**. لو مش فاهم حاجة، تابع الخطوات كلها وإن شاء الله هتكون الأمور واضحة.
