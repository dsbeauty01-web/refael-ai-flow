import '@fontsource/rubik/400.css';
import '@fontsource/rubik/500.css';
import '@fontsource/rubik/600.css';
import '@fontsource/rubik/700.css';
import '@fontsource/rubik/800.css';
import '@fontsource/assistant/400.css';
import '@fontsource/assistant/500.css';
import '@fontsource/assistant/600.css';
import '@fontsource/assistant/700.css';
import '@fontsource/assistant/800.css';
import '@fontsource/suez-one/400.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/noto-sans-thai/600.css';
import { continueRender, delayRender } from 'remotion';

const handle = delayRender('fonts');
const wants = [
  '400 30px Rubik', '500 30px Rubik', '600 30px Rubik', '700 30px Rubik', '800 30px Rubik',
  '400 30px Assistant', '500 30px Assistant', '600 30px Assistant', '700 30px Assistant', '800 30px Assistant',
  '400 30px "Suez One"', '400 30px "JetBrains Mono"', '600 30px "Noto Sans Thai"',
];
Promise.all(wants.flatMap((w) => [document.fonts.load(w, 'אבג abc 123 ₪'), document.fonts.load(w, 'สวัสดี')]))
  .then(() => continueRender(handle))
  .catch(() => continueRender(handle));
