const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
let fixCount = 1;
let reportRows = [];

// Specific replacement rules
const rules = [
  // 1. AVAILABLE FOR WORK badge text (HeroSection)
  {
    test: (file, line) => file.endsWith('HeroSection.tsx') && line.includes('tr.hero_badge'),
    apply: (line) => line.replace(/rgba\(255,\s*255,\s*255,\s*0\.[2-4]\d*\)/g, 'rgba(255,255,255,0.90)'),
    desc: '"AVAILABLE FOR WORK" badge text'
  },
  // 2. Mobile navbar inactive icons (MobileNav.tsx)
  {
    test: (file, line) => file.endsWith('MobileNav.tsx') && line.includes('<item.Icon'),
    apply: (line) => line.replace(/rgba\(255,\s*255,\s*255,\s*0\.45\)/g, 'rgba(255,255,255,0.75)'),
    desc: 'Inactive nav icon color'
  },
  // 3. Mobile navbar inactive labels (MobileNav.tsx)
  {
    test: (file, line) => file.endsWith('MobileNav.tsx') && line.includes('color: isLight ? \'rgba(10,10,20,0.40)\' : \'rgba(255,255,255,0.35)\''),
    apply: (line) => line.replace(/rgba\(255,\s*255,\s*255,\s*0\.35\)/g, 'rgba(255,255,255,0.72)'),
    desc: 'Inactive nav label color'
  },
  // 4. Stack card muted text (skill count) (StackSection.tsx)
  {
    test: (file, line) => file.endsWith('StackSection.tsx') && line.match(/rgba\(255,\s*255,\s*255,\s*0\.40?\)/) && line.includes('skills'),
    apply: (line) => line.replace(/rgba\(255,\s*255,\s*255,\s*0\.40?\)/g, 'rgba(255,255,255,0.78)'),
    desc: 'Stack card muted text'
  },
  // 5. Section labels
  {
    test: (file, line) => line.match(/tr\.(.*)_label/) && line.match(/rgba\(?(255,\s*255,\s*255|240,\s*244,\s*255),\s*0\.[2-4]\d*\)/),
    apply: (line) => line.replace(/rgba\((255,\s*255,\s*255|240,\s*244,\s*255),\s*0\.[2-4]\d*\)/g, 'rgba($1,0.75)'),
    desc: 'Section label text'
  },
  // 6. Terminal card muted text
  {
    test: (file, line) => file.endsWith('TerminalCard.tsx') && line.match(/rgba\(?(255,\s*255,\s*255|240,\s*244,\s*255),\s*0\.35\)/),
    apply: (line) => line.replace(/rgba\((255,\s*255,\s*255|240,\s*244,\s*255),\s*0\.35\)/g, 'rgba($1,0.75)'),
    desc: 'Terminal card muted text'
  },
  // 7. index.css --text-muted
  {
    test: (file, line) => file.endsWith('index.css') && line.includes('--text-muted'),
    apply: (line) => line.replace(/rgba\(255,\s*255,\s*255,\s*0\.35\)/g, 'rgba(255,255,255,0.75)'),
    desc: '--text-muted CSS variable'
  },
  // 8. Global catch-all
  {
    test: (file, line) => line.match(/rgba\(\s*255,\s*255,\s*255,\s*0\.(25|30|35|40|45)\s*\)/) ||
                          line.match(/rgba\(\s*240,\s*244,\s*255,\s*0\.(25|30|35|40|45)\s*\)/) ||
                          line.match(/rgba\(\s*10,\s*10,\s*20,\s*0\.(30|35|40)\s*\)/),
    apply: (line) => {
      let nl = line.replace(/rgba\(\s*255,\s*255,\s*255,\s*0\.(25|30|35|40|45)\s*\)/g, 'rgba(255,255,255,0.75)');
      nl = nl.replace(/rgba\(\s*240,\s*244,\s*255,\s*0\.(25|30|35|40|45)\s*\)/g, 'rgba(240,244,255,0.75)');
      nl = nl.replace(/rgba\(\s*10,\s*10,\s*20,\s*0\.(30|35|40)\s*\)/g, 'rgba(10,10,20,0.65)');
      return nl;
    },
    desc: 'Global contrast fix'
  }
];

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            processFile(fullPath);
        }
    }
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let lines = content.split('\n');
    let modified = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let originalLine = line;
        let changed = false;
        
        for (const rule of rules) {
            if (rule.test(filePath, line)) {
                let newLine = rule.apply(line);
                if (newLine !== line) {
                    
                    // Extract exactly what changed for the report
                    let beforeMatch = line.match(/rgba\([^)]+\)/);
                    let afterMatch = newLine.match(/rgba\([^)]+\)/);
                    if (!beforeMatch) beforeMatch = [line.trim()];
                    if (!afterMatch) afterMatch = [newLine.trim()];

                    // Multiple changes on one line? We just take the general text
                    let extract = (text) => {
                        let matches = text.match(/rgba\([^)]+\)/g);
                        return matches ? matches.join(' -> ') : text.trim();
                    };

                    reportRows.push(
`Fix #${fixCount++}:
  File: src${filePath.split('src')[1].replace(/\\/g, '/')}
  Line: ${i + 1}
  Before: color: ${extract(line)}
  After:  color: ${extract(newLine)}
  Element: ${rule.desc}
`
                    );
                    
                    line = newLine;
                    changed = true;
                    modified = true;
                }
            }
        }
        lines[i] = line;
    }

    if (modified) {
        fs.writeFileSync(filePath, lines.join('\n'));
    }
}

processDirectory(srcDir);

fs.writeFileSync('contrast-report.txt', 'CONTRAST FIX REPORT\n===================\n' + reportRows.join('\n'));
console.log('Complete. Read contrast-report.txt for details');
