// Scene-based English Learning Data
// 日常場面別の英会話フレーズ集

export interface Phrase {
  english: string;
  japanese: string;
  pronunciation: string; // カタカナ発音
  situation: string; // どんな時に使うか
}

export interface Scene {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  subScenes: SubScene[];
}

export interface SubScene {
  id: string;
  name: string;
  phrases: Phrase[];
}

export const scenesData: Scene[] = [
  // ========== 空港 ==========
  {
    id: "airport",
    name: "空港",
    nameEn: "Airport",
    icon: "✈️",
    description: "空港でのチェックインから搭乗までの英会話",
    subScenes: [
      {
        id: "airport-checkin",
        name: "チェックイン",
        phrases: [
          { english: "I'd like to check in for my flight.", japanese: "フライトのチェックインをお願いします。", pronunciation: "アイドゥ ライク トゥ チェックイン フォー マイ フライト", situation: "チェックインカウンターで" },
          { english: "Here's my passport and booking confirmation.", japanese: "パスポートと予約確認書です。", pronunciation: "ヒアズ マイ パスポート アンド ブッキング コンファメーション", situation: "書類を渡す時" },
          { english: "Can I have a window seat, please?", japanese: "窓側の席をお願いできますか？", pronunciation: "キャナイ ハヴ ア ウィンドウ シート プリーズ", situation: "座席の希望を伝える時" },
          { english: "Can I have an aisle seat, please?", japanese: "通路側の席をお願いできますか？", pronunciation: "キャナイ ハヴ アン アイル シート プリーズ", situation: "座席の希望を伝える時" },
          { english: "How much is the baggage allowance?", japanese: "手荷物の許容量はどれくらいですか？", pronunciation: "ハウマッチ イズ ザ バゲッジ アラウアンス", situation: "荷物の重量を確認する時" },
          { english: "I have one checked bag and one carry-on.", japanese: "預け荷物1つと機内持ち込み1つです。", pronunciation: "アイ ハヴ ワン チェックト バッグ アンド ワン キャリーオン", situation: "荷物の数を伝える時" },
          { english: "Is my flight on time?", japanese: "私のフライトは定刻通りですか？", pronunciation: "イズ マイ フライト オン タイム", situation: "遅延を確認する時" },
          { english: "What gate do I go to?", japanese: "どのゲートに行けばいいですか？", pronunciation: "ワット ゲイト ドゥ アイ ゴー トゥ", situation: "搭乗ゲートを確認する時" },
        ]
      },
      {
        id: "airport-gate",
        name: "搭乗ゲート",
        phrases: [
          { english: "Is this the gate for flight to Tokyo?", japanese: "これは東京行きのゲートですか？", pronunciation: "イズ ディス ザ ゲイト フォー フライト トゥ トーキョー", situation: "ゲートを確認する時" },
          { english: "When does boarding start?", japanese: "搭乗は何時から始まりますか？", pronunciation: "ウェン ダズ ボーディング スタート", situation: "搭乗時間を確認する時" },
          { english: "Has the flight been delayed?", japanese: "フライトは遅延していますか？", pronunciation: "ハズ ザ フライト ビーン ディレイド", situation: "遅延状況を確認する時" },
          { english: "Where can I find a charging station?", japanese: "充電できる場所はどこですか？", pronunciation: "ウェア キャナイ ファインド ア チャージング ステーション", situation: "充電場所を探す時" },
          { english: "Is there free Wi-Fi here?", japanese: "ここに無料Wi-Fiはありますか？", pronunciation: "イズ ゼア フリー ワイファイ ヒア", situation: "Wi-Fiを確認する時" },
          { english: "I missed my connecting flight.", japanese: "乗り継ぎ便に乗り遅れました。", pronunciation: "アイ ミスト マイ コネクティング フライト", situation: "乗り遅れた時" },
        ]
      },
      {
        id: "airport-baggage",
        name: "手荷物受取",
        phrases: [
          { english: "Where is the baggage claim?", japanese: "手荷物受取所はどこですか？", pronunciation: "ウェア イズ ザ バゲッジ クレイム", situation: "到着後" },
          { english: "Which carousel is for flight XX?", japanese: "XX便の荷物はどのターンテーブルですか？", pronunciation: "ウィッチ カルーセル イズ フォー フライト", situation: "ターンテーブルを確認する時" },
          { english: "My luggage hasn't arrived.", japanese: "私の荷物が届いていません。", pronunciation: "マイ ラゲッジ ハズント アライヴド", situation: "荷物が見つからない時" },
          { english: "My suitcase is damaged.", japanese: "スーツケースが破損しています。", pronunciation: "マイ スーツケース イズ ダメージド", situation: "荷物が壊れていた時" },
          { english: "I'd like to file a lost baggage report.", japanese: "紛失届を出したいのですが。", pronunciation: "アイドゥ ライク トゥ ファイル ア ロスト バゲッジ レポート", situation: "荷物紛失を報告する時" },
          { english: "Here's my baggage claim tag.", japanese: "こちらが荷物引換証です。", pronunciation: "ヒアズ マイ バゲッジ クレイム タグ", situation: "タグを見せる時" },
        ]
      }
    ]
  },

  // ========== 機内 ==========
  {
    id: "airplane",
    name: "機内",
    nameEn: "On the Plane",
    icon: "🛫",
    description: "フライト中の機内での英会話",
    subScenes: [
      {
        id: "airplane-seat",
        name: "座席の確認",
        phrases: [
          { english: "Excuse me, I think this is my seat.", japanese: "すみません、ここは私の席だと思います。", pronunciation: "エクスキューズミー アイ シンク ディス イズ マイ シート", situation: "席が間違えられている時" },
          { english: "May I recline my seat?", japanese: "座席を倒してもいいですか？", pronunciation: "メイ アイ リクライン マイ シート", situation: "後ろの人に確認する時" },
          { english: "Could you help me with my overhead luggage?", japanese: "上の荷物を取るのを手伝ってもらえますか？", pronunciation: "クッジュー ヘルプミー ウィズ マイ オーバーヘッド ラゲッジ", situation: "荷物を取りたい時" },
          { english: "Is it okay to switch seats?", japanese: "席を交換してもいいですか？", pronunciation: "イズイット オーケイ トゥ スイッチ シーツ", situation: "席を変わりたい時" },
          { english: "How do I use this entertainment system?", japanese: "このエンターテイメントシステムはどう使いますか？", pronunciation: "ハウ ドゥ アイ ユーズ ディス エンターテインメント システム", situation: "画面の使い方を聞く時" },
        ]
      },
      {
        id: "airplane-meal",
        name: "機内食の注文",
        phrases: [
          { english: "What are my meal options?", japanese: "食事の選択肢は何がありますか？", pronunciation: "ワット アー マイ ミール オプションズ", situation: "機内食を選ぶ時" },
          { english: "I'll have the chicken, please.", japanese: "チキンをお願いします。", pronunciation: "アイル ハヴ ザ チキン プリーズ", situation: "食事を選ぶ時" },
          { english: "Do you have any vegetarian options?", japanese: "ベジタリアンメニューはありますか？", pronunciation: "ドゥ ユー ハヴ エニー ベジタリアン オプションズ", situation: "特別食を頼む時" },
          { english: "Can I have some water, please?", japanese: "お水をいただけますか？", pronunciation: "キャナイ ハヴ サム ウォーター プリーズ", situation: "飲み物を頼む時" },
          { english: "Could I have a blanket and pillow?", japanese: "ブランケットと枕をいただけますか？", pronunciation: "クッダイ ハヴ ア ブランケット アンド ピロー", situation: "寝具を頼む時" },
          { english: "Is there coffee or tea?", japanese: "コーヒーか紅茶はありますか？", pronunciation: "イズ ゼア コーヒー オア ティー", situation: "温かい飲み物を頼む時" },
        ]
      },
      {
        id: "airplane-ca",
        name: "CAへの依頼",
        phrases: [
          { english: "Excuse me, could you help me?", japanese: "すみません、助けていただけますか？", pronunciation: "エクスキューズミー クッジュー ヘルプミー", situation: "CAを呼ぶ時" },
          { english: "I'm not feeling well.", japanese: "気分が悪いです。", pronunciation: "アイム ノット フィーリング ウェル", situation: "体調不良を伝える時" },
          { english: "Do you have any medicine for headaches?", japanese: "頭痛薬はありますか？", pronunciation: "ドゥ ユー ハヴ エニー メディスン フォー ヘデイクス", situation: "薬を求める時" },
          { english: "How much longer until we land?", japanese: "着陸まであとどのくらいですか？", pronunciation: "ハウマッチ ロンガー アンティル ウィー ランド", situation: "到着時間を確認する時" },
          { english: "Could you turn down the air conditioning?", japanese: "エアコンを弱めてもらえますか？", pronunciation: "クッジュー ターンダウン ジ エアコンディショニング", situation: "温度調整を頼む時" },
          { english: "Where are the restrooms?", japanese: "お手洗いはどこですか？", pronunciation: "ウェア アー ザ レストルームズ", situation: "トイレの場所を聞く時" },
        ]
      }
    ]
  },

  // ========== ホテル ==========
  {
    id: "hotel",
    name: "ホテル",
    nameEn: "Hotel",
    icon: "🏨",
    description: "ホテルでのチェックインからチェックアウトまで",
    subScenes: [
      {
        id: "hotel-checkin",
        name: "チェックイン/アウト",
        phrases: [
          { english: "I have a reservation under the name...", japanese: "...の名前で予約しています。", pronunciation: "アイ ハヴ ア リザベーション アンダー ザ ネイム", situation: "チェックイン時" },
          { english: "I'd like to check in, please.", japanese: "チェックインをお願いします。", pronunciation: "アイドゥ ライク トゥ チェックイン プリーズ", situation: "チェックイン時" },
          { english: "What time is checkout?", japanese: "チェックアウトは何時ですか？", pronunciation: "ワット タイム イズ チェックアウト", situation: "時間を確認する時" },
          { english: "Can I have a late checkout?", japanese: "レイトチェックアウトはできますか？", pronunciation: "キャナイ ハヴ ア レイト チェックアウト", situation: "延長を頼む時" },
          { english: "I'd like to check out now.", japanese: "チェックアウトをお願いします。", pronunciation: "アイドゥ ライク トゥ チェックアウト ナウ", situation: "チェックアウト時" },
          { english: "Can I store my luggage here?", japanese: "荷物を預けられますか？", pronunciation: "キャナイ ストア マイ ラゲッジ ヒア", situation: "荷物を預ける時" },
          { english: "Is breakfast included?", japanese: "朝食は含まれていますか？", pronunciation: "イズ ブレックファスト インクルーデッド", situation: "朝食を確認する時" },
        ]
      },
      {
        id: "hotel-roomservice",
        name: "ルームサービス",
        phrases: [
          { english: "I'd like to order room service.", japanese: "ルームサービスを注文したいのですが。", pronunciation: "アイドゥ ライク トゥ オーダー ルーム サービス", situation: "ルームサービスを頼む時" },
          { english: "Can I see the room service menu?", japanese: "ルームサービスのメニューを見せてもらえますか？", pronunciation: "キャナイ シー ザ ルーム サービス メニュー", situation: "メニューを確認する時" },
          { english: "How long will it take?", japanese: "どのくらい時間がかかりますか？", pronunciation: "ハウ ロング ウィル イット テイク", situation: "待ち時間を確認する時" },
          { english: "Could I have extra towels?", japanese: "タオルを追加でいただけますか？", pronunciation: "クッダイ ハヴ エクストラ タウエルズ", situation: "タオルを頼む時" },
          { english: "The room needs cleaning.", japanese: "部屋の掃除をお願いします。", pronunciation: "ザ ルーム ニーズ クリーニング", situation: "清掃を頼む時" },
          { english: "Can I have a wake-up call at 7 AM?", japanese: "朝7時にモーニングコールをお願いできますか？", pronunciation: "キャナイ ハヴ ア ウェイクアップ コール アット セブン エイエム", situation: "モーニングコールを頼む時" },
        ]
      },
      {
        id: "hotel-facilities",
        name: "設備の問い合わせ",
        phrases: [
          { english: "Where is the gym?", japanese: "ジムはどこですか？", pronunciation: "ウェア イズ ザ ジム", situation: "ジムの場所を聞く時" },
          { english: "What are the pool hours?", japanese: "プールは何時から何時までですか？", pronunciation: "ワット アー ザ プール アワーズ", situation: "プールの営業時間を聞く時" },
          { english: "Is there a business center?", japanese: "ビジネスセンターはありますか？", pronunciation: "イズ ゼア ア ビジネス センター", situation: "ビジネス施設を聞く時" },
          { english: "What's the Wi-Fi password?", japanese: "Wi-Fiのパスワードは何ですか？", pronunciation: "ワッツ ザ ワイファイ パスワード", situation: "Wi-Fiを使う時" },
          { english: "The air conditioning isn't working.", japanese: "エアコンが動きません。", pronunciation: "ジ エアコンディショニング イズント ワーキング", situation: "故障を報告する時" },
          { english: "Is there a shuttle to the airport?", japanese: "空港へのシャトルバスはありますか？", pronunciation: "イズ ゼア ア シャトル トゥ ジ エアポート", situation: "送迎を確認する時" },
        ]
      }
    ]
  },

  // ========== レストラン ==========
  {
    id: "restaurant",
    name: "レストラン",
    nameEn: "Restaurant",
    icon: "🍽️",
    description: "レストランでの予約から会計まで",
    subScenes: [
      {
        id: "restaurant-reservation",
        name: "予約",
        phrases: [
          { english: "I'd like to make a reservation.", japanese: "予約をしたいのですが。", pronunciation: "アイドゥ ライク トゥ メイク ア リザベーション", situation: "予約する時" },
          { english: "A table for two, please.", japanese: "2名でお願いします。", pronunciation: "ア テーブル フォー トゥー プリーズ", situation: "人数を伝える時" },
          { english: "Do you have a table available tonight?", japanese: "今夜空いているテーブルはありますか？", pronunciation: "ドゥ ユー ハヴ ア テーブル アベイラブル トゥナイト", situation: "空席を確認する時" },
          { english: "I have a reservation at 7 PM.", japanese: "7時に予約しています。", pronunciation: "アイ ハヴ ア リザベーション アット セブン ピーエム", situation: "到着時" },
          { english: "How long is the wait?", japanese: "待ち時間はどのくらいですか？", pronunciation: "ハウ ロング イズ ザ ウェイト", situation: "待ち時間を聞く時" },
          { english: "Can we sit outside?", japanese: "外の席に座れますか？", pronunciation: "キャン ウィー シット アウトサイド", situation: "席の希望を伝える時" },
        ]
      },
      {
        id: "restaurant-order",
        name: "注文",
        phrases: [
          { english: "Could we see the menu, please?", japanese: "メニューを見せていただけますか？", pronunciation: "クッド ウィー シー ザ メニュー プリーズ", situation: "メニューを頼む時" },
          { english: "What do you recommend?", japanese: "おすすめは何ですか？", pronunciation: "ワット ドゥ ユー レコメンド", situation: "おすすめを聞く時" },
          { english: "I'll have the steak, please.", japanese: "ステーキをお願いします。", pronunciation: "アイル ハヴ ザ ステイク プリーズ", situation: "注文する時" },
          { english: "How would you like your steak?", japanese: "ステーキの焼き加減はいかがしますか？", pronunciation: "ハウ ウッジュー ライク ユア ステイク", situation: "焼き加減を聞かれた時" },
          { english: "Medium rare, please.", japanese: "ミディアムレアでお願いします。", pronunciation: "ミディアム レア プリーズ", situation: "焼き加減を答える時" },
          { english: "Does this contain nuts?", japanese: "これにはナッツが入っていますか？", pronunciation: "ダズ ディス コンテイン ナッツ", situation: "アレルギーを確認する時" },
          { english: "I'm allergic to shellfish.", japanese: "私は甲殻類アレルギーです。", pronunciation: "アイム アラージック トゥ シェルフィッシュ", situation: "アレルギーを伝える時" },
          { english: "Could I have this without onions?", japanese: "玉ねぎ抜きでお願いできますか？", pronunciation: "クッダイ ハヴ ディス ウィズアウト オニオンズ", situation: "カスタマイズする時" },
        ]
      },
      {
        id: "restaurant-payment",
        name: "会計",
        phrases: [
          { english: "Could we have the check, please?", japanese: "お会計をお願いします。", pronunciation: "クッド ウィー ハヴ ザ チェック プリーズ", situation: "会計を頼む時" },
          { english: "Can we pay separately?", japanese: "別々に払えますか？", pronunciation: "キャン ウィー ペイ セパレートリー", situation: "割り勘にする時" },
          { english: "Do you accept credit cards?", japanese: "クレジットカードは使えますか？", pronunciation: "ドゥ ユー アクセプト クレジット カーズ", situation: "支払い方法を確認する時" },
          { english: "Is service charge included?", japanese: "サービス料は含まれていますか？", pronunciation: "イズ サービス チャージ インクルーデッド", situation: "サービス料を確認する時" },
          { english: "Keep the change.", japanese: "お釣りは結構です。", pronunciation: "キープ ザ チェンジ", situation: "チップを渡す時" },
          { english: "Could I have a receipt, please?", japanese: "領収書をいただけますか？", pronunciation: "クッダイ ハヴ ア レシート プリーズ", situation: "領収書を頼む時" },
        ]
      }
    ]
  },

  // ========== カフェ ==========
  {
    id: "cafe",
    name: "カフェ",
    nameEn: "Cafe",
    icon: "☕",
    description: "カフェでのドリンク注文やカスタマイズ",
    subScenes: [
      {
        id: "cafe-order",
        name: "ドリンクの注文",
        phrases: [
          { english: "Can I get a medium latte, please?", japanese: "ミディアムサイズのラテをお願いします。", pronunciation: "キャナイ ゲット ア ミディアム ラテ プリーズ", situation: "ドリンクを注文する時" },
          { english: "What sizes do you have?", japanese: "サイズは何がありますか？", pronunciation: "ワット サイズィズ ドゥ ユー ハヴ", situation: "サイズを確認する時" },
          { english: "I'd like an iced coffee.", japanese: "アイスコーヒーをください。", pronunciation: "アイドゥ ライク アン アイスト コーヒー", situation: "アイスドリンクを頼む時" },
          { english: "Do you have any decaf options?", japanese: "カフェインレスはありますか？", pronunciation: "ドゥ ユー ハヴ エニー ディキャフ オプションズ", situation: "デカフェを頼む時" },
          { english: "What's your most popular drink?", japanese: "一番人気のドリンクは何ですか？", pronunciation: "ワッツ ユア モースト ポピュラー ドリンク", situation: "人気メニューを聞く時" },
        ]
      },
      {
        id: "cafe-customize",
        name: "カスタマイズ",
        phrases: [
          { english: "Can I have oat milk instead?", japanese: "オーツミルクに変更できますか？", pronunciation: "キャナイ ハヴ オート ミルク インステッド", situation: "ミルクを変更する時" },
          { english: "Extra shot of espresso, please.", japanese: "エスプレッソショットを追加でお願いします。", pronunciation: "エクストラ ショット オブ エスプレッソ プリーズ", situation: "濃さを調整する時" },
          { english: "Less ice, please.", japanese: "氷少なめでお願いします。", pronunciation: "レス アイス プリーズ", situation: "氷の量を調整する時" },
          { english: "Can I have it with no sugar?", japanese: "砂糖なしでお願いできますか？", pronunciation: "キャナイ ハヴ イット ウィズ ノー シュガー", situation: "甘さを調整する時" },
          { english: "Could you make it extra hot?", japanese: "熱めにしてもらえますか？", pronunciation: "クッジュー メイク イット エクストラ ホット", situation: "温度を調整する時" },
          { english: "Add whipped cream, please.", japanese: "ホイップクリームを追加してください。", pronunciation: "アッド ウィップト クリーム プリーズ", situation: "トッピングを追加する時" },
        ]
      },
      {
        id: "cafe-takeout",
        name: "テイクアウト",
        phrases: [
          { english: "For here or to go?", japanese: "店内でお召し上がりですか、お持ち帰りですか？", pronunciation: "フォー ヒア オア トゥ ゴー", situation: "店員に聞かれた時" },
          { english: "To go, please.", japanese: "テイクアウトでお願いします。", pronunciation: "トゥ ゴー プリーズ", situation: "持ち帰りを伝える時" },
          { english: "Can I have a cup holder?", japanese: "カップホルダーをいただけますか？", pronunciation: "キャナイ ハヴ ア カップ ホルダー", situation: "複数のドリンクを持ち帰る時" },
          { english: "Could I have a sleeve, please?", japanese: "スリーブをいただけますか？", pronunciation: "クッダイ ハヴ ア スリーブ プリーズ", situation: "熱いドリンクを持つ時" },
          { english: "Do you have a rewards program?", japanese: "ポイントプログラムはありますか？", pronunciation: "ドゥ ユー ハヴ ア リワーズ プログラム", situation: "ポイントを確認する時" },
        ]
      }
    ]
  },

  // ========== ショッピング ==========
  {
    id: "shopping",
    name: "ショッピング",
    nameEn: "Shopping",
    icon: "🛍️",
    description: "買い物での試着からお支払いまで",
    subScenes: [
      {
        id: "shopping-fitting",
        name: "試着",
        phrases: [
          { english: "Can I try this on?", japanese: "これを試着してもいいですか？", pronunciation: "キャナイ トライ ディス オン", situation: "試着を頼む時" },
          { english: "Where are the fitting rooms?", japanese: "試着室はどこですか？", pronunciation: "ウェア アー ザ フィッティング ルームズ", situation: "試着室を探す時" },
          { english: "How many items can I take in?", japanese: "何点まで持ち込めますか？", pronunciation: "ハウ メニー アイテムズ キャナイ テイク イン", situation: "持ち込み点数を確認する時" },
          { english: "It doesn't fit.", japanese: "サイズが合いません。", pronunciation: "イット ダズント フィット", situation: "サイズが合わない時" },
          { english: "Do you have this in a larger size?", japanese: "これのもっと大きいサイズはありますか？", pronunciation: "ドゥ ユー ハヴ ディス イン ア ラージャー サイズ", situation: "大きいサイズを頼む時" },
          { english: "This fits perfectly!", japanese: "ぴったりです！", pronunciation: "ディス フィッツ パーフェクトリー", situation: "サイズが合った時" },
        ]
      },
      {
        id: "shopping-size",
        name: "サイズ確認",
        phrases: [
          { english: "What size is this?", japanese: "これは何サイズですか？", pronunciation: "ワット サイズ イズ ディス", situation: "サイズを確認する時" },
          { english: "Do you have this in medium?", japanese: "これのMサイズはありますか？", pronunciation: "ドゥ ユー ハヴ ディス イン ミディアム", situation: "特定のサイズを探す時" },
          { english: "I'm usually a size 8.", japanese: "普段は8号を着ています。", pronunciation: "アイム ユージュアリー ア サイズ エイト", situation: "サイズを伝える時" },
          { english: "Could you measure me?", japanese: "採寸してもらえますか？", pronunciation: "クッジュー メジャー ミー", situation: "採寸を頼む時" },
          { english: "Is this true to size?", japanese: "このサイズは標準的ですか？", pronunciation: "イズ ディス トゥルー トゥ サイズ", situation: "サイズ感を確認する時" },
        ]
      },
      {
        id: "shopping-payment",
        name: "支払い",
        phrases: [
          { english: "I'll take this one.", japanese: "これをください。", pronunciation: "アイル テイク ディス ワン", situation: "購入を決めた時" },
          { english: "How much is this?", japanese: "これはいくらですか？", pronunciation: "ハウ マッチ イズ ディス", situation: "値段を聞く時" },
          { english: "Is this on sale?", japanese: "これはセール品ですか？", pronunciation: "イズ ディス オン セール", situation: "セールを確認する時" },
          { english: "Do you have any discounts?", japanese: "割引はありますか？", pronunciation: "ドゥ ユー ハヴ エニー ディスカウンツ", situation: "割引を確認する時" },
          { english: "Can I pay by card?", japanese: "カードで払えますか？", pronunciation: "キャナイ ペイ バイ カード", situation: "支払い方法を確認する時" },
          { english: "Can I get a gift receipt?", japanese: "ギフト用のレシートをもらえますか？", pronunciation: "キャナイ ゲット ア ギフト レシート", situation: "プレゼント用に買う時" },
          { english: "Is there a return policy?", japanese: "返品はできますか？", pronunciation: "イズ ゼア ア リターン ポリシー", situation: "返品ポリシーを確認する時" },
        ]
      }
    ]
  },

  // ========== タクシー/Uber ==========
  {
    id: "taxi",
    name: "タクシー/Uber",
    nameEn: "Taxi/Uber",
    icon: "🚕",
    description: "タクシーやUberでの移動",
    subScenes: [
      {
        id: "taxi-destination",
        name: "行き先の伝達",
        phrases: [
          { english: "To the airport, please.", japanese: "空港までお願いします。", pronunciation: "トゥ ジ エアポート プリーズ", situation: "行き先を伝える時" },
          { english: "Can you take me to this address?", japanese: "この住所まで行ってもらえますか？", pronunciation: "キャン ユー テイク ミー トゥ ディス アドレス", situation: "住所を見せる時" },
          { english: "I'm going to downtown.", japanese: "ダウンタウンに行きたいです。", pronunciation: "アイム ゴーイング トゥ ダウンタウン", situation: "目的地を伝える時" },
          { english: "Please take the fastest route.", japanese: "一番早い道で行ってください。", pronunciation: "プリーズ テイク ザ ファステスト ルート", situation: "急いでいる時" },
          { english: "Can you stop here, please?", japanese: "ここで止めてください。", pronunciation: "キャン ユー ストップ ヒア プリーズ", situation: "降りたい場所を伝える時" },
          { english: "Please drop me off at the corner.", japanese: "角で降ろしてください。", pronunciation: "プリーズ ドロップ ミー オフ アット ザ コーナー", situation: "降車位置を指定する時" },
        ]
      },
      {
        id: "taxi-fare",
        name: "料金確認",
        phrases: [
          { english: "How much will it cost to get there?", japanese: "そこまでいくらくらいですか？", pronunciation: "ハウ マッチ ウィル イット コスト トゥ ゲット ゼア", situation: "事前に料金を確認する時" },
          { english: "Can you give me an estimate?", japanese: "見積もりを教えてもらえますか？", pronunciation: "キャン ユー ギヴ ミー アン エスティメイト", situation: "概算を聞く時" },
          { english: "Is there a flat rate to the airport?", japanese: "空港までの定額料金はありますか？", pronunciation: "イズ ゼア ア フラット レイト トゥ ジ エアポート", situation: "定額料金を確認する時" },
          { english: "Do you accept credit cards?", japanese: "クレジットカードは使えますか？", pronunciation: "ドゥ ユー アクセプト クレジット カーズ", situation: "支払い方法を確認する時" },
          { english: "Keep the change.", japanese: "お釣りは結構です。", pronunciation: "キープ ザ チェンジ", situation: "チップを渡す時" },
          { english: "Can I have a receipt?", japanese: "領収書をもらえますか？", pronunciation: "キャナイ ハヴ ア レシート", situation: "領収書を頼む時" },
        ]
      }
    ]
  },

  // ========== 電車/地下鉄 ==========
  {
    id: "train",
    name: "電車/地下鉄",
    nameEn: "Train/Subway",
    icon: "🚇",
    description: "電車や地下鉄での移動",
    subScenes: [
      {
        id: "train-ticket",
        name: "切符購入",
        phrases: [
          { english: "One ticket to Central Station, please.", japanese: "セントラル駅まで1枚ください。", pronunciation: "ワン チケット トゥ セントラル ステーション プリーズ", situation: "切符を買う時" },
          { english: "How much is a day pass?", japanese: "1日乗車券はいくらですか？", pronunciation: "ハウ マッチ イズ ア デイ パス", situation: "1日券を買う時" },
          { english: "Do you have a tourist pass?", japanese: "観光客用のパスはありますか？", pronunciation: "ドゥ ユー ハヴ ア ツーリスト パス", situation: "観光パスを確認する時" },
          { english: "Can I use this card on the subway?", japanese: "このカードは地下鉄で使えますか？", pronunciation: "キャナイ ユーズ ディス カード オン ザ サブウェイ", situation: "ICカードを確認する時" },
          { english: "Where can I buy a ticket?", japanese: "切符はどこで買えますか？", pronunciation: "ウェア キャナイ バイ ア チケット", situation: "券売機を探す時" },
          { english: "How do I use this machine?", japanese: "この機械はどう使いますか？", pronunciation: "ハウ ドゥ アイ ユーズ ディス マシーン", situation: "券売機の使い方を聞く時" },
        ]
      },
      {
        id: "train-directions",
        name: "路線案内",
        phrases: [
          { english: "Which line goes to the airport?", japanese: "空港へはどの路線ですか？", pronunciation: "ウィッチ ライン ゴーズ トゥ ジ エアポート", situation: "路線を確認する時" },
          { english: "Is this the right platform for...?", japanese: "...行きはこのホームで合っていますか？", pronunciation: "イズ ディス ザ ライト プラットフォーム フォー", situation: "ホームを確認する時" },
          { english: "How many stops to the museum?", japanese: "美術館まで何駅ですか？", pronunciation: "ハウ メニー ストップス トゥ ザ ミュージアム", situation: "駅数を確認する時" },
          { english: "Does this train stop at...?", japanese: "この電車は...に止まりますか？", pronunciation: "ダズ ディス トレイン ストップ アット", situation: "停車駅を確認する時" },
          { english: "When does the next train arrive?", japanese: "次の電車はいつ来ますか？", pronunciation: "ウェン ダズ ザ ネクスト トレイン アライヴ", situation: "次の電車を確認する時" },
        ]
      },
      {
        id: "train-transfer",
        name: "乗り換え",
        phrases: [
          { english: "Where do I transfer?", japanese: "どこで乗り換えますか？", pronunciation: "ウェア ドゥ アイ トランスファー", situation: "乗り換え駅を聞く時" },
          { english: "Which platform should I go to?", japanese: "どのホームに行けばいいですか？", pronunciation: "ウィッチ プラットフォーム シュッダイ ゴー トゥ", situation: "乗り換えホームを聞く時" },
          { english: "Is this a direct train?", japanese: "これは直通電車ですか？", pronunciation: "イズ ディス ア ダイレクト トレイン", situation: "直通か確認する時" },
          { english: "How do I get to the Blue Line?", japanese: "ブルーラインにはどう行けばいいですか？", pronunciation: "ハウ ドゥ アイ ゲット トゥ ザ ブルー ライン", situation: "別路線への行き方を聞く時" },
          { english: "I think I'm on the wrong train.", japanese: "電車を間違えたようです。", pronunciation: "アイ シンク アイム オン ザ ロング トレイン", situation: "間違えた時" },
        ]
      }
    ]
  },

  // ========== 病院/薬局 ==========
  {
    id: "medical",
    name: "病院/薬局",
    nameEn: "Hospital/Pharmacy",
    icon: "🏥",
    description: "医療機関や薬局での会話",
    subScenes: [
      {
        id: "medical-symptoms",
        name: "症状の説明",
        phrases: [
          { english: "I have a headache.", japanese: "頭痛がします。", pronunciation: "アイ ハヴ ア ヘデイク", situation: "症状を伝える時" },
          { english: "I feel dizzy.", japanese: "めまいがします。", pronunciation: "アイ フィール ディズィー", situation: "症状を伝える時" },
          { english: "I have a fever.", japanese: "熱があります。", pronunciation: "アイ ハヴ ア フィーバー", situation: "症状を伝える時" },
          { english: "My stomach hurts.", japanese: "お腹が痛いです。", pronunciation: "マイ ストマック ハーツ", situation: "症状を伝える時" },
          { english: "I've been coughing for three days.", japanese: "3日前から咳が出ています。", pronunciation: "アイヴ ビーン コフィング フォー スリー デイズ", situation: "期間を伝える時" },
          { english: "I'm allergic to penicillin.", japanese: "ペニシリンにアレルギーがあります。", pronunciation: "アイム アラージック トゥ ペニシリン", situation: "アレルギーを伝える時" },
          { english: "It hurts here.", japanese: "ここが痛いです。", pronunciation: "イット ハーツ ヒア", situation: "痛む場所を指す時" },
        ]
      },
      {
        id: "medical-prescription",
        name: "処方箋",
        phrases: [
          { english: "I need to see a doctor.", japanese: "医者に診てもらいたいです。", pronunciation: "アイ ニード トゥ シー ア ドクター", situation: "診察を頼む時" },
          { english: "Do I need a prescription?", japanese: "処方箋は必要ですか？", pronunciation: "ドゥ アイ ニード ア プリスクリプション", situation: "処方箋の要否を確認する時" },
          { english: "Can you recommend something for cold?", japanese: "風邪に効くものを教えてもらえますか？", pronunciation: "キャン ユー レコメンド サムシング フォー コールド", situation: "薬を相談する時" },
          { english: "How often should I take this?", japanese: "これはどのくらいの頻度で飲めばいいですか？", pronunciation: "ハウ オフン シュッダイ テイク ディス", situation: "服用方法を確認する時" },
          { english: "Are there any side effects?", japanese: "副作用はありますか？", pronunciation: "アー ゼア エニー サイド イフェクツ", situation: "副作用を確認する時" },
        ]
      },
      {
        id: "medical-pharmacy",
        name: "薬の購入",
        phrases: [
          { english: "Do you have pain relievers?", japanese: "鎮痛剤はありますか？", pronunciation: "ドゥ ユー ハヴ ペイン リリーバーズ", situation: "薬を探す時" },
          { english: "I need something for allergies.", japanese: "アレルギーの薬が欲しいです。", pronunciation: "アイ ニード サムシング フォー アラジーズ", situation: "アレルギー薬を探す時" },
          { english: "Do you have band-aids?", japanese: "バンドエイドはありますか？", pronunciation: "ドゥ ユー ハヴ バンドエイズ", situation: "絆創膏を探す時" },
          { english: "Is this suitable for children?", japanese: "これは子供に使えますか？", pronunciation: "イズ ディス スータブル フォー チルドレン", situation: "子供用か確認する時" },
          { english: "Can I take this with other medication?", japanese: "他の薬と一緒に飲んでも大丈夫ですか？", pronunciation: "キャナイ テイク ディス ウィズ アザー メディケーション", situation: "飲み合わせを確認する時" },
        ]
      }
    ]
  },

  // ========== 銀行 ==========
  {
    id: "bank",
    name: "銀行",
    nameEn: "Bank",
    icon: "🏦",
    description: "銀行での各種手続き",
    subScenes: [
      {
        id: "bank-account",
        name: "口座開設",
        phrases: [
          { english: "I'd like to open a bank account.", japanese: "銀行口座を開設したいです。", pronunciation: "アイドゥ ライク トゥ オープン ア バンク アカウント", situation: "口座開設を頼む時" },
          { english: "What documents do I need?", japanese: "どんな書類が必要ですか？", pronunciation: "ワット ドキュメンツ ドゥ アイ ニード", situation: "必要書類を確認する時" },
          { english: "Is there a minimum deposit?", japanese: "最低預入額はありますか？", pronunciation: "イズ ゼア ア ミニマム デポジット", situation: "最低額を確認する時" },
          { english: "What are the fees?", japanese: "手数料はいくらですか？", pronunciation: "ワット アー ザ フィーズ", situation: "手数料を確認する時" },
          { english: "Can I get a debit card?", japanese: "デビットカードは作れますか？", pronunciation: "キャナイ ゲット ア デビット カード", situation: "デビットカードを頼む時" },
        ]
      },
      {
        id: "bank-exchange",
        name: "両替",
        phrases: [
          { english: "I'd like to exchange currency.", japanese: "両替をしたいのですが。", pronunciation: "アイドゥ ライク トゥ イクスチェンジ カレンシー", situation: "両替を頼む時" },
          { english: "What's the exchange rate today?", japanese: "今日の為替レートはいくらですか？", pronunciation: "ワッツ ジ イクスチェンジ レイト トゥデイ", situation: "レートを確認する時" },
          { english: "I want to exchange dollars to euros.", japanese: "ドルをユーロに両替したいです。", pronunciation: "アイ ウォント トゥ イクスチェンジ ダラーズ トゥ ユーロズ", situation: "両替する通貨を伝える時" },
          { english: "Is there a commission fee?", japanese: "手数料はかかりますか？", pronunciation: "イズ ゼア ア コミッション フィー", situation: "手数料を確認する時" },
          { english: "Can I have smaller bills?", japanese: "小額紙幣でもらえますか？", pronunciation: "キャナイ ハヴ スモーラー ビルズ", situation: "紙幣の種類を指定する時" },
        ]
      },
      {
        id: "bank-transfer",
        name: "送金",
        phrases: [
          { english: "I'd like to make a wire transfer.", japanese: "海外送金をしたいのですが。", pronunciation: "アイドゥ ライク トゥ メイク ア ワイヤー トランスファー", situation: "送金を頼む時" },
          { english: "How long does it take?", japanese: "どのくらい時間がかかりますか？", pronunciation: "ハウ ロング ダズ イット テイク", situation: "送金時間を確認する時" },
          { english: "What information do you need?", japanese: "どんな情報が必要ですか？", pronunciation: "ワット インフォメーション ドゥ ユー ニード", situation: "必要情報を確認する時" },
          { english: "I need to check my balance.", japanese: "残高を確認したいです。", pronunciation: "アイ ニード トゥ チェック マイ バランス", situation: "残高確認を頼む時" },
          { english: "Can I withdraw money?", japanese: "お金を引き出せますか？", pronunciation: "キャナイ ウィズドロー マニー", situation: "引き出しを頼む時" },
        ]
      }
    ]
  },

  // ========== 郵便局 ==========
  {
    id: "postoffice",
    name: "郵便局",
    nameEn: "Post Office",
    icon: "📮",
    description: "郵便局での発送手続き",
    subScenes: [
      {
        id: "postoffice-international",
        name: "国際郵便",
        phrases: [
          { english: "I'd like to send this to Japan.", japanese: "これを日本に送りたいです。", pronunciation: "アイドゥ ライク トゥ センド ディス トゥ ジャパン", situation: "国際郵便を頼む時" },
          { english: "How much does it cost to send this?", japanese: "これを送るといくらですか？", pronunciation: "ハウ マッチ ダズ イット コスト トゥ センド ディス", situation: "料金を確認する時" },
          { english: "How long will it take to arrive?", japanese: "届くまでどのくらいかかりますか？", pronunciation: "ハウ ロング ウィル イット テイク トゥ アライヴ", situation: "配達日数を確認する時" },
          { english: "I want to send this by airmail.", japanese: "航空便で送りたいです。", pronunciation: "アイ ウォント トゥ センド ディス バイ エアメイル", situation: "航空便を指定する時" },
          { english: "Do I need a customs form?", japanese: "税関申告書は必要ですか？", pronunciation: "ドゥ アイ ニード ア カスタムズ フォーム", situation: "書類を確認する時" },
        ]
      },
      {
        id: "postoffice-package",
        name: "小包の発送",
        phrases: [
          { english: "I need to send a package.", japanese: "小包を送りたいです。", pronunciation: "アイ ニード トゥ センド ア パッケージ", situation: "小包を送る時" },
          { english: "What are the size restrictions?", japanese: "サイズ制限はありますか？", pronunciation: "ワット アー ザ サイズ リストリクションズ", situation: "サイズを確認する時" },
          { english: "Can I get tracking?", japanese: "追跡サービスはありますか？", pronunciation: "キャナイ ゲット トラッキング", situation: "追跡を確認する時" },
          { english: "I'd like to insure this package.", japanese: "この小包に保険をかけたいです。", pronunciation: "アイドゥ ライク トゥ インシュア ディス パッケージ", situation: "保険を頼む時" },
          { english: "Do you sell boxes here?", japanese: "箱は売っていますか？", pronunciation: "ドゥ ユー セル ボクシーズ ヒア", situation: "梱包材を買う時" },
          { english: "Is this fragile?", japanese: "これは壊れやすいものですか？", pronunciation: "イズ ディス フラジャイル", situation: "壊れ物を確認する時" },
        ]
      }
    ]
  },

  // ========== 美容院/理髪店 ==========
  {
    id: "hairsalon",
    name: "美容院/理髪店",
    nameEn: "Hair Salon",
    icon: "💇",
    description: "美容院でのヘアカット",
    subScenes: [
      {
        id: "hairsalon-style",
        name: "ヘアスタイルの注文",
        phrases: [
          { english: "I'd like a haircut, please.", japanese: "カットをお願いします。", pronunciation: "アイドゥ ライク ア ヘアカット プリーズ", situation: "カットを頼む時" },
          { english: "I want to keep the length.", japanese: "長さは変えないでください。", pronunciation: "アイ ウォント トゥ キープ ザ レングス", situation: "長さを保つ時" },
          { english: "I'd like to cut it short.", japanese: "短くしたいです。", pronunciation: "アイドゥ ライク トゥ カット イット ショート", situation: "短くする時" },
          { english: "Can you show me some styles?", japanese: "スタイルを見せてもらえますか？", pronunciation: "キャン ユー ショウ ミー サム スタイルズ", situation: "スタイルを相談する時" },
          { english: "I want something like this picture.", japanese: "この写真のようにしてください。", pronunciation: "アイ ウォント サムシング ライク ディス ピクチャー", situation: "写真を見せる時" },
          { english: "Just a trim, please.", japanese: "整えるだけでお願いします。", pronunciation: "ジャスト ア トリム プリーズ", situation: "軽く整える時" },
        ]
      },
      {
        id: "hairsalon-instructions",
        name: "カットの指示",
        phrases: [
          { english: "A little shorter, please.", japanese: "もう少し短くしてください。", pronunciation: "ア リトル ショーター プリーズ", situation: "もっと短く頼む時" },
          { english: "Not too short on the sides.", japanese: "サイドは短くしすぎないでください。", pronunciation: "ノット トゥー ショート オン ザ サイズ", situation: "サイドの長さを指定する時" },
          { english: "Can you thin it out?", japanese: "すいてもらえますか？", pronunciation: "キャン ユー シン イット アウト", situation: "髪をすく時" },
          { english: "Please layer the back.", japanese: "後ろはレイヤーを入れてください。", pronunciation: "プリーズ レイヤー ザ バック", situation: "レイヤーを頼む時" },
          { english: "I'd like to dye my hair.", japanese: "髪を染めたいです。", pronunciation: "アイドゥ ライク トゥ ダイ マイ ヘア", situation: "カラーを頼む時" },
          { english: "Can you cover the gray?", japanese: "白髪を隠してもらえますか？", pronunciation: "キャン ユー カバー ザ グレイ", situation: "白髪染めを頼む時" },
          { english: "That looks great!", japanese: "いい感じです！", pronunciation: "ザット ルックス グレイト", situation: "仕上がりを褒める時" },
        ]
      }
    ]
  },

  // ========== ジム ==========
  {
    id: "gym",
    name: "ジム",
    nameEn: "Gym",
    icon: "🏋️",
    description: "ジムでの会話",
    subScenes: [
      {
        id: "gym-membership",
        name: "会員登録",
        phrases: [
          { english: "I'd like to sign up for a membership.", japanese: "会員登録をしたいです。", pronunciation: "アイドゥ ライク トゥ サインアップ フォー ア メンバーシップ", situation: "入会を頼む時" },
          { english: "What are the membership options?", japanese: "会員プランにはどんなものがありますか？", pronunciation: "ワット アー ザ メンバーシップ オプションズ", situation: "プランを確認する時" },
          { english: "Is there a trial period?", japanese: "お試し期間はありますか？", pronunciation: "イズ ゼア ア トライアル ピリオド", situation: "体験を確認する時" },
          { english: "Can I cancel anytime?", japanese: "いつでも解約できますか？", pronunciation: "キャナイ キャンセル エニタイム", situation: "解約条件を確認する時" },
          { english: "What are the operating hours?", japanese: "営業時間は何時から何時ですか？", pronunciation: "ワット アー ジ オペレーティング アワーズ", situation: "営業時間を確認する時" },
        ]
      },
      {
        id: "gym-trainer",
        name: "トレーナーとの会話",
        phrases: [
          { english: "Can I book a personal training session?", japanese: "パーソナルトレーニングを予約できますか？", pronunciation: "キャナイ ブック ア パーソナル トレーニング セッション", situation: "PTを予約する時" },
          { english: "I want to lose weight.", japanese: "減量したいです。", pronunciation: "アイ ウォント トゥ ルーズ ウェイト", situation: "目標を伝える時" },
          { english: "I want to build muscle.", japanese: "筋肉をつけたいです。", pronunciation: "アイ ウォント トゥ ビルド マッスル", situation: "目標を伝える時" },
          { english: "Is my form correct?", japanese: "フォームは正しいですか？", pronunciation: "イズ マイ フォーム コレクト", situation: "フォームを確認する時" },
          { english: "How many sets should I do?", japanese: "何セットやればいいですか？", pronunciation: "ハウ メニー セッツ シュッダイ ドゥ", situation: "セット数を聞く時" },
        ]
      },
      {
        id: "gym-equipment",
        name: "器具の使い方",
        phrases: [
          { english: "How do I use this machine?", japanese: "このマシンはどう使いますか？", pronunciation: "ハウ ドゥ アイ ユーズ ディス マシーン", situation: "使い方を聞く時" },
          { english: "Is this machine available?", japanese: "このマシンは空いていますか？", pronunciation: "イズ ディス マシーン アベイラブル", situation: "空きを確認する時" },
          { english: "How many more sets do you have?", japanese: "あと何セットですか？", pronunciation: "ハウ メニー モア セッツ ドゥ ユー ハヴ", situation: "使用中の人に聞く時" },
          { english: "Can I work in?", japanese: "交互に使ってもいいですか？", pronunciation: "キャナイ ワーク イン", situation: "交互使用を頼む時" },
          { english: "Where are the free weights?", japanese: "フリーウェイトはどこですか？", pronunciation: "ウェア アー ザ フリー ウェイツ", situation: "器具の場所を聞く時" },
        ]
      }
    ]
  },

  // ========== 観光案内所 ==========
  {
    id: "touristinfo",
    name: "観光案内所",
    nameEn: "Tourist Information",
    icon: "ℹ️",
    description: "観光案内所での情報収集",
    subScenes: [
      {
        id: "touristinfo-map",
        name: "地図入手",
        phrases: [
          { english: "Do you have a city map?", japanese: "市内の地図はありますか？", pronunciation: "ドゥ ユー ハヴ ア シティ マップ", situation: "地図を頼む時" },
          { english: "Is there a map in Japanese?", japanese: "日本語の地図はありますか？", pronunciation: "イズ ゼア ア マップ イン ジャパニーズ", situation: "日本語版を頼む時" },
          { english: "Can you show me where we are?", japanese: "今どこにいるか教えてもらえますか？", pronunciation: "キャン ユー ショウ ミー ウェア ウィー アー", situation: "現在地を確認する時" },
          { english: "How do I get to the main square?", japanese: "中央広場にはどう行けばいいですか？", pronunciation: "ハウ ドゥ アイ ゲット トゥ ザ メイン スクエア", situation: "道順を聞く時" },
        ]
      },
      {
        id: "touristinfo-recommend",
        name: "おすすめスポット",
        phrases: [
          { english: "What are the must-see attractions?", japanese: "必見の観光スポットは何ですか？", pronunciation: "ワット アー ザ マストシー アトラクションズ", situation: "おすすめを聞く時" },
          { english: "What do you recommend for families?", japanese: "家族連れにおすすめの場所はありますか？", pronunciation: "ワット ドゥ ユー レコメンド フォー ファミリーズ", situation: "家族向けを聞く時" },
          { english: "Are there any free activities?", japanese: "無料でできるアクティビティはありますか？", pronunciation: "アー ゼア エニー フリー アクティビティーズ", situation: "無料施設を聞く時" },
          { english: "What's happening this weekend?", japanese: "今週末は何かイベントがありますか？", pronunciation: "ワッツ ハプニング ディス ウィークエンド", situation: "イベントを確認する時" },
          { english: "Where can I see local culture?", japanese: "地元の文化に触れられる場所はどこですか？", pronunciation: "ウェア キャナイ シー ローカル カルチャー", situation: "文化体験を聞く時" },
        ]
      },
      {
        id: "touristinfo-tickets",
        name: "チケット購入",
        phrases: [
          { english: "Where can I buy tickets?", japanese: "チケットはどこで買えますか？", pronunciation: "ウェア キャナイ バイ チケッツ", situation: "チケット購入場所を聞く時" },
          { english: "Is there a city pass?", japanese: "シティパスはありますか？", pronunciation: "イズ ゼア ア シティ パス", situation: "周遊パスを確認する時" },
          { english: "Do you offer guided tours?", japanese: "ガイドツアーはありますか？", pronunciation: "ドゥ ユー オファー ガイデッド トゥアーズ", situation: "ツアーを確認する時" },
          { english: "How much is the entrance fee?", japanese: "入場料はいくらですか？", pronunciation: "ハウ マッチ イズ ジ エントランス フィー", situation: "入場料を確認する時" },
          { english: "Is there a student discount?", japanese: "学生割引はありますか？", pronunciation: "イズ ゼア ア ステューデント ディスカウント", situation: "割引を確認する時" },
        ]
      }
    ]
  },

  // ========== ビジネスミーティング ==========
  {
    id: "business",
    name: "ビジネスミーティング",
    nameEn: "Business Meeting",
    icon: "💼",
    description: "ビジネスシーンでの英会話",
    subScenes: [
      {
        id: "business-intro",
        name: "自己紹介",
        phrases: [
          { english: "Nice to meet you. I'm...", japanese: "はじめまして。私は...です。", pronunciation: "ナイス トゥ ミート ユー アイム", situation: "初対面の挨拶" },
          { english: "I'm in charge of marketing.", japanese: "マーケティングを担当しています。", pronunciation: "アイム イン チャージ オブ マーケティング", situation: "役職を伝える時" },
          { english: "Here's my business card.", japanese: "名刺をどうぞ。", pronunciation: "ヒアズ マイ ビジネス カード", situation: "名刺を渡す時" },
          { english: "Thank you for taking the time to meet.", japanese: "お時間をいただきありがとうございます。", pronunciation: "サンキュー フォー テイキング ザ タイム トゥ ミート", situation: "会議の始めに" },
          { english: "I've heard a lot about your company.", japanese: "御社のことはよく伺っています。", pronunciation: "アイヴ ハード ア ロット アバウト ユア カンパニー", situation: "会社を褒める時" },
        ]
      },
      {
        id: "business-presentation",
        name: "プレゼン",
        phrases: [
          { english: "Let me start by explaining...", japanese: "まず...について説明させてください。", pronunciation: "レットミー スタート バイ イクスプレイニング", situation: "プレゼンの始め" },
          { english: "As you can see in this chart...", japanese: "このグラフでご覧いただけるように...", pronunciation: "アズ ユー キャン シー イン ディス チャート", situation: "資料を説明する時" },
          { english: "I'd like to highlight...", japanese: "...を強調させてください。", pronunciation: "アイドゥ ライク トゥ ハイライト", situation: "重要点を示す時" },
          { english: "Do you have any questions?", japanese: "何かご質問はありますか？", pronunciation: "ドゥ ユー ハヴ エニー クエスチョンズ", situation: "質疑応答を促す時" },
          { english: "Let me summarize the key points.", japanese: "要点をまとめさせてください。", pronunciation: "レットミー サマライズ ザ キー ポインツ", situation: "まとめる時" },
        ]
      },
      {
        id: "business-negotiation",
        name: "交渉",
        phrases: [
          { english: "We'd like to propose...", japanese: "...を提案させていただきます。", pronunciation: "ウィドゥ ライク トゥ プロポーズ", situation: "提案する時" },
          { english: "What's your budget for this project?", japanese: "このプロジェクトの予算はいくらですか？", pronunciation: "ワッツ ユア バジェット フォー ディス プロジェクト", situation: "予算を確認する時" },
          { english: "Can we discuss the pricing?", japanese: "価格について話し合えますか？", pronunciation: "キャン ウィー ディスカス ザ プライシング", situation: "価格交渉する時" },
          { english: "We need more time to consider.", japanese: "検討する時間がもう少し必要です。", pronunciation: "ウィー ニード モア タイム トゥ コンシダー", situation: "回答を保留する時" },
          { english: "Let's schedule a follow-up meeting.", japanese: "フォローアップミーティングの日程を決めましょう。", pronunciation: "レッツ スケジュール ア フォローアップ ミーティング", situation: "次回を設定する時" },
          { english: "I think we can make a deal.", japanese: "取引できると思います。", pronunciation: "アイ シンク ウィー キャン メイク ア ディール", situation: "合意に向かう時" },
        ]
      }
    ]
  },

  // ========== 電話対応 ==========
  {
    id: "phone",
    name: "電話対応",
    nameEn: "Phone Calls",
    icon: "📞",
    description: "電話での各種問い合わせ",
    subScenes: [
      {
        id: "phone-reservation",
        name: "予約",
        phrases: [
          { english: "I'd like to make a reservation.", japanese: "予約をしたいのですが。", pronunciation: "アイドゥ ライク トゥ メイク ア リザベーション", situation: "予約を頼む時" },
          { english: "Is there availability on Saturday?", japanese: "土曜日は空いていますか？", pronunciation: "イズ ゼア アベイラビリティ オン サタデイ", situation: "空きを確認する時" },
          { english: "I'd like to book for 3 people.", japanese: "3人で予約したいです。", pronunciation: "アイドゥ ライク トゥ ブック フォー スリー ピープル", situation: "人数を伝える時" },
          { english: "Can I change my reservation?", japanese: "予約を変更できますか？", pronunciation: "キャナイ チェンジ マイ リザベーション", situation: "変更を頼む時" },
          { english: "I need to cancel my reservation.", japanese: "予約をキャンセルしたいのですが。", pronunciation: "アイ ニード トゥ キャンセル マイ リザベーション", situation: "キャンセルする時" },
        ]
      },
      {
        id: "phone-inquiry",
        name: "問い合わせ",
        phrases: [
          { english: "I'm calling to inquire about...", japanese: "...についてお尋ねしたいのですが。", pronunciation: "アイム コーリング トゥ インクワイア アバウト", situation: "問い合わせる時" },
          { english: "Could you give me more information?", japanese: "もっと詳しく教えていただけますか？", pronunciation: "クッジュー ギヴ ミー モア インフォメーション", situation: "詳細を聞く時" },
          { english: "What are your business hours?", japanese: "営業時間は何時から何時ですか？", pronunciation: "ワット アー ユア ビジネス アワーズ", situation: "営業時間を聞く時" },
          { english: "Is this the right department?", japanese: "こちらが担当部署で合っていますか？", pronunciation: "イズ ディス ザ ライト ディパートメント", situation: "部署を確認する時" },
          { english: "Could you transfer me to...?", japanese: "...に転送していただけますか？", pronunciation: "クッジュー トランスファー ミー トゥ", situation: "転送を頼む時" },
        ]
      },
      {
        id: "phone-complaint",
        name: "クレーム",
        phrases: [
          { english: "I'm calling about a problem with...", japanese: "...の問題についてお電話しています。", pronunciation: "アイム コーリング アバウト ア プロブレム ウィズ", situation: "問題を伝える時" },
          { english: "I'd like to speak to a manager.", japanese: "マネージャーとお話ししたいのですが。", pronunciation: "アイドゥ ライク トゥ スピーク トゥ ア マネージャー", situation: "上司に繋いでもらう時" },
          { english: "This isn't what I ordered.", japanese: "これは注文したものと違います。", pronunciation: "ディス イズント ワット アイ オーダード", situation: "間違いを指摘する時" },
          { english: "I'd like a refund, please.", japanese: "返金をお願いしたいのですが。", pronunciation: "アイドゥ ライク ア リファンド プリーズ", situation: "返金を求める時" },
          { english: "When can I expect a response?", japanese: "いつ回答をいただけますか？", pronunciation: "ウェン キャナイ イクスペクト ア レスポンス", situation: "回答時期を確認する時" },
        ]
      }
    ]
  },

  // ========== スーパーマーケット ==========
  {
    id: "supermarket",
    name: "スーパーマーケット",
    nameEn: "Supermarket",
    icon: "🛒",
    description: "スーパーでの買い物",
    subScenes: [
      {
        id: "supermarket-location",
        name: "商品の場所確認",
        phrases: [
          { english: "Where can I find the milk?", japanese: "牛乳はどこにありますか？", pronunciation: "ウェア キャナイ ファインド ザ ミルク", situation: "商品の場所を聞く時" },
          { english: "Which aisle is the bread in?", japanese: "パンは何番通路ですか？", pronunciation: "ウィッチ アイル イズ ザ ブレッド イン", situation: "通路を聞く時" },
          { english: "Do you have any organic products?", japanese: "オーガニック製品はありますか？", pronunciation: "ドゥ ユー ハヴ エニー オーガニック プロダクツ", situation: "オーガニックを探す時" },
          { english: "Is this gluten-free?", japanese: "これはグルテンフリーですか？", pronunciation: "イズ ディス グルテンフリー", situation: "成分を確認する時" },
          { english: "Do you have a smaller size?", japanese: "もっと小さいサイズはありますか？", pronunciation: "ドゥ ユー ハヴ ア スモーラー サイズ", situation: "サイズを聞く時" },
        ]
      },
      {
        id: "supermarket-checkout",
        name: "レジでの会話",
        phrases: [
          { english: "Is this the express lane?", japanese: "ここはエクスプレスレーンですか？", pronunciation: "イズ ディス ジ イクスプレス レイン", situation: "レーンを確認する時" },
          { english: "Can I use this coupon?", japanese: "このクーポンは使えますか？", pronunciation: "キャナイ ユーズ ディス クーポン", situation: "クーポンを使う時" },
          { english: "I brought my own bag.", japanese: "マイバッグを持っています。", pronunciation: "アイ ブロート マイ オウン バッグ", situation: "袋を持参した時" },
          { english: "Can I have a bag, please?", japanese: "袋をもらえますか？", pronunciation: "キャナイ ハヴ ア バッグ プリーズ", situation: "袋を頼む時" },
          { english: "Can I pay with contactless?", japanese: "タッチ決済は使えますか？", pronunciation: "キャナイ ペイ ウィズ コンタクトレス", situation: "支払い方法を確認する時" },
          { english: "I don't need a receipt.", japanese: "レシートは要りません。", pronunciation: "アイ ドント ニード ア レシート", situation: "レシートを断る時" },
        ]
      }
    ]
  },

  // ========== 不動産 ==========
  {
    id: "realestate",
    name: "不動産",
    nameEn: "Real Estate",
    icon: "🏠",
    description: "物件探しと契約",
    subScenes: [
      {
        id: "realestate-viewing",
        name: "物件見学",
        phrases: [
          { english: "I'm looking for an apartment to rent.", japanese: "賃貸アパートを探しています。", pronunciation: "アイム ルッキング フォー アン アパートメント トゥ レント", situation: "物件を探す時" },
          { english: "Can I schedule a viewing?", japanese: "内見の予約はできますか？", pronunciation: "キャナイ スケジュール ア ビューイング", situation: "内見を予約する時" },
          { english: "How old is this building?", japanese: "この建物は築何年ですか？", pronunciation: "ハウ オールド イズ ディス ビルディング", situation: "築年数を聞く時" },
          { english: "Is this pet-friendly?", japanese: "ペットは飼えますか？", pronunciation: "イズ ディス ペットフレンドリー", situation: "ペット可か確認する時" },
          { english: "What's included in the rent?", japanese: "家賃に何が含まれていますか？", pronunciation: "ワッツ インクルーデッド イン ザ レント", situation: "家賃の内訳を確認する時" },
        ]
      },
      {
        id: "realestate-contract",
        name: "契約条件",
        phrases: [
          { english: "What's the lease term?", japanese: "契約期間はどのくらいですか？", pronunciation: "ワッツ ザ リース ターム", situation: "契約期間を確認する時" },
          { english: "How much is the security deposit?", japanese: "敷金はいくらですか？", pronunciation: "ハウ マッチ イズ ザ セキュリティ デポジット", situation: "敷金を確認する時" },
          { english: "Are utilities included?", japanese: "光熱費は含まれていますか？", pronunciation: "アー ユーティリティーズ インクルーデッド", situation: "光熱費を確認する時" },
          { english: "When is the rent due?", japanese: "家賃の支払日はいつですか？", pronunciation: "ウェン イズ ザ レント デュー", situation: "支払日を確認する時" },
          { english: "Can I break the lease early?", japanese: "途中解約はできますか？", pronunciation: "キャナイ ブレイク ザ リース アーリー", situation: "途中解約を確認する時" },
        ]
      },
      {
        id: "realestate-negotiation",
        name: "家賃交渉",
        phrases: [
          { english: "Is the rent negotiable?", japanese: "家賃の交渉は可能ですか？", pronunciation: "イズ ザ レント ニゴシエイブル", situation: "交渉可能か確認する時" },
          { english: "Can you lower the rent?", japanese: "家賃を下げてもらえますか？", pronunciation: "キャン ユー ロワー ザ レント", situation: "値下げを頼む時" },
          { english: "I can pay several months in advance.", japanese: "数ヶ月分前払いできます。", pronunciation: "アイ キャン ペイ セベラル マンスス イン アドバンス", situation: "前払いを提案する時" },
          { english: "What if I sign a longer lease?", japanese: "長期契約にしたらどうですか？", pronunciation: "ワット イフ アイ サイン ア ロンガー リース", situation: "長期契約を提案する時" },
        ]
      }
    ]
  },

  // ========== 緊急時 ==========
  {
    id: "emergency",
    name: "緊急時",
    nameEn: "Emergency",
    icon: "🚨",
    description: "緊急事態への対応",
    subScenes: [
      {
        id: "emergency-police",
        name: "警察",
        phrases: [
          { english: "I need to report a theft.", japanese: "盗難を届け出たいです。", pronunciation: "アイ ニード トゥ レポート ア セフト", situation: "盗難を報告する時" },
          { english: "My wallet was stolen.", japanese: "財布を盗まれました。", pronunciation: "マイ ウォレット ワズ ストウレン", situation: "盗難被害を伝える時" },
          { english: "I've lost my passport.", japanese: "パスポートをなくしました。", pronunciation: "アイヴ ロスト マイ パスポート", situation: "紛失を報告する時" },
          { english: "I need a police report.", japanese: "警察の報告書が必要です。", pronunciation: "アイ ニード ア ポリス レポート", situation: "報告書を依頼する時" },
          { english: "Where is the police station?", japanese: "警察署はどこですか？", pronunciation: "ウェア イズ ザ ポリス ステーション", situation: "警察署の場所を聞く時" },
        ]
      },
      {
        id: "emergency-ambulance",
        name: "救急車",
        phrases: [
          { english: "Please call an ambulance!", japanese: "救急車を呼んでください！", pronunciation: "プリーズ コール アン アンビュランス", situation: "救急車を呼ぶ時" },
          { english: "There's been an accident.", japanese: "事故がありました。", pronunciation: "ゼアズ ビーン アン アクシデント", situation: "事故を報告する時" },
          { english: "Someone is injured.", japanese: "けが人がいます。", pronunciation: "サムワン イズ インジャード", situation: "けが人を報告する時" },
          { english: "I need a doctor immediately.", japanese: "すぐに医者が必要です。", pronunciation: "アイ ニード ア ドクター イミディエトリー", situation: "緊急の治療が必要な時" },
          { english: "Where is the nearest hospital?", japanese: "一番近い病院はどこですか？", pronunciation: "ウェア イズ ザ ニアレスト ホスピタル", situation: "病院の場所を聞く時" },
        ]
      },
      {
        id: "emergency-trouble",
        name: "トラブル対応",
        phrases: [
          { english: "Help!", japanese: "助けて！", pronunciation: "ヘルプ", situation: "助けを求める時" },
          { english: "I'm lost.", japanese: "道に迷いました。", pronunciation: "アイム ロスト", situation: "迷子になった時" },
          { english: "I don't feel safe here.", japanese: "ここは安全じゃない気がします。", pronunciation: "アイ ドント フィール セイフ ヒア", situation: "危険を感じた時" },
          { english: "Can you help me?", japanese: "助けてもらえますか？", pronunciation: "キャン ユー ヘルプ ミー", situation: "助けを求める時" },
          { english: "I need to contact my embassy.", japanese: "大使館に連絡する必要があります。", pronunciation: "アイ ニード トゥ コンタクト マイ エンバシー", situation: "大使館に連絡する時" },
          { english: "Do you speak Japanese?", japanese: "日本語は話せますか？", pronunciation: "ドゥ ユー スピーク ジャパニーズ", situation: "日本語話者を探す時" },
        ]
      }
    ]
  },

  // ========== 友人との会話 ==========
  {
    id: "friends",
    name: "友人との会話",
    nameEn: "Casual Conversation",
    icon: "👋",
    description: "友人とのカジュアルな会話",
    subScenes: [
      {
        id: "friends-hobbies",
        name: "趣味",
        phrases: [
          { english: "What do you do for fun?", japanese: "趣味は何ですか？", pronunciation: "ワット ドゥ ユー ドゥ フォー ファン", situation: "趣味を聞く時" },
          { english: "I'm really into photography.", japanese: "写真にはまっています。", pronunciation: "アイム リアリー イントゥ フォトグラフィー", situation: "趣味を伝える時" },
          { english: "Have you tried hiking?", japanese: "ハイキングしたことありますか？", pronunciation: "ハヴ ユー トライド ハイキング", situation: "趣味を勧める時" },
          { english: "I love watching movies.", japanese: "映画を見るのが大好きです。", pronunciation: "アイ ラヴ ウォッチング ムービーズ", situation: "趣味を伝える時" },
          { english: "We should do this together sometime.", japanese: "いつか一緒にやりましょう。", pronunciation: "ウィー シュッド ドゥ ディス トゥギャザー サムタイム", situation: "誘う時" },
        ]
      },
      {
        id: "friends-weekend",
        name: "週末の予定",
        phrases: [
          { english: "What are you doing this weekend?", japanese: "週末は何する予定？", pronunciation: "ワット アー ユー ドゥーイング ディス ウィークエンド", situation: "予定を聞く時" },
          { english: "Do you have any plans for Saturday?", japanese: "土曜日は予定ある？", pronunciation: "ドゥ ユー ハヴ エニー プランズ フォー サタデイ", situation: "予定を聞く時" },
          { english: "Want to hang out?", japanese: "遊ばない？", pronunciation: "ウォント トゥ ハングアウト", situation: "誘う時" },
          { english: "Let's grab dinner sometime.", japanese: "今度ご飯行こうよ。", pronunciation: "レッツ グラブ ディナー サムタイム", situation: "食事に誘う時" },
          { english: "I'm free on Sunday.", japanese: "日曜日は空いてるよ。", pronunciation: "アイム フリー オン サンデイ", situation: "空いている日を伝える時" },
          { english: "That sounds fun!", japanese: "楽しそう！", pronunciation: "ザット サウンズ ファン", situation: "提案に賛成する時" },
        ]
      },
      {
        id: "friends-catchup",
        name: "近況報告",
        phrases: [
          { english: "How have you been?", japanese: "元気だった？", pronunciation: "ハウ ハヴ ユー ビーン", situation: "久しぶりに会った時" },
          { english: "Long time no see!", japanese: "久しぶり！", pronunciation: "ロング タイム ノー シー", situation: "久しぶりに会った時" },
          { english: "What's new with you?", japanese: "最近どう？", pronunciation: "ワッツ ニュー ウィズ ユー", situation: "近況を聞く時" },
          { english: "I've been really busy lately.", japanese: "最近すごく忙しかったんだ。", pronunciation: "アイヴ ビーン リアリー ビジー レイトリー", situation: "近況を伝える時" },
          { english: "I just got a new job.", japanese: "新しい仕事に就いたんだ。", pronunciation: "アイ ジャスト ゴット ア ニュー ジョブ", situation: "ニュースを伝える時" },
          { english: "That's great news!", japanese: "それは良かったね！", pronunciation: "ザッツ グレイト ニュース", situation: "良いニュースに反応する時" },
          { english: "Let's keep in touch.", japanese: "連絡取り合おうね。", pronunciation: "レッツ キープ イン タッチ", situation: "別れ際に" },
        ]
      }
    ]
  }
];

// Get all scene IDs
export function getAllSceneIds(): string[] {
  return scenesData.map(s => s.id);
}

// Get scene by ID
export function getSceneById(id: string): Scene | undefined {
  return scenesData.find(s => s.id === id);
}

// Get all phrases count
export function getTotalPhrasesCount(): number {
  return scenesData.reduce((total, scene) => {
    return total + scene.subScenes.reduce((subTotal, sub) => subTotal + sub.phrases.length, 0);
  }, 0);
}

// Search phrases
export function searchPhrases(query: string): { scene: Scene; subScene: SubScene; phrase: Phrase }[] {
  const results: { scene: Scene; subScene: SubScene; phrase: Phrase }[] = [];
  const q = query.toLowerCase();

  scenesData.forEach(scene => {
    scene.subScenes.forEach(subScene => {
      subScene.phrases.forEach(phrase => {
        if (
          phrase.english.toLowerCase().includes(q) ||
          phrase.japanese.includes(query) ||
          phrase.situation.includes(query)
        ) {
          results.push({ scene, subScene, phrase });
        }
      });
    });
  });

  return results;
}
