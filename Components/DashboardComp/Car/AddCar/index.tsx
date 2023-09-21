import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";
const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
// import { Editor } from "react-draft-wysiwyg";
import Modal from "@component/Components/__common/modal";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { RotatingLines } from "react-loader-spinner";
import useCar from "../useCar";
import styles from "./addCar.module.scss";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
import "react-quill/dist/quill.snow.css";

interface Props {
  setOpenAddCar?: (props: any) => void;
  openAddCar?: boolean;
  updateState?: boolean;
}

const AddCar = (prop: Props) => {
  const {
    setOpenAddCar: toggleLoadingState,
    openAddCar,
    updateState: stateForUpdateing,
  } = prop;
  const {
    formik,
    loading,
    handleOpenhelpModal,
    setpopupvisible,
    popupvisible,
    saveCarloading,
    editorState,
    onEditorStateChange,
  } = useCar(toggleLoadingState, stateForUpdateing);
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "align",
    "direction",
    "code-block",
    "link",
    "image",
    "video",
    "background",
    "header",
    "script",
    "color",
  ];

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: ["Roboto"] }],
      [{ size: [] }],
      [
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "code-block",
        "align",
      ],
      [{ color: [] }, { background: [] }],

      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],

    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: true,
      swcMinify: true,
    },
  };
  return (
    <>
      <form className={styles.loginForm} onSubmit={formik.handleSubmit}>
        <div className={styles.formContent}>
          <div className={styles.inputWrapper}>
            <label>Car Name</label>
            <div className={styles.inputStyle}>
              <input
                placeholder="Car Name"
                type="text"
                {...formik.getFieldProps("name")}
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div className={styles.errorStyle}>{formik.errors.name}</div>
            ) : null}
          </div>
          <div className={styles.inputWrapper}>
            <label>Car Model</label>
            <div className={styles.inputStyle}>
              <input
                placeholder="Car Model"
                type="modal"
                {...formik.getFieldProps("modal")}
              />
            </div>
            {formik.touched.modal && formik.errors.modal ? (
              <div className={styles.errorStyle}>{formik.errors.modal}</div>
            ) : null}
          </div>
          <div className={styles.inputWrapper}>
            <label>Year</label>
            <div className={styles.inputStyle}>
              <input
                placeholder="Year"
                type="number"
                min="1900"
                max="2099"
                step="1"
                {...formik.getFieldProps("year")}
              />
              {/* <input
                type="number"
                min="1900"
                max="2099"
                step="1"
                {...formik.getFieldProps("year")}
              /> */}
            </div>
            {formik.touched.year && formik.errors.year ? (
              <div className={styles.errorStyle}>{formik.errors.year}</div>
            ) : null}
          </div>

          <div className={styles.inputWrapper}>
            <label>Car Registration </label>
            <div className={styles.inputStyle}>
              <input
                placeholder="Car Registration number"
                type="text"
                {...formik.getFieldProps("registration")}
              />
            </div>
            {formik.touched.registration && formik.errors.registration ? (
              <div className={styles.errorStyle}>
                {formik.errors.registration}
              </div>
            ) : null}
          </div>

          <div className={styles.rightWrapper}>
            <label>Chassis Number </label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Enter chases number"
                {...formik.getFieldProps("chaseNumber")}
              />
              <button type="button" onClick={handleOpenhelpModal}>
                Help
              </button>
            </div>
            {formik.touched.chaseNumber && formik.errors.chaseNumber ? (
              <div className={styles.errorStyle}>
                {formik.errors.chaseNumber}
              </div>
            ) : null}
          </div>

          <div className={styles.inputWrapper}>
            <label>Renting Company Name</label>
            <div className={styles.inputStyle}>
              <input
                placeholder="Renting Company Name"
                type="text"
                {...formik.getFieldProps("rentingName")}
              />
            </div>
            {formik.touched.rentingName && formik.errors.rentingName ? (
              <div className={styles.errorStyle}>
                {formik.errors.rentingName}
              </div>
            ) : null}
          </div>

          <div className={styles.inputWrapper}>
            <label>Description </label>

            <div className={styles.textAreaStyle}>
              {/* <textarea
                placeholder="Add Description..."
                {...formik.getFieldProps("description")}
              /> */}
              {/* <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    "fontSize",
                    "fontFamily",
                    "list",
                    "textAlign",
                  ],
                  inline: {
                    inDropdown: false,
                  },
                  blockType: {
                    inDropdown: false,
                    options: [
                      "Normal",
                      "H1",
                      "H2",
                      "H3",
                      "H4",
                      "H5",
                      "H6",
                      "Blockquote",
                      "Code",
                    ],
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                  },
                  fontSize: {
                    inDropdown: true,
                    options: [
                      8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96,
                    ],
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                  },
                  fontFamily: {
                    options: [
                      "Arial",
                      "Georgia",
                      "Impact",
                      "Tahoma",
                      "Times New Roman",
                      "Verdana",
                    ],
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                    isDropdown: true,
                  },
                  list: {
                    inDropdown: false,
                  },
                  textAlign: {
                    inDropdown: false,
                  },
                  link: {
                    inDropdown: false,
                  },
                }}
              /> */}
              <QuillNoSSRWrapper
                modules={modules}
                formats={formats}
                value={formik?.values?.description}
                style={{
                  minHeight: "200px",
                  fontFamily: "Roboto",
                }}
                theme="snow"
                onChange={(e: any) => {
                  formik.setFieldValue("description", e);
                }}
                placeholder={"Add Description..."}
              />
            </div>
          </div>
          <div className={styles.btnWrapper}>
            <button type="submit">
              {saveCarloading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="22"
                  visible={true}
                />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </form>
      <Modal
        visible={popupvisible}
        btn
        onClose={(e) => {
          e.preventDefault, setpopupvisible(false);
        }}
      >
        <div className={styles.imageContainer}>
          <img src="/icons/carreference.jpg" alt="no-image" />
        </div>
      </Modal>
    </>
  );
};

export default AddCar;
