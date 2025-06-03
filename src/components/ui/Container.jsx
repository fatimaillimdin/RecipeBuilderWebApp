/** @format */

export const Container = ({ className = "", children, ...props }) => {
  return (
    <div className={`container-custom ${className}`} {...props}>
      {children}
    </div>
  );
};

export const Section = ({ className = "", children, isPadded = true, ...props }) => {
  return (
    <section className={`${isPadded ? "py-12 md:py-16 lg:py-20" : ""} ${className}`} {...props}>
      {children}
    </section>
  );
};
