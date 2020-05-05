'use strict';
const express = require('express');
const split = require('graphemesplit');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 5000;
const config = {
  channelAccessToken: process.env.ACCESS_TOKEN || 'xxx',
  channelSecret: process.env.SECRET_KEY || 'xxx'
};

const client = new line.Client(config);

express()
  .post('/hook/', line.middleware(config), (req, res) => lineBot(req, res))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

// LINEBot
function lineBot(req, res) {
  res.status(200).end();
  const events = req.body.events;
  for (let i = 0, l = events.length; i < l; i++) {
    const ev = events[i];
    // メッセージイベント以外、webhook検証ならreturn
    if (ev.type !== 'message' || ev.replyToken === '00000000000000000000000000000000' || ev.replyToken === 'ffffffffffffffffffffffffffffffff') {
      console.log(`メッセージイベントではありません : ${ev.type}`);
      continue;
    }; 
    createTotuzennosi(ev);
  };
};

// 突然の死
function createTotuzennosi(ev){
  // テキスト以外ならreturn
  if (ev.message.type !== 'text') {
    return client.replyMessage(ev.replyToken, {
      type: 'text',
      text: 'テキストでお願いします！'
    });
  };

  const text = ev.message.text;
  const texts = text.split('\n');

  // 一番長い文字数を取得
  let lenMax = 0;
  texts.forEach(text => {
    const length = getLength(text);
    lenMax = lenMax < length ? length : lenMax;
  });

  // 上
  const lines = []; 
  lines.push('＿人' + '人'.repeat(lenMax) + '人＿');
  
  // 真ん中
  texts.forEach(text => {
    lines.push('＞　' + text + '　'.repeat(lenMax - getLength(text)) + '　＜');
  });

  // 下
  lines.push('￣Y^' + 'Y^'.repeat(lenMax) + 'Y￣');

  // 結合
  const result = lines.reduce((accumulator, currentValue) => {
    return accumulator + '\n' + currentValue;
  });

  // 返信
  return client.replyMessage(ev.replyToken, {
    type: 'text',
    text: result
  });  
};

// 文字列の長さを取得
function getLength(text){
  let len = 0;
  const texts = split(text);
  texts.forEach(value => {
    if (!value.match(/[^\x01-\x7E]/) || !value.match(/[^\uFF65-\uFF9F]/)) {
      len = len + 0.5;
    } else {
      len = len + [...value].length;
    };
  });
  return Math.ceil(len);
};