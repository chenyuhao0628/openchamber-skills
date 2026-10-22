export type SkillGroup = {
  id: string;
  name: string;
  skillIds: string[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'macos-ui',
    name: 'macOS UI',
    skillIds: [
      'appkit-interop',
      'swiftui-patterns',
      'window-management',
      'liquid-glass',
      'view-refactor',
    ],
  },
  {
    id: 'macos-build',
    name: 'macOS 构建',
    skillIds: [
      'build-run-debug',
      'test-triage',
      'swiftpm-macos',
      'signing-entitlements',
      'packaging-notarization',
      'telemetry',
    ],
  },
  {
    id: 'reverse',
    name: '逆向工程',
    skillIds: [
      'reverse-engineering-unpacking',
      'kuna-decompiler',
      'reverse-engineer-anything',
    ],
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    skillIds: ['cloudflare', 'workers-best-practices', 'wrangler'],
  },
  {
    id: 'video',
    name: '视频',
    skillIds: ['yichen-jianying-edit'],
  },
  {
    id: 'browser',
    name: '浏览器',
    skillIds: ['browser-skill'],
  },
];
