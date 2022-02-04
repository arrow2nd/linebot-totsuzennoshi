'use strict'
import split from 'graphemesplit'

/**
 * 文字列からトゲAAを作成
 * @param {String} message
 * @returns トゲAA
 */
export function createToge(message) {
  const lines = message.split('\n')
  const lenMax = Math.max(...lines.map((v) => getLength(v)))

  // 上
  const toge = [`＿人${'人'.repeat(lenMax)}人＿`]

  // 真ん中
  for (const line of lines) {
    const len = lenMax - getLength(message)
    toge.push('＞　' + line + '　'.repeat(len) + '　＜')
  }

  // 下
  toge.push(`￣Y^${'Y^'.repeat(lenMax)}Y￣`)

  return toge.join('\n')
}

/**
 * 文字列の長さを取得する
 * @param  {String} text テキスト
 * @return {Number} 全角での文字列の長さ
 */
function getLength(text) {
  const lines = split(text)
  let len = 0

  for (const line of lines) {
    // 半角文字
    // eslint-disable-next-line no-control-regex
    if (!line.match(/[^\x01-\x7E]/) || !line.match(/[^\uFF65-\uFF9F]/)) {
      len += 0.5
    } else {
      len += [...line].length
    }
  }

  return Math.ceil(len)
}
