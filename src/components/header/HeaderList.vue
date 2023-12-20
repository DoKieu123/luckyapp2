<template>
  <div id="header-content">
    <ul class="list-item">
      <li class="item-logo">
        <router-link to="/">
          <div class="logo-name">
            <img src="@/assets/logo.png" alt="" />
            <h3>ChuPai</h3>
          </div>
        </router-link>
      </li>
      <ul class="item-pages">
       <li>
            <router-link to="/order" lass="chone-item">
              <i class="fa-solid fa-list"></i>
              <span>Đơn Hàng</span>
            </router-link>
       </li>
        <li>
       <router-link to="/product">
            <i class="fa-solid fa-box-open"></i>
            <span>Sản Phẩm</span>
       </router-link>
        </li>
        <li>
         <router-link to="/client">
            <i class="fa-regular fa-user"></i>
            <span>Khách Hàng</span>
         </router-link>
        </li>
        <li>
          <i class="fa-solid fa-right-to-bracket"></i>
          <span>Đăng Nhập</span>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script>
export default {};
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
  color: white;
}
#header-content{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 25px;
  background-color: #e96196;
  background-image: linear-gradient(315deg, #e96196 0%, #ffffff 74%);
  .logo-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3 {
      margin-left: 15px;
      font-size: 25px;
      color: rgb(255, 114, 126);
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    }
  }
  .item-logo {
    display: flex;
    width: 230px;
    img {
      width: 170px;
    }
  }
  .item-pages {
    width: 55%;
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
    li {
      font-size: 18px;
      padding: 10px 10px;
      border-radius: 10px;
      color: rgb(252, 252, 252);
      background-color: #FC8EAC;
      box-shadow: 0px 4px 6px rgba(8, 8, 8, 0.1);
      span {
        margin-left: 15px;
      }
    }
    .chone-item {
      background-color:#ff7399 ;
      border: 1px solid white;
    }
  }
}
nav {
  padding: 0px;
}
</style>
