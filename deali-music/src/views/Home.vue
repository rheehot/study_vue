<template>
  <div class="home">
    <section class="my_play_list"  v-if="dealiName">
      <h2>
        나의 플레이리스트
      </h2>
      <div class="group_list">
        <article v-for="data in myGroupKeys" :key="data.groupKey">
          <my-group-list :groupKey="data.groupKey" :target-name="data.targetName"></my-group-list>
        </article>
      </div>
    </section>
    <section class="recomend_play_list">
      <h2>
        공개 플레이리스트
      </h2>
      <div class="recomend_group_list">
        <article v-for="(list, idx) in openGroupList" :key="idx">
          <open-group-list :openGroupData="list"></open-group-list>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api';
import MyGroupList from '@/components/List/MyGroupList';
import openGroupList from '@/components/List/OpenGroupList';
import { getOpenGroup } from '@/service/Group';
import { getMusicListByGroup } from '@/service/Music';

const myGroup = (userInfo) => {
  const myGroupKeys = ref([]);
  
  const getMyGroupList = () => {
    const data = {
      dealiName: userInfo.value.dealiName,
      groupKey: '',
    };

    getMusicListByGroup(data).once('value', snapshot =>{
        if (!snapshot.val()) return;
        const keys = Object.keys(snapshot.val()).sort(()=> Math.random() - Math.random()).splice(0,2);
        for (let i=0; i<keys.length; i+=1) {
            myGroupKeys.value.push({
            targetName: userInfo.value.dealiName,
            groupKey: keys[i],
          });
        }
        
    });
  };
  
  return {
    myGroupKeys,
    getMyGroupList,
  }
};

const openGroup = () => {
  const openGroupList = ref([]);
  const likeGroupList = ref([]);
  
  getOpenGroup().once('value', snapshot => {
    if (!snapshot.val()) return;
    openGroupList.value = Object.values(snapshot.val()).sort(() => Math.random() - Math.random());
  });
  
  return {
    openGroupList,
    likeGroupList,
  }
};

export default {
  name: 'Home',
  components: {
    MyGroupList,
    openGroupList,
  },
  setup(props, { root }) {
    const userInfo = computed(()=> root.$store.getters['login/getUserStatus']);
    const dealiName = computed(()=> root.$store.getters['login/getUserStatus'].dealiName);
    const { myGroupKeys, getMyGroupList } = myGroup(userInfo);
    const { openGroupList } = openGroup(dealiName);

    watch(dealiName, newValue => {
       if (newValue) getMyGroupList();
    });

    return {
      myGroupKeys,
      openGroupList,
      dealiName,
      userInfo,
    }
  }
}
</script>

<style lang="scss" scoped>
  .home{
    
    section{
      margin-top: 64px;

      h2{
        font-size:28px;
        margin-bottom: 32px;
      }
      .group_list{
        display: flex;
        justify-content: space-between;
      }
    }
    .my_play_list{
      margin-bottom: 48px;
    }

    .recomend_group_list{
      display: grid;
      gap: 10px 24px;
      grid-template-rows: 250px;
      grid-template-columns: repeat(4, 1fr);
      margin-bottom: 300px;
    }
  }
</style>
