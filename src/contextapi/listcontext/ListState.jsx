import { useState } from "react";
import listContext from "./listContext";
import { baseUrls } from "../../baseUrls";
import { errorEmitter, successEmitter } from "../../ToastEmitter";
import { idID } from "@mui/material/locale";

function ListState({ children }) {
  const [allList, setAllList] = useState([]);

  const addListFun = async (list, image, setListing) => {
    let formdata = new FormData();

    formdata.append("title", list.title);
    formdata.append("description", list.description);
    formdata.append("price", list.price);
    formdata.append("location", list.location);
    formdata.append("country", list.country);
    formdata.append("image", image);

    try {
      const response = await fetch(`${baseUrls}/api/v3.2/post/addlist`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: formdata,
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        successEmitter(data.message);
        setListing({
          title: "",
          description: "",
          price: "",
          location: "",
          country: "",
        });
      } else {
        errorEmitter(data.message);
      }
    } catch (error) {
      errorEmitter("internal server error");
    }
  };


  // const addListFun = async (list, setListing) => {
  //   const token = localStorage.getItem("token");

  //   try {
  //     const response = await fetch(`${baseUrls}/api/v3.2/post/addlist`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": token,
  //       },
  //       body: JSON.stringify(list),
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //     if (data.success) {
  //       successEmitter(data.message);
  //       setListing({
  //         title: "",
  //         description: "",
  //         price: "",
  //         location: "",
  //         country: "",
  //       });
  //     } else {
  //       errorEmitter(data.message);
  //     }
  //   } catch (error) {
  //     errorEmitter("internal server error", error);
  //   }
  // };

  const getAllList = async () => {
    const response = await fetch(`${baseUrls}/api/v3.2/post/alllist`);
    const data = await response.json();
    console.log(data);
    if (data.success) {
      setAllList(data.total_list);
    }
  };

  const yourListFun = async () => {
    try {
      const response = await fetch(`${baseUrls}/api/v3.2/post/yourlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setAllList(data.total_list);
      }
    } catch (error) {
      errorEmitter("internal server error");
    }
  };

  //update function
  const updatePostFun = async (update, id, handleClose) => {
    const myObj = {
      title: update.utitle,
      description: update.udescription,
      price: update.uprice,
      location: update.ulocation,
      country: update.ucountry,
    }
    try {
      const response = await fetch(`${baseUrls}/api/v3.2/post/updatelist/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(myObj),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        yourListFun();
        successEmitter(data.message);
        handleClose();
      } else {
        errorEmitter(data.message);
      }
    } catch (error) {
      errorEmitter("internal server error");
    }
  };
  //deleteFunction
  const deletePostFun = async (listid) => {
    // console.log(listid)
    const response = await fetch(`${baseUrls}/api/v3.2/post/deletelist/${listid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    console.log(data)
    if (data.success) {
      successEmitter(data.message)
      yourListFun()
    }
    else {
      errorEmitter(data.message)
    }
  };

  //create Like function which is used in listing card for posting your like in backend
  const likePostFun = async (listid) => {
    console.log(listid);
    try {
      const response = await fetch(`${baseUrls}/api/v3.2/post/like/${listid}`, {
        method: "PUT",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (data.success) {
        getAllList()
      }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <listContext.Provider
      value={{ allList, getAllList, addListFun, yourListFun, deletePostFun, updatePostFun, likePostFun }}
    >
      {children}
    </listContext.Provider>
  );
}

export default ListState;
