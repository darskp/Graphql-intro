import { gql, useQuery } from "@apollo/client";

const GET_TODOS = gql`
 query GetTodos {
  getTodos {
    title
    user {
      name
      email
    }
  }
}
`;
const TodoLists = () => {
    const { loading, error, data } = useQuery(GET_TODOS);
    console.log(loading)
    console.log(error)
    console.log(data?.getTodos.length)
    return (
        <div className="todo-container">
            <h2>Todo List</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && data.getTodos.length > 0 ? (
                <div className="todo-list">
                    {data.getTodos.map((item, index) => (
                        <div className="todo-item" key={index}>
                            <h3>{item.title}</h3>
                            <div className="user-info">
                                <h4>User Information</h4>
                                <p>Name: {item.user.name}</p>
                                <p>Email: {item.user.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No Data</p>
            )}
        </div>

   );
}

export default TodoLists;