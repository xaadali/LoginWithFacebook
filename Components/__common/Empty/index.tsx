/* eslint-disable @next/next/no-img-element */
import styles from "./emptyCompo.module.scss";

interface prop {
  search?: any;
}
export const EmptyCompo = (Props: prop) => {
  const { search } = Props;
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img src="/icons/nodata.svg" alt="noDAta" />
        {search ? (
          <div className={styles.heading}>
            We couldn&apos;t find any workshops matching your search criteria.
          </div>
        ) : (
          <div className={styles.heading}>No Data Available</div>
        )}
      </div>
    </div>
  );
};

export const EmptyBookedSlots = () => {
  return (
    <div className={styles.BookingSlotsContainer}>
      <div className={styles.BookingSlotswrapper}>
        <img src="/icons/No data-amico.svg" alt="noDAta" />
      </div>
    </div>
  );
};

export const PlanCompo = () => {
  return (
    <div className={styles.Emptycontainer}>
      <div className={styles.Emptywrapper}>
        {/* <div className={styles.text}>
          Upgrade to a higher plan to access this feature.
        </div> */}
        <img src="/backgrounds/planAlert.png" alt="noDAta" />
      </div>
    </div>
  );
};
