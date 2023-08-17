function PostApi(data) {
  return fetch(`http://localhost:8080/api/createProposal`, {
    headers: { "Authorization":localStorage.getItem("headers")},
    method: "POST",
    body: data,
  }).then((res) => {
    if (res.status === 201) {
      return res.json();
    }
  });
}


function GetApi() {
  return fetch(`http://localhost:8080/api/getvendorproposal`,{
    headers: { "Authorization":localStorage.getItem("headers")}
  })
  .then((data) =>
    data.json()
  );
}

function PutApi(data, id) {
  return fetch(`http://localhost:8080/api/updateproposal/${id}`, {
    headers: { "Access-Control-Allow-Origin": "*" },
    method: "PUT",
    body: data,
  }).then((res) => {
    if (res.status === 201) {
      return res.json();
    }
  });
}

function DeleteApi(id) {
  return fetch(`http://localhost:8080/api/deleteproposal/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => {
      return e.json();
    });
}

export { PostApi, GetApi, PutApi, DeleteApi };
