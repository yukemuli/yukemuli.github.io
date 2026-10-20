# https://yukemuli.dance

素の HTML/CSS/JS で書いている静的サイト。ビルドはない。GitHub Pages で配信している。

# 開発

```sh
% python3 -m http.server 8000
```

http://localhost:8000 を開く。

# 構成

- `index.html` トップ
- `events/<YYYYMMDD>-volN/index.html` 各回のイベントページ（`events/index.html` は一覧）
- `maps/index.html` 周辺地図
- `css/` `img/` `assets/` 静的ファイル

新しい回を追加するときは、前回の `events/*/index.html` をコピーして書き換える。トップページとイベント一覧も手で更新する。

# デプロイ

push すると GitHub Pages に反映される。
