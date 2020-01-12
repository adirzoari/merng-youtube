import React, { useState,useContext, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Header,Transition } from "semantic-ui-react";
import { PostCard,PostForm } from "../components";
import { AuthContext } from "../context/auth";
import { FETCH_POSTS_QUERY } from "../util/graphql";


function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const [posts, setPosts] = useState([]);

 

  useEffect(() => {
		if (data) {
      console.log('data are:',data)
			setPosts(data.getPosts);
		}
	}, [data]);
  
 
  const { user } = useContext(AuthContext);
  console.log("posts are", posts);
  return (
    <Grid container columns={3}>
      <Grid.Row textAlign="centered">
        <Header as="h1">Recent Posts</Header>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          posts &&
          posts.map(post => (
            <Transition.Group animation="fade left" duration={500}>
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
            </Transition.Group>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
