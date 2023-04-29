import { defineComponent, reactive, ref } from "vue";
import "./index.sass";
import MarkdownIt from "markdown-it";

export default defineComponent({
  setup() {
    const arr = reactive([
      { list: "1111111111111111111111111111111111111111" },
    ]);
    const disBoole = ref(0);
    const navBool = ref(false);
    const markdown = 'hello world';
    function disChange(v) {
      console.log(v);
      disBoole.value = v;
    }
    const md = new MarkdownIt();
    return () => {
      return (
        <div class={["BokeData", "width", "box-sizing"]}>
          <div class={["BokeData-box", "width", "box-sizing"]}>
            <div class={["box-left"]}>
              <div class={["left-list-top"]}>博客列表</div>
              <div class={["left-list-ul"]}>
                {arr.map((item, index) => {
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
                      <div title={item.list}>{item.list}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div class={["box-right", "box-sizing"]}>
              <div class={["right-box", "box-sizing"]}>
                <div
                  class={["right-loading"]}
                  style={{ display: navBool.value ? "block" : "none" }}
                >
                  <el-empty description="暂无信息"></el-empty>
                </div>
                <div
                  class={["right-nav", "box-sizing"]}
                  style={{ display: navBool.value ? "none" : "block" }}
                >
                  <div v-html={md.render(markdown)}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
  },
});
