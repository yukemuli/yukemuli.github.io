# https://yukemuli.dance

素の HTML/CSS/JS で書いている静的サイト。ビルドはない。GitHub Pages で配信している。

# 開発

```sh
% python3 -m http.server 8000
```

http://localhost:8000 を開く。

# 構成

- `index.html` トップ（最新回の中身をそのまま載せて、その下に過去回のフライヤーを並べている）
- `events/<YYYYMMDD>-volN/index.html` 各回のイベントページ（`events/index.html` は一覧）
- `maps/index.html` 周辺地図
- `css/style.css` スタイルはこれ1枚
- `img/` `assets/` 画像

新しい回を追加するときは、前回の `events/*/index.html` をコピーして書き換える。トップページ（中身の差し替えと、前回分をフライヤー一覧へ移す）とイベント一覧も手で更新する。

各ページの `<head>` とサイドバーはコピペで揃えている。サイドバーは CSS だけで開閉するので、`input` → `.sidebar` → `.wrap` → `label` の並び順を崩さないこと。

# デプロイ

push すると GitHub Pages に反映される。
