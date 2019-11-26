# https://yukemuli.dance

# 開発

```sh
% git submodule update --init
% hugo serve
```

# デプロイ

- Travis-CIで、masterへのマージコミットがあった場合に`Deploy!`するようにしてる
  - 参考: https://github.com/yukemuli/yukemuli.github.io/blob/master/.travis.yml

手作業でデプロイする場合

```sh
% hugo
% git add . && git commit -m "デプロ〜イ"
% git push origin master
```

