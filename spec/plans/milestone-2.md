# Milestone 2 — יצירת בדיחה אמיתית (תוכנית מפורטת)

## מטרה
להחליף את בדיחת ה-stub בקריאה אמיתית ל-OpenAI (`gpt-4o-mini`). נושא → בדיחה על הנושא, בשפת הנושא; ללא נושא → נושא רנדומלי בעברית. טיפול בשגיאות בסיסי (מפתח חסר / כשל קריאה).

## קבצים ליצירה / לשינוי
- **`server/src/openai.ts` (חדש):** יצירת client של OpenAI (lazy), בניית הפרומפט (system + user), ופונקציה `generateJoke(topic)` שמחזירה מחרוזת בדיחה.
- **`server/src/routes/joke.ts` (שינוי):** קריאה ל-`generateJoke` במקום ה-stub, עם try/catch שמחזיר סטטוס שגיאה והודעה קצרה.
- **`server/src/index.ts` (שינוי):** טעינת משתני סביבה מ-`.env` (`import "dotenv/config"`).
- **`server/.env.example` (חדש):** תבנית עם `OPENAI_API_KEY=` (ה-`.env` האמיתי כבר ב-`.gitignore`).
- **`server/package.json` (שינוי):** הוספת התלויות `openai` ו-`dotenv`.

## החלטות מימוש
- **מודל:** `gpt-4o-mini`.
- **פרומפט (לוגיקת שפה/נושא בפרומפט, לא בקוד):**
  - System: "You are a witty comedian. Reply with exactly one short, clean, funny joke. No preamble, no explanation, no quotation marks."
  - עם נושא: "Write the joke about: <topic>. Write it in the SAME language as the topic."
  - בלי נושא: "Pick a random everyday topic and write the joke in Hebrew."
- **client של OpenAI נוצר lazy** (בקריאה הראשונה), כדי שהשרת יעלה גם ללא מפתח וכדי לזהות מפתח חסר בזמן הבקשה.
- **טיפול בשגיאות:**
  - מפתח חסר (`OPENAI_API_KEY` ריק) → 500 עם `{ error: "..." }`.
  - כשל בקריאה ל-OpenAI / תשובה ריקה → 502 עם `{ error: "..." }`.
  - הלקוח כבר מציג הודעת שגיאה ידידותית בעברית על כל תגובה שאינה ok.
- **סוד:** המפתח נקרא מ-`process.env.OPENAI_API_KEY` בלבד; לא נכתב לקוד ולא ל-repo.
- **הערות בקוד באנגלית בלבד.**

## דרוש מהמפתח (עצירה)
יצירת `server/.env` עם `OPENAI_API_KEY=<המפתח שלך>` — המפתח מודבק ע"י המפתח עצמו, Claude לא רואה אותו. חשבון OpenAI API בתשלום נדרש (נפרד מ-ChatGPT Plus).

## בדיקת קבלה (מוכן כאשר)
- לאחר הצבת המפתח ב-`server/.env` והרצת `npm run dev`:
  - לחיצה עם נושא מחזירה בדיחה אמיתית על הנושא, בשפת הנושא.
  - לחיצה ללא נושא מחזירה בדיחה רנדומלית בעברית.
  - ללא מפתח / כשל → הודעת שגיאה ידידותית בלקוח, ללא קריסה.
