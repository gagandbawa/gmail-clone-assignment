import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1072px;
  font-size: 14px;
  svg {
    padding-right: 10px;
  }
  a {
    text-decoration: none;
    color: #000;
  }
  p {
    margin: 0px;
  }
  .email {
    display: flex;
    height: 32px;
    padding-left: 12px;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.06);
    border-top: 1px solid #e8eaed;
    cursor: pointer;
  }
  .deleteIcon {
    display: none;
  }
  .email:hover .deleteIcon {
    display: block;
  }
`;

const callBackendAPI = async (folderName) => {
  const response = await fetch(`/folders/${folderName}`);
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message) 
  }
  return body;
};

const callBackendAPIForMessages = async (id) => {
  const response = await fetch(`/messages/${id}`);
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message) 
  }
  return body;
};

const callBackendAPIForDeleteMessage = async (id) => {
  const response = await fetch(`/messages/${id}`, { method: 'DELETE'});
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message) 
  }
  return body;
};

const callBackendAPIForPOSTMessage = async (id, reqObj) => {
  const response = await fetch(`/messages/${id}`, { method: 'POST', body: JSON.stringify(reqObj), headers: { 'Content-Type': 'application/json' } });
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message) 
  }
  return body;
};

const EmailView = (props) => {
  const [list, setList] = useState([]);
  const [emailView, setEmailView] = useState(false);
  const [emailResponse, setEmailResponse] = useState();
  const folderName = props.folder.toLowerCase();
  const [toast,setToast] = useState(false);
  const [message, setMessage] = useState();
  useEffect(() => {
    callBackendAPI(folderName)
      .then((response) => {
        setList(response);
        setEmailView(false);
      });
  }, [folderName]);

  const showEmail = (message) => {
    callBackendAPIForMessages(message)
    .then((response) => {
      setEmailView(true);
      setEmailResponse(response);
    });
  };
  const deleteEmail = (message) => {
    callBackendAPIForDeleteMessage(message)
    .then((response) => {
      setToast(true);
      setMessage('Email has been deleted');
    });
  }

  const handleClick= (id, type) => {
    const message = {type: type }
    callBackendAPIForPOSTMessage(id, message)
    .then((response) => {
      setToast(true);
      setMessage('Email has been '+ type);
    });
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => { setToast(false); }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Wrapper>
      {!emailView && list.map((item, index) => {
        return(
          <div className="email" key={index} style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox />
              <StarBorderOutlinedIcon onClick={() => { handleClick(item['message-id'], 'star')}} />
              <LabelImportantIcon onClick={() => { handleClick(item['message-id'], 'mark')}} />
              <p onClick={() => showEmail(item['message-id'])} style={{ paddingLeft: '12px', width: '200px' }}><a>{item.from}</a></p>
              <p onClick={() => showEmail(item['message-id'])} ><a>{item.subject}</a></p>
            </div>
            <div className="deleteIcon">
              <DeleteIcon onClick={() => { deleteEmail(item['message-id'])}} fontSize="small" />
            </div>
          </div>
        );
      })}
      {emailView &&
      <>
        <div style={{ cursor: 'pointer', borderBottom: '1px solid #e8eaed' }}>
          <ArrowBackIcon onClick={() => { setEmailView(false)}}/>
        </div>
        <div>
          <h1>{emailResponse.subject}</h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <AccountCircleOutlinedIcon fontSize="large"/>
              <div>
                <p>{emailResponse.from}</p>
                <p style={{ color: '#5f6368'}}>to me</p>
              </div>
            </div>
            <div>
              <p>{emailResponse.date}</p>
            </div>
          </div>
          <p>{emailResponse.body}</p>
        </div>
      </>
      }
      <Snackbar
        open={toast}
        autoHideDuration={3000}
        onClose={() => setToast(false)}
        message={message || 'default message'}
        action={action}
      />
    </Wrapper>
  )
}

export default EmailView;