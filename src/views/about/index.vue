<template>
  <div class="content-container unselected">
    <div class="main-content">
      <div class="about">
        <div class="avator">
          <img src="/uploads/images/avatar/avatar.jpg" width="150" height="150" alt="" />
        </div>
        <div class="introduction">
          <ul>
            <li>
              <svg-icon icon="icon-student" width="1.5rem" height="1.5rem"> </svg-icon>
              <span>胡 浪</span>
            </li>
            <li>
              <svg-icon icon="icon-email" width="1.5rem" height="1.5rem"> </svg-icon>
              <span>admin@oibit.cn</span>
            </li>
            <li>
              <svg-icon icon="icon-phone" width="1.5rem" height="1.5rem"> </svg-icon>
              <span>+86 18212092054</span>
            </li>
          </ul>
        </div>
        <div class="skill">
          <ul>
            <li>
              <svg-icon icon="icon-html" width="1.5rem" height="1.5rem"> </svg-icon>
              <span>H5 & CSS3</span>
            </li>
            <li>
              <svg-icon icon="icon-webpack" width="1.5rem" height="1.5rem"> </svg-icon>
              <span>Webpack</span>
            </li>
            <li>
              <svg-icon icon="icon-Vue" width="1.5rem" height="1.5rem"> </svg-icon>
              <span>2.x & 3.0</span>
            </li>
            <li>
              <svg-icon icon="icon-java" width="1.5rem" height="1.5rem"> </svg-icon>
              <span>Spring Boot</span>
            </li>
          </ul>
        </div>
        <div class="social">
          <ul>
            <li>
              <hover-tips>
                <svg-icon icon="icon-github" width="1.5rem" height="1.5rem"> </svg-icon>
                <span><a href="https://github.com/HULANG-BTB" target="_blank">HULANG-BTB</a></span>
                <template #tips>
                  <div style="white-space: nowrap; font-weight: bold; line-height: 2rem">https://github.com/HULANG-BTB</div>
                </template>
              </hover-tips>
            </li>
            <li>
              <hover-tips>
                <svg-icon icon="icon-qq" width="1.5rem" height="1.5rem"> </svg-icon>
                <span>774023581</span>
                <template #tips>
                  <img src="uploads/images/qq.png" width="150" alt="" srcset="" />
                </template>
              </hover-tips>
            </li>
            <li class="wechat">
              <hover-tips>
                <svg-icon icon="icon-wechat" width="1.5rem" height="1.5rem"> </svg-icon>
                <span>HULANG-BTB</span>
                <template #tips>
                  <img src="uploads/images/wechat.png" width="150" alt="" srcset="" />
                </template>
              </hover-tips>
            </li>
          </ul>
        </div>
        <div class="hobbies">
          <ul>
            <li>
              <svg-icon icon="icon-ai" width="1.5rem" height="1.5rem"> </svg-icon>
              <span>Algorithm</span>
            </li>
            <li>
              <svg-icon icon="icon-movie" width="1.5rem" height="1.5rem"> </svg-icon>
              <span>Movies</span>
            </li>
            <li>
              <svg-icon icon="icon-music" width="1.5rem" height="1.5rem"> </svg-icon>
              <span>Musics</span>
            </li>
            <li>
              <svg-icon icon="icon-Game" width="1.5rem" height="1.5rem"> </svg-icon>
              <span>Games</span>
            </li>
          </ul>
        </div>
        <div class="experience">五年高考（前端），三年模拟（开发），如有兴趣，与我联系！</div>
      </div>
    </div>
    <div class="aside-content"></div>
  </div>
</template>

<script>
import HoverTips from '@/components/hover-tips'

export default {
  name: 'About',
  components: { HoverTips }
}
</script>

<style lang="scss" scoped>
.content-container {
  display: flex;
  flex-direction: row;
  width: 100%;

  .main-content {
    flex-grow: 1;
    width: 0;
    margin-right: 0.5rem;

    .about {
      background-color: rgba($color: #fff, $alpha: 0.6);
      border-radius: 1rem;
      margin-top: 80px;
      position: relative;
      padding: 100px 1rem 1rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      .avator {
        width: 150px;
        height: 150px;
        border-radius: 75px;
        position: absolute;
        top: -75px;
        overflow: hidden;

        &:hover {
          animation: avatar 0.7s ease-in 1;
        }
      }

      .introduction,
      .skill,
      .experience,
      .hobbies,
      .social {
        width: 100%;
        padding: 1rem 3rem;
      }

      ul {
        flex-wrap: wrap;
        display: flex;
        flex-direction: row;
        width: 100%;

        li {
          font-size: 0.8rem;
          display: flex;
          flex-direction: row;
          align-items: center;

          &:not(:last-child) {
            margin-right: 2rem;
          }

          svg {
            width: 1.5rem;
            height: 1.5rem;
          }

          :deep() {
            .icon {
              font-size: 1.5rem;
              margin-right: 0.4rem;
            }
            span {
              line-height: 1.5rem;
              margin-left: 0.4rem;
              border-left: rgba($color: #fff, $alpha: 0.6) solid 1px;
            }
          }
        }
      }

      a {
        text-decoration: none;
        color: #000;

        &:active,
        &:hover,
        &:visited {
          color: #000;
        }
      }
    }
  }

  .aside-content {
    width: 220px;
    min-width: 220px;
  }
}
</style>
