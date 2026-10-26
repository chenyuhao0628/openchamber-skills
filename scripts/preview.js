const params = new URLSearchParams(location.search);
let dark = params.get('theme') === 'dark';
let width = Number(params.get('width') || 400);
let mode = params.get('state') || 'clean';
let resolved = false;

const root = '~/.config/opencode/skills';
const pathFor = (id, file = 'SKILL.md') => `${root}/${id}/${file}`;

const fixtures = [
  { id: 'appkit-interop', name: 'AppKit Interop', description: 'SwiftUI/AppKit bridging, NSWindow, responder chain.', zhName: 'AppKit 互通', zhDescription: 'SwiftUI 与 AppKit 桥接、窗口和响应链。' },
  { id: 'swiftui-patterns', name: 'SwiftUI Patterns', description: 'macOS SwiftUI scenes, windows, toolbars, inspectors.', zhName: 'SwiftUI 模式', zhDescription: 'macOS SwiftUI 场景、窗口、工具栏和检查器。' },
  { id: 'window-management', name: 'Window Management', description: 'macOS windows, panels, placement and restoration.', zhName: '窗口管理', zhDescription: 'macOS 窗口、面板、停靠和恢复。' },
  { id: 'liquid-glass', name: 'Liquid Glass', description: 'macOS 26 Liquid Glass surfaces and glass controls.', zhName: 'Liquid Glass', zhDescription: 'macOS 26 Liquid Glass 界面与玻璃控件。' },
  { id: 'view-refactor', name: 'View Refactor', description: 'Split large SwiftUI views and stabilize scene state.', zhName: '视图重构', zhDescription: '拆分大型 SwiftUI 视图并稳定场景状态。' },
  { id: 'build-run-debug', name: 'Build Run Debug', description: 'Xcode/Swift build, launch, and runtime failures.', zhName: '构建与调试', zhDescription: 'Xcode/Swift 构建、启动和运行时故障。' },
  { id: 'test-triage', name: 'Test Triage', description: 'Narrow macOS test failures and separate setup issues.', zhName: '测试排查', zhDescription: '缩小 macOS 测试失败范围并区分环境问题。' },
  { id: 'swiftpm-macos', name: 'SwiftPM macOS', description: 'SwiftPM macOS packages and executables.', zhName: 'SwiftPM', zhDescription: 'SwiftPM macOS 包和可执行文件。' },
  { id: 'signing-entitlements', name: 'Signing Entitlements', description: 'macOS signing, entitlements, and Gatekeeper.', zhName: '签名与权限', zhDescription: 'macOS 签名、entitlements 和 Gatekeeper。' },
  { id: 'packaging-notarization', name: 'Packaging Notarization', description: 'Archiving, notarization, and distribution failures.', zhName: '打包与公证', zhDescription: '归档、公证和分发失败排查。' },
  { id: 'telemetry', name: 'Telemetry', description: 'Lightweight macOS runtime logging and events.', zhName: '遥测', zhDescription: '轻量 macOS 运行日志与事件。' },
  { id: 'reverse-engineering-unpacking', name: 'RE Unpacking', description: 'PE/.NET, APK, and native ELF/SO triage and unpacking.', zhName: '逆向解包', zhDescription: 'PE/.NET、APK 和原生二进制的分诊与解包。' },
  { id: 'kuna-decompiler', name: 'Kuna Decompiler', description: 'Recover searchable C and assembly with the Kuna CLI.', zhName: 'Kuna 反编译', zhDescription: '用 Kuna CLI 恢复 C/汇编并验证发现。' },
  { id: 'reverse-engineer-anything', name: 'REA', description: 'Reverse engineer native, managed, Electron and firmware targets.', zhName: 'REA 逆向', zhDescription: '原生、托管、Electron 和固件目标逆向。' },
  { id: 'cloudflare', name: 'Cloudflare', description: 'Choose Cloudflare products and architecture.', zhName: 'Cloudflare', zhDescription: '选择 Cloudflare 产品和架构。' },
  { id: 'workers-best-practices', name: 'Workers Best Practices', description: 'Production Workers configuration and code practices.', zhName: 'Workers 最佳实践', zhDescription: '生产 Workers 的配置与代码实践。' },
  { id: 'wrangler', name: 'Wrangler', description: 'Wrangler CLI dev, deploy, and resources.', zhName: 'Wrangler', zhDescription: 'Wrangler CLI 开发、部署和资源管理。' },
  { id: 'yichen-jianying-edit', name: 'Jianying Edit', description: 'Headless editable Jianying drafts and export.', zhName: '剪映编辑', zhDescription: '无界面生成可编辑的剪映草稿。' },
  { id: 'browser-skill', name: 'Browser Skill', description: 'Automate the logged-in Chromium browser.', zhName: '浏览器自动化', zhDescription: '操作用户已登录的 Chromium 浏览器。' },
];

