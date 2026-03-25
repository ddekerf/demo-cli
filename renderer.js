document.addEventListener('DOMContentLoaded', () => {
  const vibeSelect = document.getElementById('vibeSelect');
  const startStopBtn = document.getElementById('startStopBtn');
  const sessionsEl = document.getElementById('sessions');
  const emptyEl = document.getElementById('empty');
  const statusEl = document.getElementById('status');

  let running = false;
  let startTs = null;
  let currentVibe = null;
  let sessions = [];

  function formatTime(ts) {
    const d = new Date(ts);
    return d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  }

  function formatDuration(ms) {
    const totalSec = Math.round(ms/1000);
    const minutes = Math.floor(totalSec/60);
    const seconds = totalSec % 60;
    if (minutes === 0) return `${seconds}s`;
    return `${minutes}m ${String(seconds).padStart(2,'0')}s`;
  }

  function renderSessions() {
    sessionsEl.innerHTML = '';
    if (sessions.length === 0) {
      emptyEl.style.display = 'block';
      return;
    }
    emptyEl.style.display = 'none';
    sessions.forEach(s => {
      const el = document.createElement('div');
      el.className = 'session';
      el.innerHTML = `\n        <div>\n          <div><strong>${s.vibeEmoji} ${s.vibeLabel}</strong></div>\n          <div class="meta">${formatTime(s.start)} → ${formatTime(s.end)} • ${formatDuration(s.duration)}</div>\n        </div>\n      `;
      sessionsEl.appendChild(el);
    });
  }

  function pushSession(vibe, start, end) {
    const duration = end - start;
    const vibeMap = {
      sleepy: {emoji: '😴', label: 'Sleepy'},
      chill: {emoji: '🙂', label: 'Chill'},
      focus: {emoji: '🔥', label: 'Focus'},
    };
    const meta = vibeMap[vibe] || {emoji:'❓', label:vibe};
    sessions.unshift({
      vibe,
      vibeEmoji: meta.emoji,
      vibeLabel: meta.label,
      start,
      end,
      duration
    });
    renderSessions();
  }

  function startSession() {
    running = true;
    startTs = Date.now();
    currentVibe = vibeSelect.value;
    startStopBtn.textContent = 'Stop';
    startStopBtn.classList.remove('start');
    startStopBtn.classList.add('stop');
    statusEl.textContent = `${vibeSelect.options[vibeSelect.selectedIndex].text} — Running`;
    vibeSelect.disabled = true;
  }

  function stopSession() {
    running = false;
    const endTs = Date.now();
    pushSession(currentVibe, startTs, endTs);
    startTs = null;
    currentVibe = null;
    startStopBtn.textContent = 'Start';
    startStopBtn.classList.remove('stop');
    startStopBtn.classList.add('start');
    statusEl.textContent = 'Ready';
    vibeSelect.disabled = false;
  }

  startStopBtn.addEventListener('click', () => {
    if (!running) startSession();
    else stopSession();
  });

  // initial render
  renderSessions();
});
