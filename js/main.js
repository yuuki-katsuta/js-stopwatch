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

  //ボタンの状態をセットする関数

  //デフォルトで適用させる
  setButtonStateInitial()

  //デフォルト
  function setButtonStateInitial() {
    start.classList.remove('inactive')
    stop.classList.add('inactive')
    reset.classList.add('inactive')
  }

  //タイマー起動中
  function setButtonStateRunning() {
    start.classList.add('inactive')
    stop.classList.remove('inactive')
    reset.classList.add('inactive')
  }

  //止めたあと
  function setButtonStateStopped() {
    start.classList.remove('inactive')
    stop.classList.add('inactive')
    reset.classList.remove('inactive')
  }

  //タイマー開始
  start.addEventListener('click', () => {
    if (start.classList.contains('inactive') === true) {
      //inactiveクラスが含まれているかどうかを確認している
      return
      //returnでそれ以降の処理setButtonStateRunning()などを停止することで、ボタン連打を無効化している
    }
    setButtonStateRunning()
    //Date.now()で現在時刻取得
    startTime = Date.now()
    countUp()

  })

  //タイマー停止
  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive') === true) {
      return
    }
    setButtonStateStopped()
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
    if (reset.classList.contains('inactive') === true) {
      return
    }
    setButtonStateInitial()
    //タイマーリセットにはtextContentを書き換える
    timer.textContent = '00:00:000'
    //リセットしたら経過時間も０にする
    elapsedTime = 0
  })

}
