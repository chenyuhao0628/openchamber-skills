const params = new URLSearchParams(location.search);
let dark = params.get('theme') === 'dark';
let width = Number(params.get('width') || 400);
let mode = params.get('state') || 'clean';
let resolved = false;
let states = { alpha: true, manual: true, beta: false, nodesc: true, delta: true };

const frame = document.querySelector('iframe');
const audit = document.querySelector('#audit');
const buttons = {
  clean: document.querySelector('#clean'),
  conflict: document.querySelector('#conflict'),
};

const root = '~/.config/opencode/skills';
const pathFor = (id, file = 'SKILL.md') => `${root}/${id}/${file}`;

const tokens = (isDark) => ({
  background: isDark ? '#20201e' : '#faf9f7',
  elevated: isDark ? '#282724' : '#f2f1ee',
  foreground: isDark ? '#dedbd3' : '#484744',
  muted: isDark ? '#a7a39b' : '#77736c',
  subtle: isDark ? '#817d76' : '#a29e98',
  border: isDark ? '#3c3a35' : '#e3e0db',
  hover: isDark ? '#ffffff0a' : '#00000005',
  selection: isDark ? '#4a3327' : '#f2e6dc',
  focus: '#b07750',
  primary: isDark ? '#d59a6f' : '#a4663b',
  mutedSurface: isDark ? '#272622' : '#f1efec',
  elevatedForeground: isDark ? '#dedbd3' : '#484744',
  active: isDark ? '#ffffff12' : '#00000009',
  selectionForeground: isDark ? '#f2d4bc' : '#724324',
  primaryForeground: '#ffffff',
  primaryText: isDark ? '#e3b18c' : '#965421',
  successText: isDark ? '#a0b48c' : '#4f6a3b',
  warningText: isDark ? '#d6b774' : '#8b6322',
  errorText: isDark ? '#e39b8b' : '#b34635',
  infoText: isDark ? '#9eb4c9' : '#496d88',
  success: '#759862',
  warning: '#c3944d',
  error: '#ce6a55',
  info: '#6995bb',
  font: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
  mono: 'ui-monospace,SFMono-Regular,monospace',
  radius: '7px',
});

const conflict = (kind, skillId, message, activePath, disabledPath, blocking) => ({
  kind,
  skillId,
  message,
  activePath,
  disabledPath,
  blocking,
});

const buildData = () => {
  const skills = [];
  const add = (id, name, description, active, autoInvokeOff = false, extraConflicts = []) => {
    const activePath = active ? pathFor(id) : null;
    const disabledPath = active ? null : pathFor(id, 'SKILL.md.disabled');
    const conflicts = [...extraConflicts];
    if (active && autoInvokeOff) {
      conflicts.push(conflict('manual', id, '入口已启用，但标记为仅手动调用；模型看不到它。', activePath, null, false));
    }
    if (active && !autoInvokeOff && !description) {
      conflicts.push(conflict('no-description', id, '入口已启用，但没有 description；模型不会自动选用。', activePath, null, false));
    }
    const advertised = Boolean(active && !autoInvokeOff && description);
    skills.push({
      id,
      name,
      description,
      state: active ? 'enabled' : 'disabled',
      advertised,
      autoInvokeOff,
      activePaths: activePath ? [activePath] : [],
      disabledPaths: disabledPath ? [disabledPath] : [],
      conflicts,
      warnings: [...new Set(conflicts.filter((item) => !item.blocking).map((item) => item.message))],
      estimatedTokens: advertised ? Math.max(1, Math.ceil((name.length + id.length + description.length) / 4) + 8) : 0,
    });
  };

  add('alpha', 'Alpha', 'Fixture skill for the normal enabled state.', states.alpha);
  add('manual', 'Manual only', 'Fixture skill hidden by autoinvoke.', states.manual, true);
  add('beta', 'Beta', 'Fixture skill currently turned off.', states.beta);
  add('nodesc', 'No description', '', states.nodesc);

  if (mode === 'conflict') {
    if (resolved) {
      add('delta', 'Delta', 'Conflict resolved for this preview.', states.delta);
    } else {
      skills.push({
        id: 'delta',
        name: 'Delta',
        description: 'Both the active and disabled entry exist.',
        state: 'conflict',
        advertised: true,
        autoInvokeOff: false,
        activePaths: [pathFor('delta')],
        disabledPaths: [pathFor('delta', 'SKILL.md.disabled')],
        conflicts: [
          conflict('both', 'delta', '同一目录同时存在启用和停用入口，需要先选择保留哪一个。', pathFor('delta'), pathFor('delta', 'SKILL.md.disabled'), true),
        ],
        warnings: [],
        estimatedTokens: 30,
      });
    }
  }

  const conflicts = skills.flatMap((skill) => skill.conflicts);
  const blocking = conflicts.filter((item) => item.blocking).length;
  return {
    skills,
    conflicts,
    summary: {
      total: skills.length,
      advertised: skills.filter((skill) => skill.advertised).length,
      disabled: skills.filter((skill) => skill.state === 'disabled').length,
      blockingConflicts: blocking,
      warnings: conflicts.length - blocking,
      estimatedTokens: skills.reduce((sum, skill) => sum + skill.estimatedTokens, 0),
    },
    root: { path: root, exists: true, error: null },
    scannedAt: Date.now(),
  };
};

