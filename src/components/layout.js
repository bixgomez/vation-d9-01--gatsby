/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
// import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="page-container page-container--default">
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />

      <div className="zone-outer zone-outer--content">
        <div className="zone zone--content">
          <div className="zone-inner zone-inner--content">
            {children}
          </div>
        </div>
      </div>

      <footer>
        © {new Date().getFullYear()}
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
