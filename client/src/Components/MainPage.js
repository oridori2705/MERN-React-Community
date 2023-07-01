import axios from 'axios'
import React, { useEffect, useState } from 'react'
import List from "./Post/List"

function MainPage() {
    const [PostList, setPostList] = useState([])
    useEffect(() => {
        axios.post("/api/post/list").then((response) => {
            if(response.data.success){
                setPostList([...response.data.postList]);
            }
            
        }).catch((error) => {
            console.log(error);
        });;
    }, [])
    
    return (
        <div>
            <List PostList={PostList}/>
        </div>
    )
}

export default MainPage