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
    return (<div className="todo-container">
        <h2>Todo List</h2>
        {loading && <p>Loading...</p>}
        {(error) && <p>Error : {error?.message}</p>}

        {!error && data?.getTodos?.length > 0 ?
            <div className="main-todo">
                {data?.getTodos.map((item, index) => {
                    return (<div className="inner-todo">
                        <h3>
                            Todo Title : {item?.title}
                        </h3>
                        <h4>User Information</h4>
                        <p>
                            Name :{item?.user?.name}
                        </p>
                        <p>
                            Email :{item?.user?.email}
                        </p>
                    </div>)
                })}
            </div> :
            <p>No Data</p>
        }
    </div>);
}

export default TodoLists;