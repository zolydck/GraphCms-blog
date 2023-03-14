import { GraphQLClient, gql } from 'graphql-request';

//const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphqlAPI = 'https://api-ap-south-1.hygraph.com/v2/clcefx53b4w1m01uo6o0bgh4a/master'
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NzQ0OTQyNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NsY2VmeDUzYjR3MW0wMXVvNm8wYmdoNGEvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6IjgzNjRhZGM2LTBiNWQtNDliMi1hMjYxLWE3ZDVhMGQ4ZjdjYiIsImp0aSI6ImNsZDkybnB2ZDBjcHYwMXVwZmwydDEydmgifQ.41RgOAElDaQzNCTRC_Gmb8ZHDc0TXjLkgIDsblWqRWLUkoaPC7lHdwAApkVgkedIwIp0fV5t0OoFvlqzfU69KA08al67k_Z1cLPWev2Mcen7sVnU0mkdHPjNpqMdUrhBBFTWL31sdcpvENYYP4_s88R0IUSKkhYECiiGyAFGN8OMjplYIOXsITVHI6MJInbxKeR7W_AHg_3ilJcMKr36FgFWoJcZdzOrlD_dN8VcxkobNX8VwROaPUZOPassH7fG1A9gzEAgw86Twke2TavXpGxVgj02rfbBnq5kCw8hkU3_yrzI15xWV1fs9yCnbXkknztWl-ZcU4ZXk6n83Jj7zZoAaocv8h_O0FBSZtttsYNptuu67HzCmK9_qzd5iJ_jh2Zw15OZ6ovLRmwPfONDoy1gm0ZB0baNKwnZxFx2zzJP9QHFBYFqGN1sEJDyquJVjmbLrZYvAwBpVNdVVKo70yOqrqvsPMXa5iq88QgTbpms-puzkE6pmUMWGY7k2y6bUHFtERCI-uO-D2sQsp2iKd9QB1_xY3kLM7-g5aEYMw5oZZ0JqAsLM89yiWI_14Du7kEW184OCDXsV8vrmBWZ16C4p4GMRkM63JoHyCLaqoA2OvXWWDlPSPMFDYnobON3GFxVALEcXwSn0zVG2VKhmzVopa0YPrPw4kt4EDw35PI'

export default async function comments(req,res) {

  const {name,email,slug,comment} = req.body
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers : {
      authorization : `Bearer ${token}`
    }   
  })
 
  const query = gql`
  mutation CreateComment($name : String!, $email: String!, $comment: String!, $slug: String!){
    createComment(data: {name : { name : $name, email: $email, comment: $comment, post: { connect : { slug: $slug}}}} )
  {id}
  `
  const result = await graphQLClient.request(query , req.body)
  return res.status(200).send(result);

}