const translations = {
  version: 1,
  locale: 'zh-CN',
  entries: Object.fromEntries(
    fixtures.map((item) => [
      item.id,
      { hash: `${item.id}-hash`, nameZh: item.zhName, descriptionZh: item.zhDescription, updatedAt: 1 },
    ]),
  ),
};
translations.entries.delta = { hash: 'delta-hash', nameZh: '德尔塔', descriptionZh: '启用和停用入口同时存在的示例技能。', updatedAt: 1 };

const defaultGroups = [
  { id: 'macos-ui', name: 'macOS UI', skillIds: ['appkit-interop', 'swiftui-patterns', 'window-management', 'liquid-glass', 'view-refactor'] },
  { id: 'macos-build', name: 'macOS 构建', skillIds: ['build-run-debug', 'test-triage', 'swiftpm-macos', 'signing-entitlements', 'packaging-notarization', 'telemetry'] },
  { id: 'reverse', name: '逆向工程', skillIds: ['reverse-engineering-unpacking', 'kuna-decompiler', 'reverse-engineer-anything'] },
  { id: 'cloudflare', name: 'Cloudflare', skillIds: ['cloudflare', 'workers-best-practices', 'wrangler'] },
  { id: 'video', name: '视频', skillIds: ['yichen-jianying-edit'] },
  { id: 'browser', name: '浏览器', skillIds: ['browser-skill'] },
];
let groups = defaultGroups.map((group) => ({ ...group, skillIds: [...group.skillIds] }));

const initialStates = () => {
  const states = Object.fromEntries(fixtures.map((item) => [item.id, true]));
  states['view-refactor'] = false;
  states.delta = true;
  return states;
};
let states = initialStates();

