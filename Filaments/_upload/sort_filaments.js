const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\DearTanker\\OneDrive\\文档\\GitHub\\FFI\\Filaments\\_upload\\extracted';
const targetBaseDir = 'C:\\Users\\DearTanker\\OneDrive\\文档\\GitHub\\FFI\\Filaments';

if (!fs.existsSync(sourceDir)) {
    console.error('Source directory does not exist:', sourceDir);
    process.exit(1);
}

const files = fs.readdirSync(sourceDir);

files.forEach(file => {
    if (!file.endsWith('.json')) return;

    // Pattern: Vendor Type Series @...
    // We assume the filename structure is: [Vendor] [Type] [Series] @...
    // Example: "Aliz PETG Basic @Bambu Lab P1S 0.4 nozzle.json"
    
    // Split by spaces
    const parts = file.split(' ');
    
    if (parts.length < 3) {
        console.warn(`Skipping ${file}: Filename too short to parse pattern`);
        return;
    }

    const vendor = parts[0];
    const type = parts[1];
    
    // Find the part with '@' to know where the series ends
    let atIndex = -1;
    for (let i = 2; i < parts.length; i++) {
        if (parts[i].includes('@')) {
            atIndex = i;
            break;
        }
    }
    
    let series = '';
    if (atIndex === -1) {
        // No '@' found? Use everything after Type?
        // Let's assume the series is the rest
        series = parts.slice(2).join(' ').replace('.json', '');
    } else {
        // Series is between Type and @
        // Check if the word with @ starts with @ or contains it
        if (parts[atIndex].startsWith('@')) {
            series = parts.slice(2, atIndex).join(' ');
        } else {
            // "Series @Machine" -> parts[atIndex] is "@Machine"
            // or "Series@Machine" -> parts[atIndex] contains @
            const splitAt = parts[atIndex].split('@');
            if (splitAt[0].length > 0) {
                 series = [...parts.slice(2, atIndex), splitAt[0]].join(' ');
            } else {
                 series = parts.slice(2, atIndex).join(' ');
            }
        }
    }
    
    // Clean up series
    series = series.trim();
    if (!series) series = 'Basic'; // Default fallback

    const targetDir = path.join(targetBaseDir, vendor, type, series);
    
    try {
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        
        const targetPath = path.join(targetDir, file);
        
        // Handle potential naming conflicts? (Overwrite or skip? User said "upload", implies new/update. Overwrite is usually fine)
        if (fs.existsSync(targetPath)) {
            console.log(`Overwriting existing file: ${targetPath}`);
            fs.unlinkSync(targetPath);
        }
        
        fs.renameSync(path.join(sourceDir, file), targetPath);
        console.log(`Moved ${file} -> ${vendor}/${type}/${series}/`);
    } catch (err) {
        console.error(`Failed to move ${file}:`, err);
    }
});
