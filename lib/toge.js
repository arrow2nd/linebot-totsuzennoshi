'use strict'
import split from 'graphemesplit'

/**
 * 突然の死を作成
 * @param {String} message メッセージ
 * @returns トゲトゲ
 */
export function createToge(message) {
  const lines = message.split('\n')
  const lenMax = Math.max(...lines.map((v) => getDisplayWidth(v)))

  // 上
  const toge = [`＿人${'人'.repeat(lenMax)}人＿`]

  // 真ん中
  for (const line of lines) {
    const len = lenMax - getDisplayWidth(line)
    toge.push('＞　' + line + '　'.repeat(len) + '　＜')
  }

  // 下
  toge.push(`￣Y^${'Y^'.repeat(lenMax)}Y￣`)

  return toge.join('\n')
}

/**
 * 文字列の表示幅を取得する
 * @param  {String} text 文字列
 * @return {Number} 全角での表示幅
 */
function getDisplayWidth(text) {
  const hankakuRegexp = /[ -~ｦ-ﾟ]/
  const lines = split(text)

  let len = 0
  for (const line of lines) {
    len += hankakuRegexp.test(line) ? 0.5 : 1
  }

  return Math.ceil(len)
}
