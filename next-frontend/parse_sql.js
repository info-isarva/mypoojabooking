const fs = require('fs');
const path = require('path');

const sqlPath = path.join(__dirname, 'calendar_conversion.sql');
const jsonPath = path.join(__dirname, 'src', 'data', 'panchanga.json');

const sqlContent = fs.readFileSync(sqlPath, 'utf8');

// Regex to capture values in: VALUES (...) or simply lines starting with (
const lines = sqlContent.split('\n');
const records = [];

lines.forEach(line => {
  const trimmed = line.trim();
  if (trimmed.startsWith('(') && (trimmed.endsWith('),') || trimmed.endsWith(');') || trimmed.endsWith(')'))) {
    // Extract everything between the first ( and the last )
    const content = trimmed.substring(1, trimmed.lastIndexOf(')'));
    
    // Parse SQL values. Standard CSV parser style, but handling NULLs and quotes.
    const values = [];
    let current = '';
    let inQuotes = false;
    let quoteChar = '';
    
    for (let i = 0; i < content.length; i++) {
      const char = content[i];
      if (inQuotes) {
        if (char === quoteChar) {
          if (content[i + 1] === quoteChar) {
            // Escaped quote
            current += quoteChar;
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          current += char;
        }
      } else {
        if (char === "'" || char === '"') {
          inQuotes = true;
          quoteChar = char;
        } else if (char === ',') {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
    }
    values.push(current.trim());
    
    // We only care about the dumped columns from index mapping
    // columns: id(0), calendar_code(1), eng_date(2), eng_day(3), ayana(4), samvatsara(5), ritu(6), chandramana_masa(7), chandramana_paksha(8), chandramana_tithi(9), sowramana_masa(10), sowramana_nakshatra(11), sankranthi(12), festivals(13)
    if (values.length >= 14) {
      records.push({
        id: parseInt(values[0], 10),
        eng_date: values[2],
        eng_day: values[3],
        ayana: values[4] === 'NULL' ? null : values[4],
        samvatsara: values[5] === 'NULL' ? null : values[5],
        ritu: values[6] === 'NULL' ? null : values[6],
        chandramana_masa: values[7] === 'NULL' ? '' : values[7].trim(),
        chandramana_paksha: values[8] === 'NULL' ? '' : values[8].trim(),
        chandramana_tithi: values[9] === 'NULL' ? '' : values[9].trim(),
        sowramana_masa: values[10] === 'NULL' ? '' : values[10].trim(),
        sowramana_nakshatra: values[11] === 'NULL' ? '' : values[11].trim(),
        sankranthi: values[12] === 'NULL' ? '' : values[12].trim(),
        festivals: values[13] === 'NULL' ? '' : values[13].trim(),
      });
    }
  }
});

fs.writeFileSync(jsonPath, JSON.stringify(records, null, 2), 'utf8');
console.log(`Successfully parsed ${records.length} records into ${jsonPath}`);
