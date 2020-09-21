'use strict';

{
  //必要な要素を取得
  const timer = document.getElementById('timer')
  const start = document.getElementById('start')
  const stop = document.getElementById('stop')
  const reset = document.getElementById('reset')

  let startTime //startクリック時の時間
  let timeoutId
  let elapsedTime = 0

  //タイマー機能
  function countUp() {
    //click時のstartTimeからの経過時間を求める
    //(今の時間) - (押したときの時間) = 0
    //console.log(Date.now() - startTime)
    //new Date()とすることでミリ秒を分秒に直せる
    const d = new Date(Date.now() - startTime + elapsedTime)

    const m = String(d.getMinutes()).padStart(2, '0')//分取得
    const s = String(d.getSeconds()).padStart(2, '0')//秒取得
    const ms = String(d.getMilliseconds()).padStart(3, 'o')
    //ミリ秒取得
    timer.textContent = `${m}:${s}:${ms}`

    //setTimeout() を使って 10 ミリ秒後にこの countUp() 自身を呼び出す
    //Startボタンを押したときの時刻をstartTImeで固定しつつ、その都度更新されるDate.now()から引くことで経過時間を求めています。
    timeoutId = setTimeout(() => {
      countUp()
    }, 10)
  }

  //タイマー開始
  start.addEventListener('click', () => {
    //Date.now()で現在時刻取得
    startTime = Date.now()
    countUp()

  })

  //タイマー停止
  stop.addEventListener('click', () => {
    //タイマー停止にはclearTimeoutメソッドを使用
    clearTimeout(timeoutId)

    //タイマー再開時
    //タイマーが走っていた時間を保持しておいて、また Start がクリックされたときにそれを足しあげてあげる。
    elapsedTime += Date.now() - startTime
    console.log(Date.now())
    console.log(startTime)
    console.log(elapsedTime)
    //stop時の時間-start時の時間＝経過時間
    //+=にして
    //elapsedTime = elapsedTime + Date.now() - startTime
    //この経過時間を再度スタートさせるときに足してあげる
  })

  //タイマーリセット
  reset.addEventListener('click', () => {
    //タイマーリセットにはtextContentを書き換える
    timer.textContent = '00:00:000'
    //リセットしたら経過時間も０にする
    elapsedTime = 0
  })

}
