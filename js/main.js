'use strict';

{
  //必要な要素を取得
  const timer = document.getElementById('timer')
  const start = document.getElementById('start')
  const stop = document.getElementById('stop')
  const reset = document.getElementById('reset')

  let startTime

  function countUp() {
    //click時のstartTimeからの経過時間を求める
    //(今の時間) - (押したときの時間)
    //console.log(Date.now() - startTime)
    //new Date()とすることでミリ秒を分秒に直せる
    const d = new Date(Date.now() - startTime)
    //console.log(d)
    const m = String(d.getMinutes()).padStart(2, '0')//分取得
    const s = String(d.getSeconds()).padStart(2, '0')//秒取得
    const ms = String(d.getMilliseconds()).padStart(3, 'o')
    //ミリ秒取得
    timer.textContent = `${m}:${s}:${ms}`

    //setTimeout() を使って 10 ミリ秒後にこの countUp() 自身を呼び出す
    //Startボタンを押したときの時刻をstartTImeで固定しつつ、その都度更新されるDate.now()から引くことで経過時間を求めています。
    setTimeout(() => {
      countUp()
    }, 10)
  }

  //startボタンでタイマー開始
  start.addEventListener('click', () => {
    //Date.now()で現在時刻取得
    startTime = Date.now()
    countUp()

  })
}
