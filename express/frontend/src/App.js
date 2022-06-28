    import React, {Component}  from 'react';
    import fetch from 'isomorphic-fetch';
    import './frontend.css';
    import Button from 'react-bootstrap/Button';
    import Form from 'react-bootstrap/Form';

    class App extends Component{//Using a class based component//
      constructor(props){
        super(props);
        this.state = {//storing properties with strings in state//
          error: null,
          isLoaded: false,
          value: '',
          message: '',
          webproject: [],
          id: '',
          description: '',
          title:'',
          url:'',
          titleUpdate: '',
          descriptionUpdate: '',
          urlUpdate: ''
        
        };
        //Binding all event handlers//
        this.handleChange = this.handleChange.bind(this);
        
        this.handleChangePost1 = this.handleChangePost1.bind(this);
        
        this.handleChangePost2 = this.handleChangePost2.bind(this);
        
        this.handleChangePost3 = this.handleChangePost3.bind(this);
        
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        
        this.handleChangeURL = this.handleChangeURL.bind(this);
        
        this.handleClickPost = this.handleClickPost.bind(this);
        
        this.handleClickDelete = this.handleClickDelete.bind(this);
        
        this.handleClickUpdate = this.handleClickUpdate.bind(this);
      }

      handleChange(e){
        e.preventDefault();
        this.setState({id: e.target.value})
      }

      handleChangePost1(e){//This is for creating a new title//
        e.preventDefault();
        this.setState({title: e.target.value})        
      }
      
      handleChangePost2(e){//This is for creating a new description//
        e.preventDefault();
        this.setState({description: e.target.value})
      }

      handleChangePost3(e){//This is for creating a new url//
        e.preventDefault();
        this.setState({url: e.target.value})
      }


      handleChangeTitle(e){//So if the title is changed it will be updated//
        e.preventDefault();
        this.setState({titleUpdate: e.target.value})        
      }
      
      handleChangeDescription(e){//will update every time the description is changed//
        e.preventDefault();
        this.setState({descriptionUpdate: e.target.value})
      }

      handleChangeURL(e){//So if the url is changed it will be updated//
        e.preventDefault();
        this.setState({urlUpdate: e.target.value})
      }
        
      handleClickPost(e){//If the Post button is clicked a new array with these input fields will be added//
        e.preventDefault();
        const data = { 
          "title": this.state.title, 
          "description": this.state.description, 
          "url": this.state.url
        }
        fetch("/create", {//fetching the endpoint from the server//
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data),
        }).then(res => res.json())
        .then(result =>{
          let items = result.items
          console.log(items)
          this.setState({
            webproject: items
          });
        })
      } 

        //This handleClick is for the delete method//
      handleClickDelete(e){
        e.preventDefault();
        console.log(e.target.id)
        const delId = e.target.id
        const data = {
          "id": delId
          
        }
        
        fetch("/delete", {//fetching the endpoint from the server//
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data),
        }).then(res => res.json())
          .then(results =>{
          let items = results.items
          console.log(items)
          this.setState({//updating state//
            webproject: items
        });
        })
        } 
        //This handleClick is for the update method ie. the PUT method//
        handleClickUpdate(e){//All input fields will be updated//
          e.preventDefault();
          const delId = e.target.id
          const data = {
            "id" : delId,
            "title": this.state.titleUpdate, 
            "description": this.state.descriptionUpdate, 
            "url": this.state.urlUpdate
          }
          fetch("/update",{//fetching the endpoint from the server//
            method: "PUT",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
          }).then(res => res.json())
            .then(results => {
              let items = results.items
              console.log(items)
              this.setState({//updating state and clearing state//
                webproject: items,
                titleUpdate: '',
                descriptionUpdate: '',
                urlUpdate:''
              });
            })
          }

      componentDidMount(){//When the component has mounted it will iniate the get method//
        fetch("/data")
          .then(res => res.json())
          .then((result) => {
            const items = result.items
            console.log(result.items)
            this.setState({//updating state//
              isLoaded: true,
              webproject: items
            }); 
          
          },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              }); 
            }) 
          }

            
                  render(){/*below I am rendering a map method that will map through the  webproject array. 
                    I am also rendering a form with a button so that the user can input a new project and clicks the post button the project should display*/

                    const {error, message, webproject} = this.state

                  const projects = webproject.map((project, index) => {
                
                    return(//returning a form with a delete button and another form that has an update the details of project in the array //
                  <div>
                  
                  <form id={index}>
                  
                  <div key={index}><p>Title:</p> {project.title} <p>Description:</p>{project.description} <p>URL:</p>{project.url}</div> 
                  <button className="delete" varient="primary" type="submit" id={index}  onClick={this.handleClickDelete}>Delete</button>
                  
                  </form>
                  <Form id="form">
                      
                      <input type="text" placeholder="Enter title"  onChange={this.handleChangeTitle}/>
                      
                      <input type="text" placeholder="Enter description"  onChange={this.handleChangeDescription}/>
                      
                      <input type= "text" placeholder="Enter url" onChange={this.handleChangeURL}/>
                    
                    <Button className="update"varient="primary" type="submit"  id={index} onClick={this.handleClickUpdate}>Update</Button>
                    </Form>
                  </div>)
              })
              
                if(error){//Error message will display if nothing is found//
                return <div>Error: {error.message}</div>
              }else
                return(//else it will disple an h1 and a paragraph//
                <div className="text">
                  <h1>WebProjects</h1>
                  <p>{`Enter Projects: ${message}`}</p>
                  
                  <Form id="form">
                      
                      <input type="text" placeholder="Enter title"  onChange={this.handleChangePost1}/>
                      
                      <input type="text" placeholder="Enter description"  onChange={this.handleChangePost2}/>
                      
                      <input type= "text" placeholder="Enter url" onChange={this.handleChangePost3}/>
                    
                    <Button className="post"varient="primary" type="post" onClick={this.handleClickPost}>Post</Button>
                    </Form>
                    <div>
                    {projects}
                    
                  </div>
                  </div>
              
              )
            }
          }
        export default App;
