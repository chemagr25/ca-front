<script>

import { ref } from 'vue'
 
export default {
  props: {
    name: null,
    content: null,
    role: null
  
  },
 
  setup(){


  }
}
</script>



<template>
    
<div class="card">
  <div class="card-top-part">
    <div class="left-part">
      <div class="text-sm mt-5 flex flex-row  w-full">
        <p class="name">{{name}}</p>
        <p class=" text-sm ml-3">{{ role }}</p>
        <!-- <p class="role"> Admin </p> -->
      </div>
      <div class="user-position">
        <p class="position">
       {{ content }}
      </p>
      </div>
    </div>
    <div class="right-part">
     
    </div>
  </div>

</div>
</template>


<style scoped>
.card {
  width: 340px;
  height: 150px;
  background: whitesmoke;
  transition: .2s linear;
  cursor: default;
}

.card-top-part {
  width: 100%;
  height: 70%;
  padding: 15px;
  display: flex;
}

.left-part {
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.right-part {
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.user-name {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}

.name {
  font-size: 24px;
}

.role {
  font-size: 10px;
  color: lightcyan;
  font-weight: bold;
  text-transform: lowercase;
  background-color: lightskyblue;
  padding: 4px 10px;
  border-radius: 15px;
}

.position {
  color: grey;
}

.card-bottom-part {
  width: 100%;
  height: 30%;
  display: flex;
  border: 1px solid rgb(231, 227, 227);
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.user-photo {
  width: 4.5rem;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid rgb(231, 227, 227);
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  width: 100%;
}

.bottom-part {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.bottom-part:hover > .link {
  transform: scale(1.1);
}

.link {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  gap: 5.5px;
  font-weight: bold;
  transition: .2s linear;
}

.icon {
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bottom-part:first-child {
  border-right: 1px solid rgb(231, 227, 227);
}

</style>
