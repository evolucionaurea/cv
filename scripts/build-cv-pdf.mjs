// Genera Sebastian-Sanchez-CV.pdf a partir de cv.html (texto real, apto para filtros ATS).
// Uso: node scripts/build-cv-pdf.mjs
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = pathToFileURL(join(root, 'cv.html')).href;
const out = join(root, 'Sebastian-Sanchez-CV.pdf');

const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);
const chrome = candidates.find(p => existsSync(p));
if (!chrome) { console.error('No se encontró Chrome/Edge. Definí CHROME_PATH.'); process.exit(1); }

const profile = mkdtempSync(join(tmpdir(), 'cv-pdf-'));
const args = ['--headless=new', '--disable-gpu', `--user-data-dir=${profile}`, '--no-pdf-header-footer', '--run-all-compositor-stages-before-draw', '--virtual-time-budget=5000', `--print-to-pdf=${out}`, src];
const p = spawn(chrome, args, { stdio: 'ignore' });
p.on('exit', code => {
    rmSync(profile, { recursive: true, force: true });
    if (code === 0 && existsSync(out)) console.log('PDF generado:', out);
    else { console.error('Falló la generación del PDF (código ' + code + ')'); process.exit(1); }
});
