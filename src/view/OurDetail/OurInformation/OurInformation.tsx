import { defineComponent, onMounted } from "vue";
import "./index.sass";
import * as echarts from "echarts";

export default defineComponent({
  setup() {
    function bokeEchart() {
      const myChart = echarts.init(
        document.getElementById("boke-information-echart")
      );
      myChart.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
          },
        ],
      });
    }
    onMounted(() => {
      bokeEchart();
    });
    return () => {
      return (
        <div class={["ourInformation", "box-sizing"]}>
          <div class={["ourInformation-box"]}>
            <div class={["box-top", "box-sizing"]}>
              <div class={["box-top-img"]}>
                <img src="#" />
              </div>
              <div class={["box-top-information", "box-sizing"]}>
                <div class={["information-name", "box-sizing"]}>
                  用户名：<span>username</span>
                </div>
                <div class={["information-nowTime", "box-sizing"]}>
                  时间：
                  <span style={{ color: "red" }}>2023年4月20日 19点49分</span>
                </div>
              </div>
              <div class={["bokeNumber"]}>
                <div class={["bokeNumber-num"]}>123</div>
                <div class={["bokeNumber-get"]}>博客数量</div>
              </div>
            </div>
            <div class={["box-nav", "box-sizing"]}>
              <div class={["box-center", "box-sizing"]}>
                <div id="boke-information-echart"></div>
              </div>
            </div>
          </div>
        </div>
      );
    };
  },
});
