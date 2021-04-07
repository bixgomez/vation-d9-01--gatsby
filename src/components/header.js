import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <div className="zone-outer zone-outer--header">
    <header className="zone zone--header">
      <div className="zone-inner zone-inner--header">
        <h1 className="site-title">
          <Link className="site-title-link" to="/">
            {siteTitle}
          </Link>
        </h1>
      </div>
    </header>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
