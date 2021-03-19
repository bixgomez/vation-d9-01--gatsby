import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/layout'
import CompanyPreview from "../components/companyPreview"

const Companies = ({data}) => {
  const companies = data.allNodeCompany.nodes

  return (
    <Layout>
      <h1>Companies</h1>
      {companies.map(company => (
        <CompanyPreview
          key={company.id}
          title={company.title}
          path={company.path.alias}
          image={company.article.relationships.field_logo.localFile.childImageSharp.fluid}
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
                fluid(maxWidth: 250) {
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