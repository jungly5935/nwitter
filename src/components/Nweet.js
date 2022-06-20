import React, { useState } from 'react';
import { dbService, storageService } from '../fbase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = () => {
        const ok = window.confirm("delete this?");
        if(ok){
            dbService.doc(`nweets/${nweetObj.id}`).delete();
            storageService.refFromURL(nweetObj.attatchmentURL).delete();
        } else {

        }
    }


    const toggleEditing = () => setEditing(prev => !prev);
    const onSubmit = (event) => {
        event.preventDefault();
        dbService.doc(`nweets/${nweetObj.id}`).update({
            text:newNweet,
        });
        setEditing(false)
    }
    const onChange = (event) => {
        const value = event.target.value
        setNewNweet(value)
    }
    return(
    <div className="nweet">
        {
            editing ? (
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input 
                        type="text" 
                        value={newNweet} 
                        required 
                        onChange={onChange} 
                        />
                        <input type="submit" value="Update Nweet" className="formBtn"></input>
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">cancel</button>
                </>
            ) :
        
        (
        <>
            <><h4>{nweetObj.text}</h4></>
            {nweetObj.attatchmentURL && <img src={nweetObj.attatchmentURL} />}

            {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
            )}
        </>
        )}
    </div>)
};

export default Nweet;