import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const Company = ({ data }) => {
  const company = data.nodeCompany
  
  return (
    <Layout>
      <h1>{company.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: company.body.processed }} />
    </Layout>
  )
}

export const query = graphql`
  query($CompanyID: String!) {
    nodeCompany(id: { eq: $CompanyID }) {
      id
      title
      body {
        processed
      }
    }
  }
`

export default Company
