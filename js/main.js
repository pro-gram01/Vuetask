(function () {
  "use strict";

  // two way data binding (to UI) = dataとUIを結びつけること

  var vm = new Vue({
    // どの領域と結びつけるかelements = el
    el: "#app",
    // dataというキーを指定
    data: {
      newItem: "",
      todos: []
    },

    watch: {
      todos: {
        handler: function() {
          // todo配列に変更があった際、todosというキーでtodoの値をJSON形式して保存する
          localStorage.setItem('todos', JSON.stringify(this.todos));
          // alert('Data saved!');
        },   
        deep: true
      }
    },

    mounted: function () {
      // localStorageからtodosのキーでデータを取得する(JSONデータをを読み込む),JSON.parseができない場合は、空の配列にする
      this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    },

    methods: {
      addItem: function () {
        var item = {
          // newItemをtitle、isDoneはfalseに設定
          title: this.newItem,
          isDone: false
        };
        // newItemに追加された内容がtodosの末尾に追加される
        // 結果としてli要素として反映される
        this.todos.push(item);
        // アイテム追加後は入力欄を空にする
        this.newItem = "";
      },
      // index番目のアイテムを削除したいためindexを引数で受け取る
      deleteItem: function (index) {
        // 削除の前にare you sure?とメッセージを表示する
        if (confirm("are you sure?")) {
          // index番目から1個削除する
          this.todos.splice(index, 1);
        }
      },
      // purgeメソッド
      purge: function () {
        // 終了したタスクを消す前にdelete finishedとメッセージを表示する
        if (!confirm("delete finished?")) {
          // キャンセルされたときはreturnでそれ以降は何もしない
          return;
        }
        // OKが押されたら、this.todosにはremainingを割り当て
        this.todos = this.remaining;
      },
    },
    // データから自動的にプロパティを計算してくれる、算出プロパティを使用
    computed: {
      remaining: function () {
        // filterはある配列から指定のデータを抽出する際に用いる
        return this.todos.filter(function (todo) {
          // todos配列の中でidDone=falseのものだけを返す
          return !todo.isDone;
        });
      },
    },
  });
})();
