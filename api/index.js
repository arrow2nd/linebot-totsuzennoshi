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


const app = express();
app.get('/', (req, res) => res.send('ok! (GET)'));
app.post('/hook/', line.middleware(config), async (req, res) => {
    await Promise.all(req.body.events.map(reply));
    console.log('success!');
    res.status(200).end();
});


/**
 * 突然の死を作る
 * @param {Object} ev イベント
 */
async function reply(ev){
    // メッセージイベント以外・検証の場合
    if (ev.type !== 'message' || ev.replyToken === '00000000000000000000000000000000' || ev.replyToken === 'ffffffffffffffffffffffffffffffff') {
        console.log(`メッセージイベントではありません : ${ev.type}`);
        return;
    }; 

    // テキスト以外の場合
    if (ev.message.type !== 'text') {
        await client.replyMessage(ev.replyToken, {
            type: 'text',
            text: '＿人人人人人人人人人人人人人＿\n＞　テキストでお願いします　＜\n￣Y^Y^Y^Y^Y^Y^Y^Y^Y^Y^Y^Y^Y￣'
        });
        return;
    };

    // メッセージテキストを取得
    const text = ev.message.text;
    const texts = text.split('\n');

    // テキスト内で一番長い文字数を取得
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

    // トゲトゲを返信する
    await client.replyMessage(ev.replyToken, {
        type: 'text',
        text: result
    });  
};

/**
 * 文字列の長さを取得する
 * @param  {String} text テキスト
 * @return {Number}      全角での文字列の長さ
 */
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

// vercel
(process.env.NOW_REGION) ? module.exports = app : app.listen(PORT);
