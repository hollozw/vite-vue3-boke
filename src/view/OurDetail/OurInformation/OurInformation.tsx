import { ref, defineComponent, onMounted, reactive } from "vue";
import "./index.sass";
import * as echarts from "echarts";
import { getbokeList } from "@/utils/axios";
import store from "@/store";
import { circleOptions } from "@/utils/bokeType";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    let bokeNumber = ref(0);
    let op = reactive({
      value: circleOptions,
    }); // echart图表信息参数
    let Time = ref(""); // 时间
    function bokeEchart(data) {
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
            data,
          },
        ],
      });
    }

    onMounted(() => {
      getBokeList();
    });

    async function getBokeList() {
      const user_name = store.state.user_data.userName;
      const params = {
        type: "",
        title: "",
        user_name,
      };
      const { data } = await getbokeList(params);
      op.value.forEach((item, index) => {
        item.value = 0;
      });
      if (data.message[0] === "success") {
        bokeNumber.value = data.data.length;
        data.data.forEach((item, index) => {
          let number = Number(item.type);
          op.value[number].value++;
        });
        bokeEchart(op.value);
      }
    }

    return () => {
      return (
        <div class={["ourInformation", "box-sizing"]}>
          <div class={["ourInformation-box"]}>
            <div class={["box-top", "box-sizing"]}>
              <div
                class={["box-top-img"]}
                onClick={() => {
                  router.push({
                    path: "changePhoto",
                  });
                }}
              >
                <img src={store.state.user_href} />
              </div>
              <div class={["box-top-information", "box-sizing"]}>
                <div class={["information-name", "box-sizing"]}>
                  当前用户名：<span>{store.state.user_data.userName}</span>
                </div>
                <div class={["information-boke", "box-sizing"]}>
                  {op.value.map((item, index) => {
                    return (
                      <div class={["information-boke-list"]}>
                        {item.name}:
                        <span style={{ paddingLeft: "10px" }}>
                          {item.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div class={["bokeNumber"]}>
                <div class={["bokeNumber-num"]}>{bokeNumber.value}</div>
                <div class={["bokeNumber-get"]}>所写博客数量</div>
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
