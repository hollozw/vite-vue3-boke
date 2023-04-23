import { defineComponent, reactive, ref } from "vue";
import "./index.sass";
export default defineComponent({
  setup() {
    const forms = reactive({
      title: "",
      select: "",
      nav: "",
    });
    const disBool = ref(false);
    const propsBool = ref(false);
    const options = reactive([
      {
        value: "选项1",
        label: "黄金糕",
      },
      {
        value: "选项2",
        label: "双皮奶",
      },
      {
        value: "选项3",
        label: "蚵仔煎",
      },
      {
        value: "选项4",
        label: "龙须面",
      },
      {
        value: "选项5",
        label: "北京烤鸭",
      },
    ]);
    const value = ref("");

    function upLoad() {
      propsBool.value = true;
      console.log(1);
    }
    function rendeTopOther() {
      return (
        <div
          class={["right-tops"]}
          style={{ width: "50%", display: disBool.value ? "none" : "block" }}
        >
          <button
            onClick={() => {
              disBool.value = true;
            }}
          >
            使用文件上传
          </button>
        </div>
      );
    }

    function rendeTop() {
      return (
        <div
          class={["right-topsOther"]}
          style={{ display: disBool.value ? "block" : "none" }}
        >
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
          <div class={["right-topsOther-btn-config"]}>
            <button onClick={upLoad}>上传</button>
          </div>

          <div class={["right-topsOther-btn"]}>
            <button
              onClick={() => {
                disBool.value = false;
              }}
            >
              取消
            </button>
          </div>
        </div>
      );
    }

    function renderPorp() {
      return (
        <div
          class={["props"]}
          style={{
            display: propsBool.value ? "block" : "none",
            cursor: "pointer",
          }}
          onClick={() => {
            propsBool.value = false;
          }}
        >
          <div class={"props-window"}>
            <div class={["windows"]}>
              <el-select v-model={value.value} placeholder="请选择类型">
                {options.map((item, index) => {
                  return (
                    <el-option
                      key={item.value}
                      label={item.label}
                      value={item.value}
                    ></el-option>
                  );
                })}
              </el-select>
              <div class={["window-sure"]}>
                <button>确认</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    function renderForm() {
      return (
        <div class={["createIng-form"]}>
          <el-form moudel={forms}>
            <el-form-item label="标题">
              <el-input v-model={forms.title}></el-input>
            </el-form-item>
            <el-form-item label="标题">
              <el-select v-model={forms.select} placeholder="请选择类型">
                {options.map((item, index) => {
                  return (
                    <el-option
                      key={item.value}
                      label={item.label}
                      value={item.value}
                    ></el-option>
                  );
                })}
              </el-select>
            </el-form-item>

            <el-form-item label="内容">
              <el-input
                autosize={{ maxRows: 10 }}
                v-model={forms.nav}
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class={["form-button", "width"]}>
            <button class={["form-button-config"]}>确认</button>
            <button class={["form-button-concel"]}>取消</button>
          </div>
        </div>
      );
    }
    return () => {
      return (
        <div class={["createIng-Props"]}>
          {renderPorp()}
          <div class={["createIng", "width", "box-sizing"]}>
            <div class={["createIng-top", "width", "box-sizing"]}>
              {rendeTopOther()}
              {rendeTop()}
            </div>
            <div class={["createIng-bottom", "width", "box-sizing"]}>
              {renderForm()}
            </div>
          </div>
        </div>
      );
    };
  },
});
