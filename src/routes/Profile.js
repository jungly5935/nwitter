import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { authService, dbService } from '../fbase';

const Profile = ({ refreshUser , userObj }) => {

    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

    const history = useHistory();

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    const getMyNweets = async() => {
        const nweets = await dbService
        .collection("nweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createdAt", "desc")
        .get();
        console.log(nweets.docs.map((a) => console.log(a.data()) ))
    }
    useEffect(() => {
      
        getMyNweets();
    
      
    }, [])
    
    const onChange = (e) => {
        const value = e.target.value;
        setNewDisplayName(value);
    }
    const onSubmit = async (e) => {
        e.preventDefault();

        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName
            })
        }
        refreshUser();
    }

    return (
        <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
          <input
            onChange={onChange}
            type="text"
            autoFocus
            placeholder="Display name"
            value={newDisplayName}
            className="formInput"
          />
          <input
            type="submit"
            value="Update Profile"
            className="formBtn"
            style={{
              marginTop: 10,
            }}
            />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
    )
}
export default Profile;