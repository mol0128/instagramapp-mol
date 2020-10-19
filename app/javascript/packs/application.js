// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()


document.addEventListener('turbolinks:load', () => {

  $(function(){
    $(`.inactive-heart`).on('click', function() {
      const articleId = $(this).attr('id')
      axios.post(`/articles/${articleId}/like`)
        .then((response) => {
          if (response.data.status === 'ok') {
            $(this).addClass('hidden')
            $(`#${articleId}.active-heart`).removeClass('hidden')
          }
        })
        .catch((e) => {
          window.alert('Error')
          console.log(e)
        })
    })
  })

  $(function(){
    $(`.active-heart`).on('click', function() {
      const articleId = $(this).attr('id')
      axios.delete(`/articles/${articleId}/like`)
        .then((response) => {
          if (response.data.status === 'ok') {
            $(`#${articleId}.inactive-heart`).removeClass('hidden')
            $(this).addClass('hidden')
          }
        })
        .catch((e) => {
          window.alert('Error')
          console.log(e)
        })
    })
  })

    if($('#article-show').length) {

      const dataset = $('#article-show').data()
      const articleShowId = dataset.articleShowId
    
      axios.get(`/articles/${articleShowId}/comments`)
        .then((response) => {
          const comments = response.data
          comments.forEach((comment) => {
            $('.comments-container').append(
              `<div class="article-comment"><p>${comment.content}</p></div>`
            )
          })
        })
    
        $('.add-comment-btn').on('click', () => {
          const content = $('#comment_content').val()
          if (!content) {
            window.alert('コメントを入力してください')
          } else
          axios.post(`/articles/${articleShowId}/comments`, {
            comment: {content: content}
          })
            .then((res) => {
              const comment = res.data
              $('.comments-container').append(
                `<div class="article-comment"><p>${comment.content}</p></div>`
              )
              $('#comment_content').val('')
            })
        })
    }
})