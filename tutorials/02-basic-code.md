
# تقسيمة الكود لـ Socket.io

أول حاجة خليني اعملك تقسيمة للكود اللي هنكتبه علشان تكون عارف احنا هنبدا منين وننتهي منين.

## أول خطوة: استدعاء الـ Packages اللي هنحتاجها

```js
import express from 'express'
import http from 'http'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { Server } from 'socket.io'
```

## تاني خطوة: إعداد الـ Instances

خليني أفهمك الأول، الـ Instance هو ببساطة نسخة من الـ class أو الـ function اللي بنعملها.  

المهم، نبدأ نكتب الكود اللي المفروض نعمله علشان نخلص الـ Instances:

```js
const app = express();
const server = http.createServer(app);
const io = new Server(server);
```

وكده نكون خلصنا من إعداد الـ Instances.

## تالت خطوة: إنشاء ملف `index.html`

هنعمل ملف `index.html` علشان نعرض عليه اللي هنقوم بيه في السيرفر. الملف هيكون عادي وفاضي في البداية.

## رابع خطوة: ربط ملف الـ HTML بالسيرفر

دلوقتي، نربط ملف الـ HTML بالسيرفر باستخدام الكود ده:

```js
const __dirname = dirname(fileURLToPath(import.meta.url));
app.get("/", (req, res) => res.sendFile(join(__dirname, "index.html")));
```

## خامس خطوة: فتح الاتصال مع السيرفر

قبل ما نكمل على اتصال الـ Socket.io، هنبدأ بتشغيل السيرفر باستخدام الكود ده:

```js
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

---


# فتح الاتصال وغلق الاتصال مع Socket.io

في الخطوة دي هنشرح عملية فتح الاتصال وغلق الاتصال مع Socket.io، ودي خطوة مهمة لازم تتعامل معاها بشكل منفصل علشان كل حاجة تبقى واضحة ومفهومة.

---

لو مش فاهم تابع وان شاء الله بعد ما تقرا وتفتح المشاريع التطبيقه هتلاقي الموضوع واضح قدامك علطول ان شاء الله