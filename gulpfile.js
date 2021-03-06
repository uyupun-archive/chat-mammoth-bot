// モジュール読み込み
const gulp = require('gulp');
const axios = require('axios');
const env = require('node-env-file');

env('.env')

// 環境変数設定
const post_url = process.env.POST_URL
const get_url = process.env.GET_URL
const room_id = process.env.ROOM_ID
let interval = process.env.INTERVAL

let word

gulp.task('default', () => {
    setInterval(() => {

        Promise.resolve()
            .then(() => {
                axios.get(get_url)
                    .then(response => {
                        word = response.data.query.random[0].title
                    })
                })
            .then(() => {
                axios.post(post_url, {
                    room_id: room_id,
                    user_id: 'bot',
                    screen_name: 'Bot',
                    comment: word,
                    markdown: 0
                })
        })
    }, eval(interval))
})