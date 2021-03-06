import React from "react";
import Styles from "../../styles/SinglePost.module.scss";
import Link from "next/Link";

export default function Categories({ title, image, id }) {
  return (
    <>
      <div className={Styles.category_container}>
        <span className={Styles.category_image}>
          <style jsx>
            {`
              span {
                background-image: url(${"/assets/" + image});
                background-size: 100% 100%;
                background-repeat: no-repeat;
              }
            `}
          </style>
        </span>
        <Link
          href={{
            pathname: `/posts/${id}`,
            query: { id: id },
          }}
        >
          <div className={Styles.category_caption}>{title}</div>
        </Link>
      </div>
    </>
  );
}
