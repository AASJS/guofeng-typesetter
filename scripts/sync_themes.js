#!/usr/bin/env node
/**
 * sync_themes.js — 把 references/themes.json 同步进 guofeng-card-engine.js 的 DATA 块。
 * 作用：themes.json 是唯一的「可编辑数据源」，本脚本生成离线引擎里内嵌的 DATA，
 *       保证引擎在无服务器（file://）环境下也能跑，同时编辑只改 JSON 一处。
 *
 * 用法：node scripts/sync_themes.js
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const jsonPath = path.join(root, 'references', 'themes.json');
const enginePath = path.join(root, 'guofeng-card-engine.js');

const START = '/*__THEMES_DATA_START__*/';
const END = '/*__THEMES_DATA_END__*/';

const json = fs.readFileSync(jsonPath, 'utf-8');
// 校验 JSON 合法性
JSON.parse(json);
const dataLiteral = `const DATA = ${json.trim()};`;

const engine = fs.readFileSync(enginePath, 'utf-8');
const i = engine.indexOf(START);
const j = engine.indexOf(END);
if (i < 0 || j < 0) {
  console.error('✗ 未找到 DATA 占位符（' + START + ' / ' + END + '），请检查引擎文件。');
  process.exit(1);
}
const next = engine.slice(0, i) + START + '\n  ' + dataLiteral + '\n  ' + engine.slice(j);
fs.writeFileSync(enginePath, next, 'utf-8');
console.log('✓ 已将 themes.json 同步到 guofeng-card-engine.js（DATA 块已更新）');
