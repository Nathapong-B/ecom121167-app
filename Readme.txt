https://supabase.com/
Supabase เป็นบริการที่ช่วยให้เราสามารถสร้างแอปพลิเคชันที่มีระบบฐานข้อมูลแบบเรียลไทม์ ระบบจัดการ user , Storage เป็นโอเพ่นซอร์ส (open-source) และมีฟีเจอร์ที่คล้ายกับ Firebase แต่ใช้ PostgreSQL ซึ่งเป็นระบบฐานข้อมูล
-------- Deploy DB to Supabase -----
1. ที่ Supabase เมื่อเข้าสู่ระบบแล้ว คลิกเลือกหรือสร้างโปรเจค จากนั้นคลิก connect จะเห็นโค้ด Transaction pooler และ Session pooler
2. .env
        DATABASE_URL = "" // (ใช้โค้ด Transaction pooler จาก Supabase)
        DIRECT_URL = "" // (ใช้โค้ด Session pooler จาก Supabase)
3. schema.prisma
        datasource db {
        provider  = "postgresql"
        url       = env("DATABASE_URL")
        directUrl = env("DIRECT_URL")
        }

// ควรเพิ่มโค้ดด้านล่างนี้ด้วย ในระหว่างการ dev
DATABASE_URL : "?pgbouncer=true&connection_limit=1"

4. npx prisma db push


---//--- Server --//---
1. create vercel.json

{
    "version": 2,
    "name": "popdev",
    "builds": [
      {
        "src": "server.js",
        "use": "@vercel/node"
      }
    ],
    "routes": [
      {
        "src": "/(.*)",
        "dest": "server.js",
        "headers": {
          "Access-Control-Allow-Origin": "*"
        }
      }
    ]
  }

2. package.json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server",
    "postinstall": "prisma generate"
  },
  
3. Push ขึ้น github

4. add project to vercel
4.1 ที่ช่อง in build command พิมพ์ npx prisma generate
4.2 add env ที่ต้องใช้
/* Enjoy */

---//--- Client ---//---
1. create vercel.json

{
    "routes":[
        {
            "src":"/[^.]+",
            "dest":"/"
        }
    ]
}

2. Push ขึ้น github

5. add project to vercel 
/* Enjoy */