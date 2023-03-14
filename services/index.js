import {request , gql} from 'graphql-request';

const graphqlAPI = "https://api-ap-south-1.hygraph.com/v2/clcefx53b4w1m01uo6o0bgh4a/master"//process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
     const query = gql `
     query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                bio
                id
                name
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
      
     `
     const result = await request(graphqlAPI,query)
     return result.postsConnection.edges;
}

export const getPostDetails = async(slug) => {
  const query = gql `
  query getPostDetails($slug : String!) {
    post(where: {slug : $slug})
     {
           author {
             bio
             id
             name
             photo {
               url
             }
           }
           createdAt
           slug
           title
           excerpt
           featuredImage {
             url
           }
           categories {
             name
             slug
           }
           content {
             raw
           }

      }
       
     
   }
  `
  const result = await request(graphqlAPI,query,{ slug })
  return result.post;

}

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last : 3
      ){
        title
        featuredImage{
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query)
  return result.posts;
}

export const getSimilarPosts = async (categories,slug) => {
  const query = gql `
    query GetPostDetails($slug : String!, $categories : [String!]) {
      posts (
        where : { slug_not : $slug, AND: {categories_some : {slug_in: $categories}}}
        last:3
      ){
        title
        featuredImage{
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlAPI,query , {categories,slug})
  return result.posts;
}

export const getCategories = async () => {
  const query = gql`
    query getCategories {
      categories {
        name
        slug
      }
    }
  `
  const result = await request(graphqlAPI,query)
  return result.categories; 
} 

// export const submitContent = async (obj) => {
//   const result = await fetch('/api/comments', {
//     method : 'POST',
//     body : JSON.stringify(obj),
//    })
//    return result.JSON;
// }

export const submitComment = async (obj) => {
   const result = fetch('/api/comments',{
     method: 'POST',
     headers: {
       'Content-Type':'application/json',
     },
     body:  JSON.stringify(obj)
   })
   //console.log(result);
   return result.json();
}
