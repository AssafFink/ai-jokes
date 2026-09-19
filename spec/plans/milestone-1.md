# Milestone 1 — Walking Skeleton (תוכנית מפורטת)

## מטרה
האפליקציה רצה מקצה לקצה עם תוכן מינימלי: לקוח React (Vite+TS) עם תיבת טקסט וכפתור, שקורא ל-`POST /api/joke` בשרת Express (TS) שמחזיר בדיחה קבועה (stub), ומציג אותה. dev proxy מחבר בין השניים. זה מוכיח שהשרשרת מחוברת לפני הוספת OpenAI.

## מבנה קבצים ליצירה
```
Jokes/
  package.json            # root: סקריפט dev להרצת client+server יחד (concurrently)
  .gitignore
  server/
    package.json          # express, tsx (dev), typescript
    tsconfig.json
    src/index.ts          # Express app, /api/joke, בפרודקשן יגיש client/dist (מוכן להמשך)
    src/routes/joke.ts     # POST /api/joke -> { joke } (stub ב-M1)
  client/
    package.json          # react, react-dom, vite, @vitejs/plugin-react, typescript
    tsconfig.json
    tsconfig.node.json
    vite.config.ts        # plugin-react + proxy /api -> http://localhost:3001
    index.html
    src/main.tsx
    src/App.tsx           # תיבה + כפתור + הצגת בדיחה
    src/api.ts            # fetchJoke(topic) -> POST /api/joke
    src/index.css         # עיצוב מינימלי בסיסי
```

## החלטות מימוש
- **פורטים:** שרת על `3001` (או `process.env.PORT`), Vite dev על `5173` עם proxy של `/api` ל-`http://localhost:3001`.
- **שרת:** Express עם `express.json()`. Route `POST /api/joke` מקבל `{ topic?: string }` ומחזיר `{ joke: string }`. ב-M1 הבדיחה קבועה (מזכירה את הנושא אם קיים, כדי לראות שה-body עובר). בלוק שמגיש `client/dist` בפרודקשן יתווסף כבר עכשיו (מאחורי בדיקת `NODE_ENV`/קיום התיקייה) כדי לבסס את מבנה השירות-היחיד.
- **dev tooling:** `tsx watch` להרצת השרת ב-TS ללא build; `concurrently` בשורש כדי להריץ client+server בפקודה אחת.
- **לקוח:** רכיב `App` עם state לנושא, לבדיחה, ולמצב טעינה בסיסי; קריאה ל-`fetchJoke`. עיצוב מלא יגיע ב-M3 — כאן רק בסיס נקי.
- **הערות בקוד באנגלית בלבד** (לפי CLAUDE.md).

## פקודות
- התקנה: `npm install` בשורש (workspaces) — או בכל תיקייה.
- הרצה מקומית: `npm run dev` בשורש (מריץ server ב-tsx watch + client ב-vite).

## בדיקת קבלה (מוכן כאשר)
- `npm run dev` מרים את שני התהליכים ללא שגיאות.
- פתיחת `http://localhost:5173` מציגה תיבה + כפתור.
- לחיצה על הכפתור מציגה את בדיחת ה-stub (עם/בלי נושא) — כלומר ה-proxy וה-Route עובדים.
