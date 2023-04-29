import {
  defineComponent,
  reactive,
  ref,
  getCurrentInstance,
  onMounted,
} from "vue";
import "./index.sass";
import { addBokeList } from "@/utils/axios";
import store from "@/store";

interface IFileList<T> {
  arrlist: Array<T>;
}
interface IFileListT {
  name?: string;
  url?: string;
}

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const forms = reactive({
      title: "",
      select: "",
      nav: "",
    });
    const header = { ContentType: "multipart/form-data" };
    const disBool = ref(false);
    const upload = ref(null);
    const Proptitle = ref("");
    const propsBool = ref(false);
    const PropTypeValue = ref("");
    const options = reactive([
      {
        value: "0",
        label: "vue",
      },
      {
        value: "1",
        label: "node",
      },
      {
        value: "2",
        label: "react",
      },
      {
        value: "3",
        label: "html",
      },
    ]);
    onMounted(() => {});
    function upLoad() {
      propsBool.value = true;
    }

    /**
     * 文件上传函数
     */
    async function fileUpload() {
      if (PropTypeValue.value === "" || Proptitle.value === "") {
        console.log("请输入相关信息");
        return;
      } else if (store.state.user_data.userName === "") {
        console.log("请登录");
        return;
      }
      try {
        proxy.$refs.upload.submit();
      } catch (err) {
        console.log(err);
        return;
      }
    }
    async function fileList(data) {
      if ((data.message = "success")) {
        const { userName } = store.state.user_data;
        const params = {
          anthor: userName,
          type: PropTypeValue.value,
          title: Proptitle.value,
        };
        const res = await addBokeList(params);
        console.log(res.data);
      }
    }



    /**
     * 渲染DOM元素
     */
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
            ref="upload"
            drag
            action="/api/boke/uploadfile"
            auto-upload={false}
            headers={header}
            on-success={fileList}
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip">上传md文件</div>
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

    // 弹窗渲染
    function renderPorp() {
      return (
        <div
          class={["props"]}
          style={{
            display: propsBool.value ? "block" : "none",
            cursor: "pointer",
          }}
        >
          <div class={"props-window"}>
            <div class={["windows"]}>
              <div class={["windows-input"]}>
                <div class={["input-font"]}>请输入关键信息</div>
                <el-input
                  type="text"
                  v-model={Proptitle.value}
                  placeholder="请输入标题"
                ></el-input>
                <el-select
                  style={{ marginTop: "20px" }}
                  v-model={PropTypeValue.value}
                  placeholder="请选择类型"
                >
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
                  <button
                    class={["sure"]}
                    onClick={() => {
                      fileUpload();
                    }}
                  >
                    确认
                  </button>
                  <button
                    class={["reject"]}
                    onClick={() => {
                      propsBool.value = false;
                    }}
                  >
                    取消
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 下方表单渲染
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
