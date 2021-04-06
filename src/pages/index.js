import React, { useEffect } from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/layout'
import CompanyTeaser from "../components/companyTeaser"

const Companies = ({data}) => {

  // Dynamically pull my page title.
  useEffect( () => {
    async function GetPageTitle() {
      const pageTitleData = await fetch(`https://dev-vation-d9-01.pantheonsite.io/jsonapi/node/page/1ba531a1-e91b-4faa-a8ef-750839d97acd`)
        .then(resp => resp.json())
      console.log(pageTitleData)
    }
    GetPageTitle()
  })

  const companies = data.allNodeCompany.nodes

  return (
    <Layout>
      <h1>Companies</h1>

      {/* Display my dynamically pulled page title. */}

      {companies.map(company => (
        <CompanyTeaser
          key={company.id}
          title={company.title}
          path={company.path.alias}
          image={company.relationships.field_logo.localFile.childImageSharp.fluid}
          alt={company.field_logo.alt}
          summary={company.body.summary}
        />
      ))}
    </Layout>
  )
}

export const query = graphql`
  {
    allNodeCompany(sort: {fields: title, order: ASC}) {
      nodes {
        id
        title
        body {
          summary
        }
        field_logo {
          alt
        }
        path {
          alias
        }
        relationships {
          field_logo {
            localFile {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default Companies