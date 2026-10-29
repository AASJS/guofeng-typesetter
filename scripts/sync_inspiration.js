#!/usr/bin/env node
/**
 * sync_inspiration.js — 把 references/inspiration.json 同步进 guofeng-card-engine.js 的 INSPIRATIONS 块。
 * 作用：inspiration.json 是「灵感库」的唯一可编辑数据源；本脚本生成离线引擎里内嵌的 INSPIRATIONS，
 *       保证 Studio 在无服务器（file://）环境下也能浏览灵感，同时编辑只改 JSON 一处。
 *
 * 用法：node scripts/sync_inspiration.js
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const jsonPath = path.join(root, 'references', 'inspiration.json');
const enginePath = path.join(root, 'guofeng-card-engine.js');

const START = '/*__INSPIRATION_DATA_START__*/';
const END = '/*__INSPIRATION_DATA_END__*/';

const json = fs.readFileSync(jsonPath, 'utf-8');
// 校验 JSON 合法性
const parsed = JSON.parse(json);
if (!parsed.entries || !Array.isArray(parsed.entries)) {
  console.error('✗ inspiration.json 缺少 entries 数组');
  process.exit(1);
}
const dataLiteral = `const INSPIRATIONS = ${json.trim()};`;

const engine = fs.readFileSync(enginePath, 'utf-8');
const i = engine.indexOf(START);
const j = engine.indexOf(END);
if (i < 0 || j < 0) {
  console.error('✗ 未找到 INSPIRATIONS 占位符（' + START + ' / ' + END + '），请检查引擎文件。');
  process.exit(1);
}
const next = engine.slice(0, i) + START + '\n  ' + dataLiteral + '\n  ' + engine.slice(j);
fs.writeFileSync(enginePath, next, 'utf-8');
console.log(`✓ 已将 inspiration.json 同步到 guofeng-card-engine.js（INSPIRATIONS 块已更新，${parsed.entries.length} 条灵感 / ${parsed.sources.length} 个来源）`);