const frame = document.querySelector('iframe');
const audit = document.querySelector('#audit');
const buttons = {
  clean: document.querySelector('#clean'),
  conflict: document.querySelector('#conflict'),
};

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
  for (const item of fixtures) {
    const active = Boolean(states[item.id]);
    const activePath = active ? pathFor(item.id) : null;
    const disabledPath = active ? null : pathFor(item.id, 'SKILL.md.disabled');
    const autoInvokeOff = item.id === 'browser-skill';
    const conflicts = [];
    if (active && autoInvokeOff) {
      conflicts.push(conflict('manual', item.id, '入口已启用，但标记为仅手动调用；模型看不到它。', activePath, null, false));
    }
    skills.push({
      id: item.id,
      name: item.name,
      description: item.description,
      state: active ? 'enabled' : 'disabled',
      advertised: Boolean(active && !autoInvokeOff),
      autoInvokeOff,
      activePaths: activePath ? [activePath] : [],
      disabledPaths: disabledPath ? [disabledPath] : [],
      conflicts,
      warnings: conflicts.map((item) => item.message),
      estimatedTokens: active && !autoInvokeOff ? 40 : 0,
      contentHash: `${item.id}-hash`,
    });
  }

  if (mode === 'conflict') {
    if (resolved) {
      const active = Boolean(states.delta);
      skills.push({
        id: 'delta',
        name: 'Delta',
        description: 'Conflict resolved for this preview.',
        state: active ? 'enabled' : 'disabled',
        advertised: active,
        autoInvokeOff: false,
        activePaths: active ? [pathFor('delta')] : [],
        disabledPaths: active ? [] : [pathFor('delta', 'SKILL.md.disabled')],
        conflicts: [],
        warnings: [],
        estimatedTokens: active ? 30 : 0,
        contentHash: 'delta-hash',
      });
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
        contentHash: 'delta-hash',
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
  if (method === 'GET' && path === '/translations') {
    reply(event.source, message.id, 200, translations);
    return;
  }
  if (method === 'POST' && path === '/translations') {
    reply(event.source, message.id, 200, translations);
    return;
  }
  if (method === 'GET' && path === '/groups') {
    reply(event.source, message.id, 200, { version: 1, groups });
    return;
  }
  if (method === 'POST' && path === '/groups') {
    const input = body ? JSON.parse(body) : {};
    if (!input || input.version !== 1 || !Array.isArray(input.groups)) {
      reply(event.source, message.id, 400, { error: '分组配置格式不正确。', code: 'invalid-groups' });
      return;
    }
    groups = input.groups;
    reply(event.source, message.id, 200, { version: 1, groups });
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
  if (method === 'POST' && path === '/skills/batch') {
    const input = body ? JSON.parse(body) : {};
    const enable = Array.isArray(input.enable) ? input.enable : [];
    const disable = Array.isArray(input.disable) ? input.disable : [];
    for (const id of enable) states[id] = true;
    for (const id of disable) states[id] = false;
    resolved = true;
    reply(event.source, message.id, 200, { ...buildData(), changed: [...new Set([...enable, ...disable])] });
    return;
  }
  reply(event.source, message.id, 404, { error: 'not-found', code: 'not-found' });
});

const paint = () => {
  document.body.classList.toggle('dark', dark);
  document.documentElement.style.setProperty('--width', `${width}px`);
  buttons.clean.setAttribute('aria-pressed', mode === 'clean' ? 'true' : 'false');
  buttons.conflict.setAttribute('aria-pressed', mode === 'conflict' ? 'true' : 'false');
  audit.textContent = `mode=${mode} · ${Object.values(states).filter(Boolean).length} 个启用`;
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
  states = initialStates();
  groups = defaultGroups.map((group) => ({ ...group, skillIds: [...group.skillIds] }));
  show();
};
buttons.conflict.onclick = () => {
  mode = 'conflict';
  resolved = false;
  states = initialStates();
  groups = defaultGroups.map((group) => ({ ...group, skillIds: [...group.skillIds] }));
  show();
};
document.querySelector('#group').onclick = () => {
  const doc = frame.contentDocument;
  const chip = doc?.querySelector('[data-group="reverse"]');
  if (chip && chip.getClientRects().length > 0) {
    chip.click();
    return;
  }
  doc?.querySelector('.oc-sdk-trigger')?.click();
  setTimeout(() => {
    const option = [...(doc?.querySelectorAll('.oc-sdk-option') ?? [])].find((node) =>
      node.textContent?.includes('逆向工程'),
    );
    option?.click();
  }, 50);
};
document.querySelector('#edit-groups').onclick = () => {
  const button = frame.contentDocument?.querySelector('.sk-groups-edit');
  button?.click();
};
document.querySelector('#save-group').onclick = async () => {
  const doc = frame.contentDocument;
  doc?.querySelector('.sk-groups-edit')?.click();
  await new Promise((resolve) => setTimeout(resolve, 80));
  const input = doc?.querySelector('.sk-group-name');
  const save = doc ? [...doc.querySelectorAll('button')].find((button) => button.textContent === '保存更改') : null;
  if (!input || !save) {
    audit.textContent = '保存测试失败：找不到编辑器控件';
    return;
  }
  input.value = 'macOS UI 改';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  save.click();
  await new Promise((resolve) => setTimeout(resolve, 250));
  audit.textContent = `保存测试：${groups.map((group) => group.name).join(' / ')}`;
};
document.querySelector('#reload').onclick = show;

paint();
show();
