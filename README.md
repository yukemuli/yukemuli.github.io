# https://yukemuli.dance

素の HTML/CSS/JS で書いている静的サイト。ビルドはない。GitHub Pages で配信している。

# 開発

```sh
% pnpm install
% pnpm start
```

http://localhost:5173 を開く。Vite の開発サーバで、CSS を変えるとリロードなしで反映、HTML を変えると自動リロードする。

Vite はローカル開発サーバとしてだけ使っていて、ビルドはしない。本番は GitHub Pages がリポジトリをそのまま配信する。

# 構成

- `index.html` トップ（最新回の中身をそのまま載せて、その下に過去回のフライヤーを並べている）
- `events/<YYYYMMDD>-volN/index.html` 各回のイベントページ（`events/index.html` は一覧）
- `maps/index.html` 周辺地図（尾久ゆ〜ランド版。現在は導線から外して中身もコメントアウト中）
- `css/style.css` トップ以外のページのスタイル（トップは `css/top.css`。色はどちらも同じ値を使っている）
- `img/` `assets/` 画像

新しい回を追加するときは、前回の `events/*/index.html` をコピーして書き換える。トップページ（中身の差し替えと、前回分をフライヤー一覧へ移す）とイベント一覧も手で更新する。

各ページの `<head>`・ヘッダー（`header.masthead`）・`footer` はコピペで揃えている。いま開いているページのリンクには `aria-current="page"` を付ける。

# デプロイ

push すると GitHub Pages に反映される。
