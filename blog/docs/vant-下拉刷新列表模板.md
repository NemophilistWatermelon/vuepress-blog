# vant-下拉刷新-上拉加载列表模板

## 为什么一直会有下拉多次请求
- 多半是布局的问题


## 套路代码
```html
<template>
<div class="monitor-wrap">
  <van-nav-bar
      title="xxx"
      left-arrow
      @click-left="onClickLeft"
  >
   <template #right>
     <div style="position: relative; top: -5px" @click="onClickRight">
       <component
           style="color: #fff"
           :is="FunnelIcon"></component>
       <div style="margin-top: 5px; line-height: 0; color: #fff; font-size: .1rem; font-family: SH">筛选</div>
     </div>
   </template>
  </van-nav-bar>

  <div class="xc-ho-list">
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <van-list
          v-model="loading"
          offset = '5'
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoadlist"
      >
        <!--          <van-empty v-if="empty" image="search" image-size="100" description="暂无数据" />-->
        <template
        >
          <ListItem :key="index" v-for="(item, index) in this.xcsData"/>

        </template>
      </van-list>
    </van-pull-refresh>
  </div>

</div>
</template>

<script>
  import FunnelIcon from '@/pages/monitorSense/icon/Funnel-Icon'
  import PopUpForm from './PopUpModel'
  import ListItem from '@/pages/monitorSense/List-Item.vue'
  import {page} from "@/api/datalist";

  export default {
    name: 'index',

    components: {
      ListItem,
      PopUpForm
    },

    data() {
      return {
        loading: false,
        finished: false,
        isLoading: false,
        FunnelIcon,
        requestData: {
          tbne: 'SWAT_HYRANT',
          pageIndex: 1,
          pageSize: 20
        },
        xcsData: []
      }
    },

    created() {
      this.requestList()
    },

    methods: {
      onLoadlist() {
        this.requestData.pageIndex += 1
        this.requestList()
      },

      onRefresh() {
        this.xcsData = [] // 必须每次赋值前清空
        this.finished = false
        this.isLoading = true
        this.requestData.pageIndex = 1
        this.requestList(true)
      },

      async requestList(refresh) {
        try {
          // 模拟请求方便制作下拉刷新， 联调时候依据接口相应换掉就行
          var result = await page(this.requestData)

          var { records, total } = result

          this.xcsData = this.xcsData.concat(records)

          refresh === true ? (this.xcsData = records) : (console.log('refresh', refresh))
          this.isLoading = this.loading = false
          if (this.xcsData.length === total) {
            this.finished = true
          }
        } catch (e) {
          this.$toast.fail('数据获取失败' + e)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
.xc-ho-list {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 0px;
  overflow: scroll;
}
</style>

```