import React, { useEffect, useState } from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/layout'
import CompanyTeaser from "../components/companyTeaser"

const PageDataApi = `https://dev-vation-d9-01.pantheonsite.io/jsonapi/node/page/1ba531a1-e91b-4faa-a8ef-750839d97acd`
const StarWarsCharsApi = `https://swapi.dev/api/people/`
const BeatlesAlbumsApi = `https://the-beatles-api.herokuapp.com/api/v1/albums/`

const Companies = ({data}) => {

  const [PageTitle, SetPageTitle] = useState("");
  const [StarWarsChars, SetStarWarsChars] = useState("");
  const [BeatlesAlbums, SetBeatlesAlbums] = useState("");

  // Dynamically pull my page title.
  // https://stackoverflow.com/questions/62781907/react-hooks-0-vs-empty-array-as-second-argument-in-useeffect
  useEffect( () => {

    async function GetPageTitle() {
      const pageTitleData = await fetch(PageDataApi)
      const data = await pageTitleData.json()
      // console.log(data.data.attributes.title)
      SetPageTitle(data.data.attributes.title)
    }
    GetPageTitle()

    async function GetStarWarsChars() {
      const StarWarsCharsData = await fetch(StarWarsCharsApi)
      const data = await StarWarsCharsData.json()
      console.log(data.results)
      SetStarWarsChars(data.results)
    }
    GetStarWarsChars()

    async function GetBeatlesAlbums() {
      const BeatlesAlbumsData = await fetch(BeatlesAlbumsApi)
      const data = await BeatlesAlbumsData.json()
      console.log(data)
      SetBeatlesAlbums(data)
    }
    GetBeatlesAlbums()

  }, [])

  const companies = data.allNodeCompany.nodes

  return (
    <Layout>
      <h1>Companies</h1>

      {/* Display my dynamically pulled page title. */}
      <h2>{PageTitle}</h2>

      <div id={"dynamic-data-wrapper"} className={"fontsize__small cols cols__equal"}>
        <div className={"col col__first"}>
          <h3>Star Wars characters, dynamic data from an API:</h3>
          <ul>
            {/*{StarWarsChars.map(character => (*/}
            {/*  <li key={character.name}>*/}
            {/*    {character.name} ({character.height}cm)*/}
            {/*  </li>*/}
            {/*))}*/}
          </ul>
        </div>
        <div className={"col col__last"}>
          <h3>Beatles albums, dynamic data from an API:</h3>
          <ul>
            {/*{BeatlesAlbums.map(album => (*/}
            {/*  <li key={album.albumName}>{album.albumName}</li>*/}
            {/*))}*/}
          </ul>
        </div>
      </div>

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