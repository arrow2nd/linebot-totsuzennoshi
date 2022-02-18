import 'dotenv/config'
import express from 'express'
import { Client, middleware } from '@line/bot-sdk'

import { createToge } from '../lib/toge.js'

const PORT = process.env.PORT
const config = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET_KEY
}

const client = new Client(config)
const app = express()

// ルーティング
app.get('/', (_req, res) => res.send('ok! (GET)'))
app.post('/hook/', middleware(config), async (req, res) => {
  await Promise.all(req.body.events.map((e) => main(e)))
  res.status(200).end()
})

// Botメイン
async function main(ev) {
  await client.replyMessage(ev.replyToken, {
    type: 'text',
    text: createToge(
      ev.message.type === 'text' ? ev.message.text : 'テキストでお願いします'
    )
  })
}

// ローカル環境
if (!process.env.NOW_REGION) {
  app.listen(PORT, () => console.log(`Listening on ${PORT}`))
}

export default app
