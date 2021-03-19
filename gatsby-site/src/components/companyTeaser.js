import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

const CompanyTeaser = ({ title, path, image, alt, summary }) => (
    <div>
      <h2><Link to={path}>{title}</Link></h2>
      <Img fluid={image} alt={alt} />
      <div dangerouslySetInnerHTML={{__html: summary}} />
    </div>
);

export default CompanyTeaser;
