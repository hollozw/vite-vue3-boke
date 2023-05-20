import { defineComponent, reactive, ref, onMounted, watch } from "vue";
import store from "@/store";
import "./index.sass";
import { getbokeList } from "@/utils/axios";
import { ElMessage } from "element-plus";
import { options } from "@/utils/bokeType";
export default defineComponent({
  setup() {
    let bokeList = reactive({
      value: [{ user_name: "", title: "", file_data: "", type: "" }],
    });
    onMounted(() => {
      getListData();
    });
    const title = ref(""); // 标题内容
    let typeValue = ref(""); // 类别选择参数
    const disBoole = ref(-1); // 列表标志
    let dataHTML = ref<string>(""); // 文本内容
    function disChange(newValue) {
      dataHTML.value = bokeList.value[newValue].file_data;
      disBoole.value = newValue;
    }
    async function getListData() {
      const user_name = store.state.user_data.userName;
      const parmas = {
        type: "",
        title: "",
        user_name,
      };
      const { data } = await getbokeList(parmas);
      if (data.message[0] === "success") {
        if (data.data.length === 0) {
          ElMessage.error("当前信息为空");
          return;
        }
        bokeList.value = data.data;
      }
    }

    /**
     * 搜索按钮功能
     */
    async function selectKeyWord() {
      dataHTML.value = "";
      disBoole.value = -1;
      const user_name = store.state.user_data.userName;
      const parmas = {
        type: typeValue.value,
        title: title.value,
        user_name,
      };
      const { data } = await getbokeList(parmas);
      if (data.message[0] === "success") {
        if (data.data.length === 0) {
          ElMessage.error("当前信息为空");
          typeValue.value = "";
          title.value = "";
          return;
        }
        typeValue.value = "";
        title.value = "";
        bokeList.value = data.data;
      }
    }

    return () => {
      return (
        <div class={["BokeData", "width", "box-sizing"]}>
          <div class={["BokeData-box", "width", "box-sizing"]}>
            <div class={["box-left"]}>
              <div class={["left-list-top"]}>
                <strong>博客列表</strong>
              </div>
              <div class={["left-list-ul"]}>
                {bokeList.value.map((item, index) => {
                  return (
                    <div
                      class={[
                        "left-list-li",
                        disBoole.value === index ? "left-list-li-hid" : "",
                      ]}
                      onClick={() => {
                        disChange(index);
                      }}
                    >
                      <div title={item.title}>{item.title}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div class={["box-right", "box-sizing"]}>
              <div class={["box-select"]}>
                <div class={["box-input"]}>
                  <div class={["input-title"]} v-model={title.value}>
                    <el-input
                      type="text"
                      placeholder="请输入标题..."
                      v-model={title.value}
                    ></el-input>
                  </div>
                  <div class={["input-select"]}>
                    <el-select
                      v-model={typeValue.value}
                      placeholder="请选择类型"
                    >
                      {options.map((item, index) => {
                        return (
                          <el-option
                            style="height: 100%"
                            key={item.value}
                            label={item.label}
                            value={item.value}
                          ></el-option>
                        );
                      })}
                    </el-select>
                  </div>
                </div>
                <div class={["box-btn"]}>
                  <button
                    class={["btn"]}
                    onClick={() => {
                      selectKeyWord();
                    }}
                  >
                    {typeValue.value === "" && title.value === ""
                      ? "查看所有信息"
                      : "搜索"}
                  </button>
                </div>
              </div>
              <div class={["right-box", "box-sizing"]}>
                <div
                  class={["right-loading"]}
                  style={{ display: dataHTML.value === "" ? "block" : "none" }}
                >
                  <el-empty description="暂无内容,请选择标题"></el-empty>
                </div>
                <div
                  class={["right-nav", "box-sizing"]}
                  style={{ display: dataHTML.value === "" ? "none" : "block" }}
                >
                  <div v-html={dataHTML.value}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
  },
});
