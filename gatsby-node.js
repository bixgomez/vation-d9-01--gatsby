/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require('path')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const companies = await graphql(`
    {
      allNodeCompany {
        nodes {
          id
          path {
            alias
          }
        }
      }
    }
  `)

  companies.data.allNodeCompany.nodes.map(companyData =>
    createPage({
      path: companyData.path.alias,
      component: path.resolve('src/templates/company.js'),
      context: {
        CompanyID: companyData.id
      },
    })
  )
}

// I think this facilitates aynchronous updates on Gatsby Cloud...
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*"

    // Update the page.
    createPage(page)
  }
}