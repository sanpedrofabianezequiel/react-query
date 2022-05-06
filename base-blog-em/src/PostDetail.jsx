import { useQuery, useMutation } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, { method: "DELETE" });
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } });
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery(["comments", post.id], () => fetchComments(post.id));

  const deleteMutation = useMutation((postId) => deletePost(postId));
  const updateMutation = useMutation((postId) => updatePost(postId));
  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error!</h2>;

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isError && <p>{deleteMutation.error.message}</p>}
      {deleteMutation.isLoading && <p>Loading...</p>}
      {deleteMutation.isSuccess && <p>Post deleted</p>}
      {updateMutation.isError && <p>{updateMutation.error.message}</p>}
      {updateMutation.isLoading && <p>Loading...</p>}
      {updateMutation.isSuccess && <p>Post updated</p>}
      
      <button onClick={()=>updateMutation.mutate(post.id)}>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
