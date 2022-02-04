/* eslint-disable no-undef */
'use strict'
import assert from 'assert'
import { createToge } from '../lib/toge.js'

const tests = [
  {
    title: '全角1文字',
    text: 'あ',
    expected: '＿人人人＿\n＞　あ　＜\n￣Y^Y^Y￣'
  },
  {
    title: '全角2文字',
    text: 'ああ',
    expected: '＿人人人人＿\n＞　ああ　＜\n￣Y^Y^Y^Y￣'
  },
  {
    title: '半角1文字',
    text: 'a',
    expected: '＿人人人＿\n＞　a　＜\n￣Y^Y^Y￣'
  },
  {
    title: '半角2文字',
    text: 'aA',
    expected: '＿人人人＿\n＞　aA　＜\n￣Y^Y^Y￣'
  },
  {
    title: '半角 + 全角',
    text: 'aあ',
    expected: '＿人人人人＿\n＞　aあ　＜\n￣Y^Y^Y^Y￣'
  },
  {
    title: '半角 + 全角 + 半角',
    text: 'aあA',
    expected: '＿人人人人＿\n＞　aあA　＜\n￣Y^Y^Y^Y￣'
  },
  {
    title: '半角カナ',
    text: 'ﾊﾝｶｸｶﾅ',
    expected: '＿人人人人人＿\n＞　ﾊﾝｶｸｶﾅ　＜\n￣Y^Y^Y^Y^Y￣'
  },
  {
    title: '絵文字',
    text: '😀',
    expected: '＿人人人＿\n＞　😀　＜\n￣Y^Y^Y￣'
  },
  {
    title: '絵文字（結合文字列）',
    text: '👨‍👩‍👧‍👦',
    expected: '＿人人人＿\n＞　👨‍👩‍👧‍👦　＜\n￣Y^Y^Y￣'
  },
  {
    title: '複数行1',
    text: 'あいうえお\nかきく',
    expected:
      '＿人人人人人人人＿\n＞　あいうえお　＜\n＞　かきく　　　＜\n￣Y^Y^Y^Y^Y^Y^Y￣'
  },
  {
    title: '複数行2',
    text: 'あい\nう',
    expected: '＿人人人人＿\n＞　あい　＜\n＞　う　　＜\n￣Y^Y^Y^Y￣'
  },
  {
    title: '複数行（空の行を含む）',
    text: 'あいうえお\n\nかきくけこ',
    expected:
      '＿人人人人人人人＿\n＞　あいうえお　＜\n＞　　　　　　　＜\n＞　かきくけこ　＜\n￣Y^Y^Y^Y^Y^Y^Y￣'
  }
]

describe('toge.js', () => {
  describe('#createToge()', () => {
    for (const { title, text, expected } of tests) {
      it(title, () => {
        assert.strictEqual(createToge(text), expected)
      })
    }
  })
})
