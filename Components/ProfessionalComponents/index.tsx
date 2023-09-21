/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Link from "next/link";
import { RotatingLines } from "react-loader-spinner";
import styles from "./professional.module.scss";
import ServicesData from "./servicesData";
import UseProfessionals from "./useProfessionals";
import { GiCheckMark } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import ToolTipComponent from "../__common/ToolTip";
import Maps from "../__common/Popups/maps";
const ProfessionalComp = () => {
  const {
    formik,
    loading,
    value,
    setValue,
    showPass,
    setShowPass,
    isCorrectEmail,
    setAddress,
    address,
    setClickedLocation,
    clickedLocation,
    setpopupvisible,
    popupvisible,
  } = UseProfessionals();
  return (
    <>
      <Maps
        clickedLocation={clickedLocation}
        setClickedLocation={setClickedLocation}
        setAddress={setAddress}
        popupvisible={popupvisible}
        setpopupvisible={setpopupvisible}
        // currentLocation={currentLocation}
        // address={address}
      />
      <div className={styles.Container}>
        <div className={styles.wrapper}>
          <div className={styles.mobileViewHeading}>
            <div className={styles.MobileLeftSideHeading}>
              PROVIDE A PROFESSIONAL & RELIABLE SERVICE
            </div>
            <div className={styles.Mobilepara}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using.
            </div>
          </div>
          <div className={styles.leftSide}>
            <div className={styles.leftSideHeading}>
              PROVIDE A PROFESSIONAL & RELIABLE SERVICE
            </div>
            <div className={styles.para}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using.
            </div>
            <div className={styles.servicesWrapper}>
              {ServicesData.map((item, index) => {
                return (
                  <>
                    <div className={styles.card} key={index}>
                      <img src={item?.logo} alt="icon" />
                      <div className={styles.heading}>{item?.title}</div>
                      <div className={styles.description}>{item?.desc}</div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className={styles.formWrapper}>
            <form className={styles.profileForm} onSubmit={formik.handleSubmit}>
              <div className={styles.formContent}>
                <div className={styles.heading}>
                  Create Your Free Professional Profile
                </div>
                <div className={styles.inputWrapper}>
                  <label>Company Name *</label>
                  <div className={styles.inputStyle}>
                    <input
                      placeholder="e.g Honda"
                      type="text"
                      {...formik.getFieldProps("name")}
                    />
                  </div>
                  {formik.touched.name && formik.errors.name ? (
                    <div className={styles.errorStyle}>
                      {formik.errors.name}
                    </div>
                  ) : null}
                </div>
                <div className={styles.inputWrapper}>
                  <label>VAT No. *</label>
                  <div className={styles.inputStyle}>
                    <input
                      placeholder="e.g DE2334HK29Los27"
                      type="text"
                      {...formik.getFieldProps("vat")}
                    />
                    <ToolTipComponent
                      right="left"
                      text="VAT number should be minimum 9 characters and maximum 12 characters"
                      width={"200px"}
                    />
                  </div>
                  {formik.touched.vat && formik.errors.vat ? (
                    <div className={styles.errorStyle}>{formik.errors.vat}</div>
                  ) : null}
                </div>
                <div className={styles.inputWrapper}>
                  <label>Address *</label>
                  <div
                    className={styles.inputStyle}
                    onClick={() => setpopupvisible(true)}
                  >
                    <input
                      // disabled
                      onClick={() => setpopupvisible(true)}
                      placeholder="Enter your street address, city, state, and zip code."
                      type="text"
                      value={address}
                      // {...formik.getFieldProps("address")}
                    />
                  </div>
                  {/* {formik.touched.address && formik.errors.address ? (
                    <div className={styles.errorStyle}>
                      {formik.errors.address}
                    </div>
                  ) : null} */}
                </div>
                <div className={styles.inputWrapper}>
                  <label>Mobile phone *</label>
                  <PhoneInput
                    international
                    defaultCountry="ES"
                    value={formik?.values?.phone}
                    onChange={(e: any) => formik.setFieldValue("phone", e)}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className={styles.errorStyle}>
                      {formik.errors.phone}
                    </div>
                  ) : null}
                </div>
                <div className={styles.inputWrapper}>
                  <label>Email *</label>
                  <div className={styles.inputStyle}>
                    <input
                      placeholder="e.g someone@gmail.com"
                      type="text"
                      {...formik.getFieldProps("email")}
                    />
                    {isCorrectEmail === true ? (
                      <GiCheckMark className={styles.pIcon} />
                    ) : isCorrectEmail === false ? (
                      <RxCross1 className={styles.pIcon} />
                    ) : null}
                  </div>
                  {formik.touched.email && formik.errors.email ? (
                    <div className={styles.errorStyle}>
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
                <div className={styles.inputWrapper}>
                  <label>Password *</label>
                  <div className={styles.inputStyle}>
                    <input
                      placeholder="******"
                      type={showPass ? "text" : "password"}
                      {...formik.getFieldProps("password")}
                    />
                    {!showPass ? (
                      // <BsEyeSlashFill
                      //   className={styles.pIcon}
                      //   onClick={() => setShowPass(!showPass)}
                      // />
                      <img
                        src="/icons/closeEye.svg"
                        alt="seprator"
                        className={styles.pIcon}
                        onClick={() => setShowPass(!showPass)}
                      />
                    ) : (
                      // <BsEyeFill
                      //   className={styles.pIcon}
                      //   onClick={() => setShowPass(!showPass)}
                      // />
                      <img
                        src="/icons/showPass.svg"
                        alt="seprator"
                        className={styles.pIcon}
                        onClick={() => setShowPass(!showPass)}
                      />
                    )}
                  </div>
                  {formik.touched.password && formik.errors.password ? (
                    <div className={styles.errorStyle}>
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <div className={styles.inputWrapper}>
                  <label>Renting Company Names *</label>
                  <div className={styles.inputStyle}>
                    <input
                      placeholder="e.g AUDI"
                      type="text"
                      {...formik.getFieldProps("rentingCompany")}
                    />
                    <ToolTipComponent
                      right="left"
                      text="Please, Separate renting company names with comma."
                      width={"200px"}
                    />
                  </div>
                  {formik.touched.rentingCompany &&
                  formik.errors.rentingCompany ? (
                    <div className={styles.errorStyle}>
                      {formik.errors.rentingCompany}
                    </div>
                  ) : null}
                </div>
                <div className={styles.radioWrapper}>
                  <div className={styles.workShopSide}>
                    <input
                      type="radio"
                      name="radioValue"
                      value="option1"
                      checked={formik.values.radioValue === "option1"}
                      onChange={formik.handleChange}
                    />
                    &nbsp; I'm a Workshop
                  </div>
                  <div className={styles.workShopSide}>
                    <input
                      type="radio"
                      name="radioValue"
                      value="option2"
                      checked={formik.values.radioValue === "option2"}
                      onChange={formik.handleChange}
                    />
                    &nbsp; Other
                  </div>
                </div>
                {formik.values.radioValue === "option1" ? (
                  <div className={styles.inputWrapper}>
                    <label>Workshop ID*</label>
                    <div className={styles.inputStyle}>
                      <input
                        required={true}
                        placeholder=""
                        type="number"
                        {...formik.getFieldProps("id")}
                      />
                    </div>
                    {formik.touched.id && formik.errors.id ? (
                      <div className={styles.errorStyle}>
                        {formik.errors.id}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  ""
                )}
                {formik.touched.radioValue && formik.errors.radioValue ? (
                  <div className={styles.errorStyle}>
                    {formik.errors.radioValue}
                  </div>
                ) : null}
                <div className={styles.termsCheck}>
                  <div className={styles.checkTerm}>
                    <input type="checkbox" {...formik.getFieldProps("terms")} />
                  </div>
                  <div className={styles.termsText}>
                    I accept the{" "}
                    <Link href="/terms">
                      <span>terms and conditions</span>
                    </Link>{" "}
                    of car marketplace services. I Declare that i have read and
                    understood the <span>privacy policy</span>
                  </div>
                </div>
                {formik.touched.terms && formik.errors.terms ? (
                  <div className={styles.errorStyle}>{formik.errors.terms}</div>
                ) : null}
                <div className={styles.btnWrapper}>
                  <button type="submit">
                    {loading ? (
                      <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="22"
                        visible={true}
                      />
                    ) : (
                      "Create my free profile"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalComp;
