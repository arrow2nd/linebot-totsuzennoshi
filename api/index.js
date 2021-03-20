'use strict'
const express = require('express')
const split = require('graphemesplit')
const line = require('@line/bot-sdk')
require('dotenv').config()

const PORT = process.env.PORT
const config = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET_KEY
}
const client = new line.Client(config)

// ルーティング
const app = express()
app.get('/', (_req, res) => res.send('ok! (GET)'))
app.post('/hook/', line.middleware(config), async (req, res) => {
  await Promise.all(req.body.events.map((e) => main(e)))
  res.status(200).end()
})

// メイン
async function main(ev) {
  // テキスト以外の場合
  if (ev.message.type !== 'text') {
    await client.replyMessage(ev.replyToken, {
      type: 'text',
      text:
        '＿人人人人人人人人人人人人人＿\n＞　テキストでお願いします　＜\n￣Y^Y^Y^Y^Y^Y^Y^Y^Y^Y^Y^Y^Y￣'
    })
    return
  }

  // AA作成
  const lines = ev.message.text.split('\n')
  const lenMax = Math.max(...lines.map((v) => getLength(v)))
  const toge = ['＿人' + '人'.repeat(lenMax) + '人＿']

  // 真ん中
  lines.forEach((text) =>
    toge.push('＞　' + text + '　'.repeat(lenMax - getLength(text)) + '　＜')
  )

  // 下
  toge.push('￣Y^' + 'Y^'.repeat(lenMax) + 'Y￣')

  // 返信
  const result = toge.reduce(
    (accumulator, currentValue) => accumulator + '\n' + currentValue
  )
  await client.replyMessage(ev.replyToken, {
    type: 'text',
    text: result
  })
}

/**
 * 文字列の長さを取得する
 *
 * @param  {String} text テキスト
 * @return {Number}      全角での文字列の長さ
 */
function getLength(text) {
  const lines = split(text)
  let len = 0
  lines.forEach((value) => {
    // eslint-disable-next-line no-control-regex
    if (!value.match(/[^\x01-\x7E]/) || !value.match(/[^\uFF65-\uFF9F]/)) {
      len += 0.5
    } else {
      len += [...value].length
    }
  })
  return Math.ceil(len)
}

// vercel
process.env.NOW_REGION
  ? (module.exports = app)
  : app.listen(PORT, () => console.log(`Listening on ${PORT}`))
