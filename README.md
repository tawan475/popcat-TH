# เปิดใน Chrome
1. กด F12
2. ไปที่ Console
3. คัดลอก Code นี่ไปวาง
```
document.dispatchEvent(new KeyboardEvent('keydown', {'key':'a'}));
document.dispatchEvent(new KeyboardEvent('keyup', {'key':'a'}));
document.getElementById('app').__vue__.accumulator = 800;

setInterval(() => {
    document.getElementById('app').__vue__.bot = !1;
    document.getElementById('app').__vue__.sequential_max_pops = 0;
    document.getElementById('app').__vue__.accumulator = 800;
    document.dispatchEvent(new KeyboardEvent('keydown', {'key':'a'}));
    document.dispatchEvent(new KeyboardEvent('keyup', {'key':'a'}));
}, 15 * 1000);
// https://github.com/tawan475/popcat-TH
```
4. กด Enter
5. เปิดค้างไว้

**เรียบร้อยแล้วครับ แค่นี่คุณก็ได้ช่วยชาติแล้ว**


# วิธีติดตั้ง 
**ใช้ ram น้อยกว่า เปิดใน Chrome**

**สามารถรันบนเซิร์ฟเวอร์ได้**

### Windows
### Video สอนลง https://youtu.be/UZptdL5jHEM
1. ไปโหลด Node ที่ https://nodejs.org/en/download/
2. ติดตั้งให้เรียบร้อย
4. เปิด INSTALL.bat
5. เรื่มโดนการเปิดไฟล์ `START.bat`

### Linux/MacOS
1. install node
2. npm install
3. npm start