const ready = () => {
  frame.contentWindow?.postMessage({
    channel: 'openchamber.sdk',
    v: 1,
    type: 'ready',
    payload: {
      theme: { mode: dark ? 'dark' : 'light', tokens: tokens(dark) },
      locale: 'zh-CN',
      directory: null,
      session: null,
      surface: 'panel',
      connection: { connected: true, account: 'fixture' },
      settings: {},
      item: null,
    },
  }, '*');
};

const send = (target, id, payload) => target.postMessage({ channel: 'openchamber.sdk', v: 1, type: 'result', id, ok: true, payload }, '*');
const reply = (target, id, status, body) => send(target, id, { status, body: JSON.stringify(body) });

window.addEventListener('message', (event) => {
  const message = event.data;
  if (event.source !== frame.contentWindow || message?.channel !== 'openchamber.sdk') return;
  if (message.type === 'hello') {
    ready();
    return;
  }
  if (message.type !== 'service-request') {
    send(event.source, message.id, {});
    return;
  }
  const { method, path, body } = message.payload;
  const data = buildData();
  if (method === 'GET' && path === '/skills') {
    reply(event.source, message.id, 200, data);
    return;
  }
  if (method === 'POST' && path === '/skills/toggle') {
    const input = body ? JSON.parse(body) : {};
    const skill = data.skills.find((item) => item.id === input.id);
    if (!skill) {
      reply(event.source, message.id, 404, { error: '没有找到技能', code: 'not-found' });
      return;
    }
    if (skill.conflicts.some((item) => item.kind === 'both')) {
      reply(event.source, message.id, 409, { error: '技能有未解决的入口冲突。', code: 'conflict', conflicts: skill.conflicts });
      return;
    }
    states[input.id] = Boolean(input.enabled);
    if (input.id === 'delta') resolved = true;
    reply(event.source, message.id, 200, buildData());
    return;
  }
  if (method === 'POST' && path === '/skills/resolve') {
    const input = body ? JSON.parse(body) : {};
    resolved = true;
    states.delta = input.keep === 'enabled';
    reply(event.source, message.id, 200, {
      ...buildData(),
      backupPath: '~/.config/opencode/skills/delta/SKILL.md.disabled.conflict-fixture',
    });
    return;
  }
  if (method === 'POST' && path === '/skills/bulk') {
    const input = body ? JSON.parse(body) : {};
    const ids = buildData().skills.map((skill) => skill.id);
    for (const id of ids) states[id] = Boolean(input.enabled);
    resolved = true;
    reply(event.source, message.id, 200, { ...buildData(), changed: ids });
    return;
  }
  reply(event.source, message.id, 404, { error: 'not-found', code: 'not-found' });
});

const paint = () => {
  document.body.classList.toggle('dark', dark);
  document.documentElement.style.setProperty('--width', `${width}px`);
  buttons.clean.setAttribute('aria-pressed', mode === 'clean' ? 'true' : 'false');
  buttons.conflict.setAttribute('aria-pressed', mode === 'conflict' ? 'true' : 'false');
  audit.textContent = `mode=${mode} · states=${JSON.stringify(states)}`;
};
const show = () => {
  frame.src = `/panel/index.html?state=${encodeURIComponent(mode)}&t=${Date.now()}`;
  paint();
};

document.querySelector('#theme').onclick = () => {
  dark = !dark;
  paint();
  ready();
};
document.querySelector('#narrow').onclick = () => {
  width = width === 280 ? 400 : 280;
  paint();
};
buttons.clean.onclick = () => {
  mode = 'clean';
  resolved = false;
  states = { alpha: true, manual: true, beta: false, nodesc: true, delta: true };
  show();
};
buttons.conflict.onclick = () => {
  mode = 'conflict';
  resolved = false;
  states = { alpha: true, manual: true, beta: false, nodesc: true, delta: true };
  show();
};
document.querySelector('#reload').onclick = show;

paint();
show();
