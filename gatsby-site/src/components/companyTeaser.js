import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

const CompanyTeaser = ({ title, path, image, alt, summary }) => (
    <div>
      <link to={path}>
        <h2>{title}</h2>
      </link>
      <Img fluid={image} alt={alt} />
      <div dangerouslySetInnerHTML={{__html: summary}} />
    </div>
);

export default CompanyTeaser;
