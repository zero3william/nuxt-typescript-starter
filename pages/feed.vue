<template>
  <div>
    <PostPreview
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
  </div>
</template>
 
<script lang='ts'>
import axios from 'axios'
import { Component, Vue } from 'vue-property-decorator'
import Post from '../models/Post'
import PostPreview from '../components/PostPreview.vue'

@Component({
  components: {
    PostPreview
  },
  data() {
    let data: Post[] = [
      { id: 1, title: 'title1', description: 'desc1' },
      { id: 2, title: 'title2', description: 'desc2' }
    ]
    return {
      posts: data
    }
  }
})
export default class FeedPage extends Vue {
  posts: Post[] = []
}
</script>