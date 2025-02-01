import { NextResponse } from "next/server"

export async function GET() {
    try {
        
        return NextResponse.json({facility: [
            'การรักษาความปลอดภัยตลอด 24 ชั่วโมง', 'บริการนวด', 'Wifi', 'ร้านอาหาร', 'พื้นที่เลานจ์ / พื้นที่ดูทีวีแบบใช้ร่วมกัน', 'เครื่องปรับอากาศ', 'การพายเรือแคนูนอกที่พัก', 'บาร์ / เลานจ์', 'อาคารจอดรถ', 'ร้านกาแฟ', 'โบว์ลิ่งนอกที่พัก', 'มีเก้าอี้สูงสำหรับเด็ก', 'เรือ', 'บริการดูแลเด็กเล็ก', 'มีห้องที่มีประตูเชื่อมต่อกัน', 'เคเบิลทีวี / ทีวีดาวเทียม', 'ที่จอดรถฟรี', 'บริการรถรับ-ส่งสนามบิน', 'เครือข่ายโทรทัศน์สำหรับเด็ก', 'ทัวร์เดินเที่ยว', 'ห้องพักแบบเก็บเสียง', 'พื้นที่นั่งเล่น', 'ดาดฟ้าสำหรับอาบแดด', 'พื้นที่เด็กเล่นภายในร่ม', 'แผนกต้อนรับส่วนหน้าให้บริการตลอด 24 ชั่วโมง', 'แบดมินตัน', 'ทัวร์ปั่นจักรยาน', 'สระว่ายน้ำบนดาดฟ้า', 'คาราโอเกะ', 'เก้าอี้อาบแดด / เก้าอี้ชายหาด', 'ครัวขนาดเล็ก', 'เตียงยาวเสริม', 'อุปกรณ์ทำบาร์บีคิว', 'อ่างน้ำวน', 'ม่านกันแสง', 'เฉพาะผู้ใหญ่เท่านั้น', 'ความบันเทิงยามค่ำคืน', 'ชั้นเรียนโยคะ', 'บิลเลียด', 'บริการซักรีด', 'สิ่งอำนวยความสะดวกสำหรับจัดประชุม', 'ที่จอดรถสาธารณะใกล้เคียงแบบเสียค่าบริการ', 'คอนเซียร์จ', 'สระว่ายน้ำไร้ขอบ', 'บาร์ริมสระว่ายน้ำ', 'โต๊ะทำงาน', 'บริการนวดทั่วตัว', 'ร่มกันแดด', 'ปลอดภัย', 'บริการนวดเท้า', 'สิ่งอำนวยความสะดวกในห้องวีไอพี', 'เทเบิลเทนนิส', 'มีบริการอาหารเช้า', 'การดำน้ำตื้น', 'สปา', 'ชายหาด', 'ร้านสะดวกซื้อ', 'อินเตอร์เน็ตความเร็วสูง (WiFi) ฟรี', 'มีบริการจักรยาน', 'รถเข็นเด็ก', 'โทรศัพท์', 'ไดร์เป่าผม', 'ราวแขวนเสื้อผ้า', 'ชายหาดส่วนตัว', 'โซฟาเบด', 'บอดี้แรพ', 'กาแฟสําเร็จรูปฟรี', 'ที่จอดรถสาธารณะฟรีใกล้เคียง', 'สควอช', 'บอร์ดเกม / เกมปริศนา', 'เตาผิง', 'การพายเรือแคนู', 'แอโรบิก', 'มินิบาร์', 'ระเบียง', 'บริการแท็กซี่', 'สระว่ายน้ำ', 'ห้องอาบน้ำแบบฝักบัว', 'ระเบียงส่วนตัว', 'เครื่องกรองอากาศ', 'ที่จอดรถ', 'บริการเช็คอิน 24 ชั่วโมง', 'ห้องพักปลอดสารก่อภูมิแพ้', 'บริการรถรับส่งสนามบินฟรี', 'เครื่องชงกาแฟ / ชา', 'พนักงานดูแลด้านความบันเทิง', 'การยิงธนู', 'อินเทอร์เน็ตฟรี', 'สไลเดอร์น้ำ', 'ไมโครเวฟ', 'บริการรับจอดรถ', 'ทีวีจอแบน', 'กิจกรรมสำหรับเด็ก (เป็นมิตรกับเด็กและครอบครัว)', 'การเดินเขา', 'สวนน้ำ', 'เสื้อคลุมอาบน้ำ', 
            'บริการรถรับ-ส่ง', 'สระว่ายน้ำระบบน้ำเกลือ', 'เฉลียงรับแดด', 'สระว่ายน้ำเห็นวิว', 'พื้นที่เก็บกระเป๋า', 'ที่จอดรถส่วนตัวฟรีในบริเวณใกล้เคียง', 'ผ้าขนหนูสระว่ายน้ำ / ชายหาด', 'ห้องเล่นเกม', 'อนุญาตให้นำสัตว์เลี้ยงเข้ามาได้ (เป็นมิตรกับสุนัขและสัตว์เลี้ยง)', 'พื้นที่รับประทานอาหาร', 'สนามเทนนิส', 'เครื่องใช้สำหรับอาบน้ำฟรี', 'สระว่ายน้ำสำหรับเด็ก', 'หนังสือ, ดีวีดี, ดนตรีสำหรับเด็ก', 'สนามเด็กเล่น', 'อุปกรณ์เครื่องเล่นกลางแจ้งสำหรับเด็ก', 'ฟิตเนสเซนเตอร์พร้อมห้องออกกำลังกาย', 'ที่จอดรถริมถนน', 'เครื่องถ่ายเอกสาร / แฟกซ์ในศูนย์ธุรกิจ', 'ห้องประชุม', 'โรงแรมปลอดบุหรี่', 'เฉลียงบนดาดฟ้า', 'บริการซักแห้ง', 'อาหารเช้าฟรี', 'โถชำระล้าง', 'โซฟา', 'ตู้เสื้อผ้า / ตู้', 'ห้องน้ำเพิ่มเติม', 'การดำน้ำ', 'น้ำบรรจุขวด', 'อ่างอาบน้ำ / ฝักบัวอาบน้ำ', 'สโมสรสำหรับเด็ก', 'บริการแลกเปลี่ยนเงินตราต่างประเทศ', 'บริการเช่ารถ', 'ตู้เย็น', 'เด็กเข้าพักฟรี', 'ห้องจัดเลี้ยง', 'บริการให้เช่าจักรยาน', 'ไนท์คลับ / ดีเจ', 'เฟอร์นิเจอร์กลางแจ้ง', 'กาต้มน้ำไฟฟ้า', 'บริการรถรับส่งฟรีหรือแท็กซี่', 'สนามกอล์ฟ', 'ศูนย์บริการธุรกิจพร้อมบริการอินเทอร์เน็ต', 'บริการรูมเซอร์วิส', 'บริการทำความสะอาด', 'ผ้าห่มไฟฟ้า', 'ห้องล็อกเกอร์ของฟิตเนส / สปา', 'ร้านทำผม', 'การเช็คอิน / เช็คเอาต์แบบเร่งด่วน'
            ]});
    } catch(error) {
        return NextResponse.json({ message: `An error occured while insert data attraction ${error}`}, {status: 500})
    }
}