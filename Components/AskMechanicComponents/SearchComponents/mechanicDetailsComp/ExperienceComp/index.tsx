/* eslint-disable @next/next/no-img-element */
import React from "react";
import HoverVideoPlayer from "react-hover-video-player";
import styles from "./experience.module.scss";
import { CgPlayPauseR } from "react-icons/cg";
import { TbCertificate } from "react-icons/tb";
import { AiFillCamera } from "react-icons/ai";
import { BsYoutube } from "react-icons/bs";
import useMechanicDetail from "../useMechanicDetail";
import Link from "next/link";
import Description from "@component/Components/__common/Description";

const ExperienceComp = () => {
  const { specficMechanicdetail } = useMechanicDetail();
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>Experience </div>
          <div className={styles.devider}></div>
          <div className={styles.aboutCard}>
            <div className={styles.left}>
              <img src="../icons/aboutIcon.svg" />
            </div>
            <div className={styles.right}>
              <div className={styles.aboutText}>About me</div>
              <div className={styles.aboutText2}>
                {specficMechanicdetail?.description?.length > 400 ? (
                  <Description
                    faq={
                      specficMechanicdetail?.description
                        ? specficMechanicdetail?.description
                        : ""
                    }
                    length={368}
                  />
                ) : (
                  specficMechanicdetail?.description
                )}
              </div>
              {/* <div className={styles.showMore}>show full description</div> */}
            </div>
          </div>
          <div className={styles.aboutCard}>
            <div className={styles.left}>
              <img src="../icons/certificate.svg" />
              {/* <TbCertificate className={styles.icon} /> */}
            </div>
            <div className={styles.right}>
              <div className={styles.text1}>Certifications</div>
              <div className={styles.certificates}>
                {specficMechanicdetail?.certificates?.map(
                  (item: any, index: any) => {
                    return (
                      <Link href={item?.url} target="_blank" key={index}>
                        <div className={styles.innercertificates}>
                          <img
                            src={item?.url}
                            alt="Certifications"
                            width={100}
                            height={100}
                            key={index}
                          />
                        </div>
                      </Link>
                    );
                  }
                )}
              </div>
            </div>
          </div>
          <div className={styles.aboutCard}>
            <div className={styles.left}>
              <img src="../icons/photoIcon.svg" />
              {/* <AiFillCamera className={styles.icon} /> */}
            </div>
            <div className={styles.right}>
              <div className={styles.text1}>Photos</div>
              <div className={styles.images}>
                {specficMechanicdetail?.photos?.map((item: any, index: any) => {
                  return (
                    <Link href={item?.url} target="_blank" key={index}>
                      <div className={styles.innerimages}>
                        <img
                          src={item?.url}
                          alt="no-images"
                          width={100}
                          height={100}
                          key={index}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.aboutCard}>
            <div className={styles.left}>
              <img src="../icons/videoIcon.svg" />
              {/* <BsYoutube className={styles.icon} /> */}
            </div>
            <div className={styles.right}>
              <div className={styles.text1}>Promotional videos</div>
              <div className={styles.youtubeVideos}>
                {specficMechanicdetail?.videos?.map((item: any, index: any) => (
                  // {
                  //   return (
                  //     <>
                  //       <video width="320" height="240" controls>
                  //         <source src={item?.url} type="video/*" />
                  //       </video>
                  //     </>
                  //   );
                  // }
                  <Link href={item?.url} target="_blank" key={index}>
                    <HoverVideoPlayer
                      videoSrc={item?.url}
                      videoStyle={{
                        height: "176.38px",
                        width: "235.17px",
                        zIndex: 0,
                        borderRadius: "4px",
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                      }}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperienceComp;
