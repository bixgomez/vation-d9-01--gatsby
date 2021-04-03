import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import CompanyTeaser from "../components/companyTeaser"

class HomePage extends React.Component {

  state = {
    loading: true,
    error: false,
    fetchedData: [],
  }

  componentDidMount() {
    fetch('https://swapi.dev/api/people/').then(response => {
      return response.json()
    }).then(json => {
      console.log(json)
      this.setState({
        fetchedData: json.results,
        loading: false
      })
    })
  }

  render() {

    // I suspect I am doing something wrong here...
    // "Cannot read property 'nodes' of undefined"
    const companies = data.allNodeCompany.nodes

    const{loading, fetchedData} = this.state

    return (
      <Layout>
        <h1>Companies</h1>            
        <h3>So, now we want to add dynamic data here.</h3>
        <ul>
          {fetchedData.map(character => <li>{character.name}</li>)}
        </ul>
        <hr />

        {/* This is giving me an "'allCompanies' is not defined" error  */}
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
}

// GraphQL query to pull the static content for this page.
export const data = graphql`
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

export default HomePage
