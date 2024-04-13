import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [inputs, setInputs] = useState({
    id: "",
    name: "",
    email: "",
    address: "",
  });

  const [tabledata, settabledata] = useState([]);
  const [editclick, seteditclick] = useState(false);
  const [editindex, seteditindex] = useState("");
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (editclick && editindex) {
  //     try {
  //       const response = await fetch(`http://localhost:4000/update/${editindex}`, {
  //         method: "put",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           name: inputs.name,
  //           email: inputs.email,
  //           address: inputs.address,
  //         }),
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log(data);
  //         // Handle successful update
  //       } else {
  //         // Handle error
  //       }
  //     } catch (error) {
  //       // Handle network or parsing errors
  //     }
  //     seteditclick(false);
  //   } else {
  //     settabledata([...tabledata, inputs]);
  //   }
  //   setInputs({
  //     name: "",
  //     email: "",
  //     address: "",
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editclick) {
      console.log(inputs.id);
      // let temptabledata = tabledata;
      // settabledata([...temptabledata]);
      let updatedata = tabledata.map((item) => {
        // console.log(inputs.name);
        // console.log(inputs.email);
        // console.log(inputs.address);
        if (item.id === inputs.id) {
          return ({
            ...item,
            name:inputs.name,
            email:inputs.email,
            address:inputs.address,
          }
          )
        }
        return item;
      });
      console.log(updatedata);
      // settabledata([...updatedata]);
      setInputs({
        id: "",
        name: "",
        email: "",
        address: "",
      });
      seteditclick(false);
    } else {
      settabledata([...tabledata, inputs]);
      setInputs({
        id: "",
        name: "",
        email: "",
        address: "",
      });
    }
  };

  const handledelete = async(index) => {
    console.log(index);
   
    // filterdata.splice(index, 1);
    // settabledata(filterdata);
    try {
      const response = await fetch(`http://localhost:4000/delete/${index}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        // You can include a request body if needed
      });
  
      if (response.ok) {
        let filterdata = [...tabledata];
        filterdata.splice(index, 1);
        settabledata(filterdata);
        // Handle success, maybe update the UI or state
        console.log('Record deleted successfully!');
      } else {
        // Handle the error case
        console.error('Failed to delete the record');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error occurred while deleting:', error);
    } 
  };

  const handleEdit = async (item) => {
    try {
      const response = await fetch("http://localhost:4000/find/" + item, {
        // Replace with actual endpoint and ID
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data._id);
        setInputs({
          id: data._id,
          name: data.name,
          email: data.email,
          address: data.address,
        });
        // Handle successful update
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle network or parsing errors
    }
    seteditclick(true);
    seteditindex(item);
  };

  let data = async () => {
    if (inputs.id) {
      console.log(inputs);

      try {
        const response = await fetch(
          "http://localhost:4000/update/" + editindex,
          {
            // Replace with actual endpoint and ID
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: inputs._id,
              name: inputs.name,
              email: inputs.email,
              address: inputs.address,
            }),
          }
        );
        if (response.ok) {
          let data = await response.json();
          console.log(data);
          let temptabledata = tabledata;
          Object.assign(temptabledata[editindex])
          settabledata([...temptabledata]);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("insert");
      //post  data in api
      console.log(inputs);
      try {
        const response = await fetch("http://localhost:4000/singup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: inputs.id,
            name: inputs.name,
            email: inputs.email,
            address: inputs.address,
          }),
        });

        if (response.ok) {
          // const data = await response.json();
          // Handle successful response
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle network or parsing errors
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:4000/data");
      const data = await response.json();
      settabledata(data);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <form action="" method="post" name="myform" onSubmit={handleSubmit}>
        <div className="title">
          <h3>Student Information</h3>
        </div>
        <div className="form">
          <div className="id">
            <label for="id">ID:</label>
            <input
              type="number"
              name="id"
              id="myid"
              className="textinput"
              value={inputs._id}
              onChange={handleChange}
            />
            <b>
              <div id="id_error"></div>
            </b>
          </div>
          <div className="username">
            <label for="username">Name:</label>
            <input
              type="text"
              name="name"
              className="textinput"
              value={inputs.name}
              onChange={handleChange}
            />
            <b>
              <div className="name_error"></div>
            </b>
          </div>
          <div className="email">
            <label for="email">Email:</label>
            <input
              type="email"
              name="email"
              className="textinput"
              value={inputs.email}
              onChange={handleChange}
            />
            <b>
              <div className="email_error"></div>
            </b>
          </div>
          <div className="address">
            <label for="address">Address:</label>
            <input
              type="text"
              name="address"
              className="textinput"
              value={inputs.address}
              onChange={handleChange}
            />
            <b>
              <div className="address_error"></div>
            </b>
          </div>
          <div className="btn">
            <button type="submit" onClick={() => data()}>
              {editclick ? "Update" : "Add"}  
            </button>
          </div>
        </div>
      </form>
      <br />
      <div class="mytable">
        <table className="table" border="1">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tabledata.map((item, i) => {
              return (
                <tr>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td>
                    <button
                      className="edit"
                      onClick={() => handleEdit(item._id)}
                    >
                      Edit
                    </button>
                    <button className="del" onClick={() => handledelete(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
