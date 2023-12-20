<template>
  <div>
    <ul class="titile-item title-order">
      <li>
        <h2>{{ titile }}</h2>
      </li>
      <li>
        <i class="fa-solid fa-dollar-sign"></i>
        <span> Vay vốn kinh doanh </span>
      </li>
      <li>
        <i class="fa-solid fa-question"></i>
        <span> Trợ giúp </span>
      </li>
      <li>
        <i class="fa-solid fa-heart"></i>
        <span> Góp ý </span>
      </li>
      <li>
        <i class="fa-solid fa-camera-retro"></i>
        <span> Giới thiệu </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    props:{
        titile:{
            type: String
        }
    }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
.title-order {
  position: fixed;
  top: 79px;
  padding-top: 40px;
  width: 23%;
  height: 87.5vh;
  background-color: rgb(255, 170, 184);
  border-radius: 20px;
  li {
    padding: 18px 0px;
    width: 90%;
    margin: 0 auto;
    margin-bottom: 32px;
    border: 2px solid rgb(250, 250, 250);
   background-color: #C0EEE4;
    border-radius: 50px;
    color: rgb(255, 255, 255);
    transition: transform 0.4s ease;

    i {
      margin-right: 10px;
      padding: 6px 10px;
      border: 1px solid white;
      border-radius: 50%;
      color: rgb(255, 144, 163);
    }
  }
  li:hover {
    transform: translateY(-3px);
  }
}
</style>
