import fs from 'fs';
import path from 'path';

export function getTodayPanchanga() {
  try {
    const today = new Date();
    
    // Format today as MM/DD/YYYY in Indian Standard Time (IST)
    const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const [{ value: month },,{ value: day },,{ value: year }] = formatter.formatToParts(today);
    const todayFormatted = `${month}/${day}/${year}`;
    
    const filePath = path.join(process.cwd(), 'src', 'data', 'panchanga.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const panchangaList = JSON.parse(rawData);
    
    let record = panchangaList.find(d => d.eng_date === todayFormatted);
    if (!record) {
      const localMonth = String(today.getMonth() + 1).padStart(2, '0');
      const localDay = String(today.getDate()).padStart(2, '0');
      const localYear = today.getFullYear();
      const localFormatted = `${localMonth}/${localDay}/${localYear}`;
      record = panchangaList.find(d => d.eng_date === localFormatted);
    }
    
    if (!record) {
      // June 19, 2026 is the mock "today" for user local context
      record = panchangaList.find(d => d.eng_date === '06/19/2026') || panchangaList[0];
    }

    // Format human readable date
    let formattedDate = record.eng_date;
    const dateParts = record.eng_date.split('/');
    if (dateParts.length === 3) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthIdx = parseInt(dateParts[0], 10) - 1;
      formattedDate = `${record.eng_day ? record.eng_day + ', ' : ''}${months[monthIdx]} ${parseInt(dateParts[1], 10)}, ${dateParts[2]}`;
    }

    // [chandramana_masa]-[chandramana_paksha]-[chandramana_tithi]
    const cleanMasa = record.chandramana_masa.trim();
    const cleanPaksha = record.chandramana_paksha.trim();
    const cleanTithi = record.chandramana_tithi.trim();
    const tithiCombined = [cleanMasa, cleanPaksha, cleanTithi].filter(Boolean).join('-');

    // [sowramana_masa]-[sowramana_nakshatra]
    const cleanSowMasa = record.sowramana_masa.trim();
    const cleanNakshatra = record.sowramana_nakshatra.trim();
    const sowramanaCombined = [cleanSowMasa, cleanNakshatra].filter(Boolean).join('-');

    return {
      date: formattedDate,
      tithi: tithiCombined || '-',
      sowramanaMasaNakshatra: sowramanaCombined || '-',
      samvatsara: record.samvatsara || '-',
      ayana: record.ayana || '-'
    };
  } catch (error) {
    console.error('Error reading local panchanga:', error);
    return null;
  }
}
