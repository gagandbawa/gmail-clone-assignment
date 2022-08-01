import styled from 'styled-components';
import { Fragment, useEffect, useState } from 'react';
import EmailView from '../EmailView';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

const Wrapper = styled.div`
  min-width: 250px;
  margin-right: 30px;
  a {
    text-decoration: none;
    color: #000;
  }
  p {
    margin: 0px;
  }
  .item {
    display: flex;
    height: 32px;
    padding-left: 26px;
    align-items: center;
    border-radius: 0 16px 16px 0;
    cursor: pointer;
  }
  .item:hover {
    background-color: #e8eaed;
  }
  .selected {
    background-color: #fce8e6;
    font-weight: 700;
  }
  .textSelected {
    color: #d93025 !important;
  }
  .deleteIcon {
    display: none;
  }
  .item:hover .deleteIcon {
    display: block;
  }
`;

const callBackendAPI = async () => {
  const response = await fetch('/folders');
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message) 
  }
  return body;
};

const callBackendAPIForDeleteFolder = async (item) => {
  const response = await fetch(`/folders/${item}`,{ method: 'DELETE'});
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message) 
  }
  return body;
};

const LeftNav = () => {
  const [folders, setFolders] = useState([]);
  const [selected, setSelected] = useState('Inbox');
  const [count, setCount] = useState(0);
  const [toast,setToast] = useState(false);
  const [message, setMessage] = useState();

  const handleCount = (count) => {
    setCount(count);
  }
  useEffect(() => {
    callBackendAPI()
      .then((response) => {
        setFolders(response);
      });
  }, []);

  const deleteFolder = (item) => {
    callBackendAPIForDeleteFolder(item.toLowerCase())
      .then((response) => {
        setToast(true);
        setMessage('Folder has been deleted');
      }).catch(()=>{
        setToast(true);
        setMessage('Folder cannot been deleted: unauthorized');
      });
  }
  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => { setToast(false); }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );
  return (
    <div style={{display: 'flex' }}>
      <Wrapper>
        {folders.map((item, index) => {
          return(
              <p key={index} className={selected === item ? 'item selected': 'item'} style={{ justifyContent: 'space-between'}}>
                <a onClick={() => setSelected(item)} className={selected === item ? 'textSelected': ''}>{item}</a>
                <div className="deleteIcon">
                  <DeleteIcon onClick={() => { deleteFolder(item)}} fontSize="small" />
                </div>
              </p>
          );
        })}
      </Wrapper>
      <EmailView handleCount={handleCount} folder={selected} />
      <Snackbar
        open={toast}
        autoHideDuration={3000}
        onClose={() => setToast(false)}
        message={message || 'default message'}
        action={action}
      />
    </div>
  )
}

export default LeftNav;