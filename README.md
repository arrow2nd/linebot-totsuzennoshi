# linebot-totsuzennoshi

[![test](https://github.com/arrow2nd/linebot-totsuzennoshi/actions/workflows/test.yml/badge.svg)](https://github.com/arrow2nd/linebot-totsuzennoshi/actions/workflows/test.yml)

突然の死 AA を作る LINEBot 💀

## 友だち登録

![QR](https://user-images.githubusercontent.com/44780846/81030955-a1a70300-8ec5-11ea-81bc-b2a2bb59e0dc.png)

<a href="https://lin.ee/2OnfDEwtE"><img src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" alt="友だち追加" height="36" border="0"></a>

## 使い方

友だち登録して、強調したい文を送信してください

![ScreenShot](https://user-images.githubusercontent.com/44780846/81038126-f5bee100-8edf-11ea-9eb2-4f1b1549fb14.png)

## 注意

- 文字によっては表示が崩れる場合があります

## プライバシーポリシー

[こちら](https://arrow2nd.github.io/linebot-totsuzennoshi/) をご覧ください

## 実行

以下の内容で `.env`を作成

```
PORT=<ポート番号>
ACCESS_TOKEN=<LINEBotアクセストークン>
SECRET_KEY=<LINEBotシークレットキー>
```

ngrok 等でポートを公開し、吐き出された URL を LINEBot の 管理画面から Webhook に登録

```
ngrok http <ポート番号>
```

実行！

```
yarn start
```

## 元ネタ

> https://dic.nicovideo.jp/a/%E7%AA%81%E7%84%B6%E3%81%AE%E6%AD%BB
