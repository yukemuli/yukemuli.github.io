// トップのキービジュの文字を湯けむりに見立てて動かす。
//  1. 初回ロード: 湯けむりから凝集して、くっきりした文字になる
//  2. スクロール: 下へスクロールするほど、逆に湯けむりへ散っていく (戻せばまた凝集する)
// 凝集の見た目 (ぼかし・浮き上がり) は css/top.css の .steam 以下。
// どちらも、動いていないときはエフェクト用のスタイルを一切残さない。
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('steam')) return;

  var hero = document.querySelector('.hero');
  var title = hero.querySelector('.hero-title');
  var text = title.textContent;
  var turbulence = document.querySelector('#steam-filter feTurbulence');
  var displacement = document.querySelector('#steam-filter feDisplacementMap');

  function setSteam(strength) {
    // strength: 0 (ゆらぎなし) 〜 1 (いちばん強い)
    displacement.setAttribute('scale', (strength * 90).toFixed(1));
    turbulence.setAttribute('baseFrequency', (0.02 - strength * 0.008).toFixed(4) + ' ' + (0.025 + strength * 0.015).toFixed(4));
    hero.classList.toggle('steaming', strength > 0);
  }

  // ---- 1. 初回ロード: 凝集 ----

  // 1文字ずつ、ばらばらのタイミングで凝集させる
  title.setAttribute('aria-label', text);
  title.textContent = '';
  text.split('').forEach(function (c) {
    var span = document.createElement('span');
    span.textContent = c;
    span.setAttribute('aria-hidden', 'true');
    span.style.setProperty('--d', (0.7 + Math.random() * 0.9).toFixed(2) + 's');
    span.style.setProperty('--x', ((Math.random() - 0.5) * 0.5).toFixed(2) + 'em');
    title.appendChild(span);
  });
  title.classList.add('split');

  // いちばん最後に凝集しおわる文字の時刻。ゆらぎ (SVG フィルタ) はここまで続け、
  // ここで全部まとめて素の状態に戻す。
  // フィルタだけ先に外すと、まだ動いている文字 (料金の行など) が、ブラウザが
  // 途中で作った低解像度の絵のまま残り、一瞬もやっと戻ったように見えるため。
  var animations = hero.getAnimations ? hero.getAnimations({ subtree: true }) : [];
  var duration = animations.reduce(function (end, a) {
    return Math.max(end, a.effect.getComputedTiming().endTime);
  }, 0) || 4000;
  var start = performance.now();
  var intro = true;

  function tick(now) {
    if (!intro) return;
    var t = Math.min((now - start) / duration, 1);
    if (t < 1) {
      setSteam(Math.pow(1 - t, 3));
      requestAnimationFrame(tick);
    } else {
      finish();
    }
  }
  requestAnimationFrame(tick);

  // エフェクト用のクラス・フィルタ・分割を、同じタイミングですべて外して
  // 素の HTML/CSS の状態に戻す。アニメーションが終わった後も blur(0) や scale が
  // 残っていると、ブラウザによっては文字がにじむため。
  function finish() {
    if (!intro) return;
    intro = false;
    setSteam(0);
    root.classList.remove('steam');
    title.textContent = text;
    title.removeAttribute('aria-label');
    title.classList.remove('split');
    // ロード中にスクロールしていた場合は、その位置の状態にすぐ合わせる
    update();
  }

  // タブが裏にあって rAF が止まっていても、必ず元に戻す
  setTimeout(finish, duration + 1000);

  // ---- 2. スクロール: 散っていく ----

  // 湯けむりは上へのぼるので、下の行から順に散らす
  var layers = [
    '.hero-fee', '.hero-venue', '.hero-lineup', '.hero-time', '.hero-date',
    '.hero-title', '.hero-tagline', '.hero-area', '.scroll'
  ].map(function (selector) {
    return hero.querySelector(selector);
  });
  var STAGGER = 0.06; // 1行ごとに散りはじめをずらす割合
  var SPAN = 0.5;     // 1行が散りきるまでの割合

  function clamp(v) {
    return Math.max(0, Math.min(1, v));
  }

  function update() {
    if (intro) return;
    // ヒーローの高さの 45% スクロールしたところで、ぜんぶ散りきる
    var p = clamp(window.scrollY / (hero.offsetHeight * 0.45));

    layers.forEach(function (el, i) {
      var q = clamp((p - i * STAGGER) / SPAN);
      if (q === 0) {
        // 散っていないときは、インラインスタイルを残さない
        el.style.removeProperty('opacity');
        el.style.removeProperty('filter');
        el.style.removeProperty('translate');
        el.style.removeProperty('scale');
        if (!el.getAttribute('style')) el.removeAttribute('style');
        return;
      }
      var e = Math.pow(q, 1.5); // はじめはゆっくり、だんだん速く散る
      el.style.opacity = (1 - e).toFixed(3);
      el.style.filter = 'blur(' + (e * 18).toFixed(1) + 'px)';
      el.style.translate = '0 ' + (-e * 1.2).toFixed(3) + 'em';
      el.style.scale = (1 + e * 0.12).toFixed(3);
    });

    // ゆらぎも、はじめは弱く
    setSteam(Math.pow(clamp(p * 1.3), 2));
  }

  var queued = false;
  window.addEventListener('scroll', function () {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () {
      queued = false;
      update();
    });
  }, { passive: true });
  window.addEventListener('resize', update);
})();
