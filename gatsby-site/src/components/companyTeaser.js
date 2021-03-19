import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

const CompanyTeaser = ({ title, path, image, alt, summary }) => (
    <div className={ "company-teaser" }>
      <h2 className={ "company-teaser-title" }>
        <Link className={ "company-teaser-link" }
          to={path}>{title}</Link>
      </h2>
      <Img className={ "company-logo" }
        fluid={image}
        alt={alt}
      />
      <div className={ "company-teaser-text" }
        dangerouslySetInnerHTML={{__html: summary}}
      />
    </div>
);

export default CompanyTeaser;
