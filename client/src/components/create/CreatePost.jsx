 import React from 'react'
 import { useState ,useEffect,useContext} from 'react';
 import { Box,styled,FormControl,InputBase,Button,TextareaAutosize} from '@mui/material';
 import {AddCircle as Add} from '@mui/icons-material';
 import {useLocation ,useNavigate  } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import { API} from '../../service/api';



 const Container = styled(Box)`
     margin:50px 100px
 `



 const Image = styled('img')({
    width:'100%',
    height:'50vh',
    objectFit:'cover'
 })

 const StyledFormControl=styled(FormControl)`
 margin-top:10px;
 display:flex;
 flex-direction:row;

 `;

 const InputTextField=styled(InputBase)`
  flex:1;
  margin :0 30px;
  font-size:25px;
 `;

 const Textarea=styled(TextareaAutosize)`
    width:100%;
    margin-top:50px;
    font-size:18px;
    border:none;
    &:focus-visible{
        outline:none;
    }

 `;

 const initialPost ={
    title:'',
    description:'',
    picture:'',
    username:'',
    categories:'',
    createdDate:new Date()
 }

 
 const CreatePost = () => {
   
     const [post,setPost] = useState(initialPost);
     const [file,setFlie]=useState('');
     const {account} =useContext(DataContext);

     const location=useLocation();
     const navigate= useNavigate();
     const url =post.picture ?post.picture: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
     useEffect(() =>{
         const getImage = async () =>{
             if(file){
                const data=new FormData();
                data.append("name",file.name);
                data.append("file",file);

                //API CALL 
                const response=await API.uploadFile(data);
                post.picture = response.data;  //TODO
             }
         }
         getImage();
        post.categories=location.search?.split('=')[1] || 'All';
        post.username = account.username;
     },[account.username, file, location.search, post])
     const handleChange = (e) =>{
      setPost({ ...post,[e.target.name]:e.target.value})
   }
   const savePost = async () =>{
    let response = await API.createPost(post);
    if(response.isSuccess){
      navigate('/');
    }
   }

   return (
     <Container>
       <Image src={url} alt="banner"/>
       <StyledFormControl>
        <label htmlFor="fileInput">
          <Add fontSize='large' color='action'/>
        </label>
        <input
         type="file"
         id="fileInput"
         style={{display:'none'}}
         onChange={(e) => setFlie(e.target.files[0])}
         />
         <InputTextField placeholder='Title' onChange={(e) => handleChange(e)} name="title"/>
         <Button variant="contained" onClick={()=>savePost()}>Publish</Button>

       </StyledFormControl>
        <Textarea
        minRows={5}
        placeholder='Tell your story....'
        onChange={(e) => handleChange(e)}
        name="description"
        />
     </Container>
   )
 }
 
 export default CreatePost;
 