#!/usr/bin/env python3
"""构建自包含单文件版 workstation-integration.html（发布产物）。

用法:  python3 build_single.py
输入:  index.html / style.css / main.js / workbench.html / guofeng-card-engine.js（多文件开发版）
输出:  workstation-integration.html（单文件离线分发版）

构建规则：
1. style.css 内联进 <head>（替换 <link>）；
2. guofeng-card-engine.js + main.js 依次内联进 </body> 前（替换两个 <script src>）；
3. workbench.html 以 base64 内联为 WB_B64，loadWb 改用 srcdoc + 锚点注入
   （把 dt 的值在父页面拼接进注入脚本，由注入脚本点击内层 Tab 并隐藏内层导航栏）；
4. workbench.html 中的 URL 参数初始化脚本（?tab=）被移除——srcdoc 模式下无 URL 参数，
   由锚点注入接管。
"""
import base64

SRC_LINE = 'frame.src = "workbench.html?tab=" + encodeURIComponent(dt);'
# dt 在父页面作用域拼接进注入文本；
# 注入脚本自身用单引号字符串、属性值用双引号 → 父页面双引号字符串里只需 \" 一种转义，
# 注入文本形如: querySelector('.tabs button[data-tab="2"]')，无嵌套转义问题
SRCDOC_LINE = (
    'frame.srcdoc = WB_HTML.replace("<!-" + "-__DEF_TAB__-->", '
    '"<scr" + "ipt>try{var b=document.querySelector(\'.tabs button[data-tab=\\\"" + dt + "\\"]\');'
    'if(b)b.click();var s=document.createElement(\'style\');s.textContent=\'.tabs{display:none!important}\';'
    'document.head.appendChild(s);}catch(e){}</scr" + "ipt>");'
)


def build():
    wb = open('workbench.html', encoding='utf-8').read()
    # 移除 URL 参数初始化脚本（srcdoc 模式由锚点注入接管）
    i = wb.find('<script>\n(function(){\n  /* 多文件开发模式')
    if i >= 0:
        j = wb.index('</script>', i) + len('</script>')
        wb = wb[:i] + wb[j:]
    assert 'URLSearchParams' not in wb
    b64 = base64.b64encode(wb.encode('utf-8')).decode()

    js = open('main.js', encoding='utf-8').read()
    assert js.count(SRC_LINE) == 2, 'main.js 中 frame.src 出现次数异常'
    js = js.replace(SRC_LINE, SRCDOC_LINE)
    assert js.count('srcdoc') >= 2

    k = js.index('function safeGet(k)')
    js = js[:k] + (
        'const WB_B64="' + b64 + '";\n'
        '  const WB_HTML = new TextDecoder("utf-8").decode('
        'Uint8Array.from(atob(WB_B64), c => c.charCodeAt(0)));\n  '
    ) + js[k:]
    assert '</scr' + 'ipt>' not in js and '<!--' not in js, 'main.js 含不安全序列，不能内联'

    engine = open('guofeng-card-engine.js', encoding='utf-8').read()
    # 引擎注释里含示例 <script ...></script>，内联时必须转义 </script>，否则会提前截断内联块
    ST = '</scr' + 'ipt>'
    engine = engine.replace(ST, '<\\/scr' + 'ipt>')
    assert ST not in engine and '<!--' not in engine, 'engine 转义后仍含不安全序列'

    html = open('index.html', encoding='utf-8').read()
    css = open('style.css', encoding='utf-8').read()
    html = html.replace('<link rel="stylesheet" href="style.css">',
                        '<style>' + css + '</style>')
    html = html.replace('<script src="guofeng-card-engine.js" defer></script>',
                        '<script>' + engine + '</script>')
    html = html.replace('<script src="main.js" defer></script>',
                        '<script>' + js + '</script>')
    assert '<script src="main.js" defer></script>' not in html, '外壳脚本未内联'
    assert '<script src="guofeng-card-engine.js" defer></script>' not in html, '引擎未内联'
    assert 'href="style.css"' not in html, '仍有外部 css 引用'
    open('workstation-integration.html', 'w', encoding='utf-8').write(html)
    print('built workstation-integration.html:', len(html.encode('utf-8')), 'bytes')


if __name__ == '__main__':
    build()
