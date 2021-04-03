/*
 * This is an experiment in pulling both static and dynamic data into Gatsby on the same page.
 * The static data is from a Drupal 9 site hosted at Pantheon (https://dev-vation-d9-01.pantheonsite.io/)
 * The dynamic data is fetched from two public APIs: swapi.dev and the-beatles-api.herokuapp.com
 * As you can see, one of the APIs is slower than the other!
 */

import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import CompanyTeaser from "../components/companyTeaser"

class HomePage extends React.Component {

  state = {
    loadingCharacters: true,
    loadingAlbums: true,
    fetchedCharacters: [],
    fetchedAlbums: [],
  }

  componentDidMount() {

    // Fetching data from some public APIs
    // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch

    // https://swapi.dev/api/people/
    // https://the-beatles-api.herokuapp.com/api/v1/albums/

    fetch('https://swapi.dev/api/people/')
      .then(response => {
        return response.json()
      })
      .then(json => {
        console.log(json)
        this.setState({
          fetchedCharacters: json.results,
          loadingCharacters: false
      })
    })

    fetch('https://the-beatles-api.herokuapp.com/api/v1/albums/')
      .then(response => {
        return response.json()
      })
      .then(json => {
        console.log(json)
        this.setState({
          fetchedAlbums: json,
          loadingAlbums: false
      })
    })
  }

  render() {

    const companies = this.props.data.allNodeCompany.nodes

    const{
      loadingCharacters,
      fetchedCharacters,
      loadingAlbums,
      fetchedAlbums
    } = this.state

    return (
      <Layout>
        <h1>Static + Dynamic Data</h1>
        <div className={"fontsize__small cols cols__equal"}>
          <div className={"col col__first"}>
            <h3>Star Wars characters, dynamic data from an API:</h3>
            <ul>
              {loadingCharacters ? (
                <li>Loading...</li>
              ) : (
                fetchedCharacters.map(character => <li key={character.name}>{character.name} ({character.height}cm)</li>)
              )}
            </ul>
          </div>
          <div className={"col col__last"}>
            <h3>Beatles albums, dynamic data from an API:</h3>
            <ul>
              {loadingAlbums ? (
                <li>Loading...</li>
              ) : (
                fetchedAlbums.map(album => <li key={album.albumName}>{album.albumName}</li>)
              )}
            </ul>
          </div>
        </div>

        <h3>Company teasers, static data from Drupal:</h3>
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
  query HomePageQuery {
    allNodePage {
      edges {
        node {
          title
        }
      }
    }
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
