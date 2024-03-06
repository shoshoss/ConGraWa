■サービス概要
Fighterアプリは、自分自身や他者に向けて肯定的な応援メッセージを音声で送ることができるプラットフォームです。
ユーザーは自己肯定感を高め、相互の応援を通じて前向きな気持ちで取り組めることを目的としています。

■ このサービスへの思い・作りたい理由
以前、私は体調を崩し、退職に至りました。その後約一年間、鬱に近い状態で過ごしました。
この時期、自己肯定感の低さに苦しみ、自分自身への感謝がどれほど大切かを痛感しました。
また、周りからの応援が私の力になった経験から、同じようなサポートを他の人にも提供したいと思い、このアプリを開発したいと考えています。

■ ユーザー層について
このアプリは、自己肯定感を高めたい人々、ポジティブな変化を求める人々を対象としています。
自己改善に意欲的な個人や、コミュニティのサポートを求める人々にとって、有用なツールです。

■サービスの利用イメージ
ユーザーはアプリを使用して、自分の声で応援メッセージを録音し、自分自身や他者と共有できます。
これにより、自己肯定感の向上と相互のサポートを感じ、前向きに取り組めるようになります。

■ ユーザーの獲得について
Twitterや知り合い、Runteqのコミュニティを通じてアプリを宣伝します。自己成長やメンタルヘルスに関心があるユーザーグループをターゲットにしています。

■ サービスの差別化ポイント・推しポイント
他の自己肯定感向上アプリと異なり、Fighterアプリはユーザー同士の応援メッセージを重視しています。

■ 機能候補
**MVPリリース時の機能**
- **ユーザー登録機能**: 新規ユーザーがアカウントを作成できる機能。
- **ログイン機能**: ユーザーがアカウントにログインできる機能（Google認証も）。
- **ログアウト機能**: ユーザーがアカウントからログアウトできる機能。
- **ユーザープロファイル編集機能**: ユーザーが自己紹介文やプロフィール写真を設定できる機能。
- **基本的なコミュニケーション機能**: ユーザー間でフォローし、基本的なメッセージングを行う機能。
- **音声録音機能**: ユーザーが自分の声で応援メッセージを録音できる機能。
- **再生機能**: ユーザーが録音した音声メッセージを再生できる機能。
- **内容入力機能**: ユーザーが録音した音声メッセージに内容を入力できる機能。
- **音声送信機能**: ユーザーが録音した音声メッセージを他のユーザーに送信できる機能。
- **音声投稿機能**: ユーザーが録音した音声メッセージと内容を投稿できる機能。
- **音声投稿の削除機能**: ユーザーが投稿した内容を削除できる機能。
- **プライバシー設定**: ユーザーが音声メッセージの公開範囲を設定できる機能。
- **いいね機能**: ユーザーが他のユーザーの投稿に対していいねをする機能。

**本リリース時の機能**
- **ブロック機能**:
- **音声投稿の編集機能**: ユーザーが投稿した内容を編集できる機能。
- **自分の状態をアイコンで可視化する機能**: ユーザーが自分の現在の気持ちや状態をアイコンで表現し、記録できる機能。
- **カレンダー機能**: ユーザーが自分の活動や状態の変化を日付ごとに追跡し、振り返ることができる機能。
- **コメント機能**: ユーザーが音声メッセージに対してコメントを残せる機能。
- **お気に入り登録機能**: ユーザーが音声メッセージや画像をお気に入りとしてマークできる機能。
- **通知機能**: 新しいフォロワー、いいね、コメントなどの通知をユーザーが受け取れる機能。
- **タグ機能**: ユーザーが投稿にタグを付けて分類し、タグに基づく検索ができる機能。
- **検索機能**: ユーザーがユーザー名、タグ、投稿内容に基づいて検索できる機能。
- **お気に入りの投稿をユーザーページに表示する機能**: ユーザーが自分の好きなコンテンツに簡単にアクセスし、共有も可能な機能。
- **カスタムテンプレート**: ユーザーがメッセージ録音時に使用できるカスタマイズ可能なテンプレートを提供する機能。
- **アナリティクスツール**: ユーザーが投稿の閲覧数やいいね数などの統計を閲覧できる機能。
- **ソーシャルメディアシェア機能**: ユーザーが音声メッセージをSNSで直接シェアできる機能。

**追加の機能候補**
- **グループ共有機能**: ユーザーが特定のグループ内で音声メッセージを共有できる機能。
- **人気検索キーワード機能**: ユーザーが頻繁に検索されているキーワードのリストを表示する機能。
- **多様なスタンプとGIFの応答機能**: ユーザーがいいねだけでなく、さまざまなスタンプやGIFで反応できる機能。
- **音声と画像の同時投稿機能**: ユーザーが音声メッセージに画像を同時に投稿できる機能。
- **カスタムプレイリスト**: ユーザーがお気に入り登録した投稿からプレイリストを作成できる機能。
- **リピート再生機能**: ユーザーが自動再生やリピート再生を設定できる機能。
- **カスタマイズ再生機能**: ユーザーの過去の行動に基づいて、カスタマイズされたプレイリストを生成し、再生する機能。

■ 機能の実装方針予定
- **音声録音・再生**: Web Audio APIとネイティブの音声録音機能を活用し、RailsとReactで管理します。
- **コミュニケーション機能**: WebSocketやFirebaseを利用したリアルタイムメッセージングの実装を検討します。RailsではActionCableを使い、React/TypeScriptフロントエンドで対応します。
- **プライバシー設定**: OAuthやJWTを使用した認証システムをRailsで実装し、セキュリティを確保します。
- **アナリティクス**: Google AnalyticsやFirebase Analyticsを組み込み、ユーザー行動の分析を実施します。
- **ソーシャルメディアシェア機能**: SNSへの直接シェアは、各プラットフォームのAPIを活用して実装します。ReactでのUI統合を含みます。

### 画面遷移図
Figma：https://www.figma.com/file/2YTQ4ytdWl1pL92nNYW53W/Fighter-APP?type=design&node-id=0%3A1&mode=design&t=krpjwS74vNt8PdHb-1

### READMEに記載した機能
- [x] ユーザー登録機能
- [x] ログイン機能
- [x] パスワード変更機能
- [x] ユーザープロファイル編集機能
- [x] 基本的なコミュニケーション機能
- [x] 音声録音機能
- [x] 再生機能
- [x] 内容入力機能
- [x] 音声送信機能
- [x] 音声投稿機能
- [x] 閲覧機能（未ログインでも閲覧可能）
- [x] 音声投稿の削除機能
- [x] いいね機能


### 未ログインでも閲覧または利用できるページ
以下の項目は適切に未ログインでも閲覧または利用できる画面遷移になっているか？
- [x] コメント閲覧機能（未ログインでも閲覧可能）

### メールアドレス・パスワード変更確認項目
直接変更できるものではなく、一旦メールなどを介して専用のページで変更する画面遷移になっているか？
- [x] メールアドレス
- [x] パスワード