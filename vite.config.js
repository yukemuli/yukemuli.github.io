// ローカル開発サーバ専用。ビルドはしない（本番は GitHub Pages がリポジトリをそのまま配信する）。
export default {
  // 存在しないパスで index.html を返さず、404 にする
  appType: 'mpa',
}
