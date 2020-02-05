import React, { Component } from 'react';
import {GetRequestFunction,PostRequestFunction,DeleteRequestFunction} from '../../../api/ApiHelper';
import {getApiurl} from '../../../api/ApiKeys';
import Pagination from '../../Atoms/Pagination/Pagination';
import {checkAuthentication} from '../../../Auth/Auth';
import {getCookieFunction} from '../../Services/CookieController';

class ShowStudent extends Component {


    constructor(props){
        super(props);
        this.state={
            students:[],
            totalCount:0,
            name:'',
            class:'',
            id:null,
            sortby:null,
            order:1,
            searchName:'',
            searchClass:'',
            searchMode:false
         }

        this.pagenumber = 1;
        this.permission = [];
        this.token = null;
    }

     async componentDidMount(){
        this.token = getCookieFunction("token");
        if(this.token)
        {
            this.permission = await checkAuthentication("create_student");
            if(this.permission)
            {
                this.reloadTable();
            }
        }
        
    }

    setTabledata = (stddata) =>{

        this.setState({ students : stddata.data});
        this.permission = stddata.permissions;
        this.setState({totalCount:stddata.totalCount})


    }

    reloadTable = async(pgnumber=this.pagenumber,sortby=this.state.sortby,order=this.state.order) =>{

       let url = getApiurl("getallstudent");
       let param = this.getParam(pgnumber);

       if(sortby)
       {
           param["sortby"] = sortby;
           param["sort"] = order;
       }

       let getstudent = await GetRequestFunction(url,{},param);
       if(getstudent.success)
        {
            this.setTabledata(getstudent);
        }
    }

    getParam = (pagenumber) =>{
        let orderby = this.state.orderby;
        let token = this.token;
        // console.log(token)
        //let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTIxN2E2MTc3MjU5MjBkMjQ5MzI0YTMiLCJpYXQiOjE1ODAxMTIzNTV9.TPeMdxZ0LeXqp_apEgO8CP51c-5WcgxnpVygTLzFh2I`;
        let returnObj = {token:token,limit:3,page:pagenumber,sort:orderby};
        return returnObj
    }
    
    handlePagination = async (std)=>{
        this.pagenumber = std;
        if(this.state.searchMode)
        {
             this.searchApicall(std)
        }else
        {
            this.reloadTable(std);
        }
        
    } 

    getSelectedData = async (id)=>{
        //let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTIxN2E2MTc3MjU5MjBkMjQ5MzI0YTMiLCJpYXQiOjE1ODAxMTIzNTV9.TPeMdxZ0LeXqp_apEgO8CP51c-5WcgxnpVygTLzFh2I`;
        let token = this.token
        let url = getApiurl("viewstudent");
        let param = {token:token,_id:id}
        let getstudent = await GetRequestFunction(url,{},param);
        if(getstudent.success)
        {
            let data  = getstudent.data[0];
            this.setState({id:data._id,name: data.name,class: data.class});
        }
    }

    changeName = (e)=>{

        this.setState({ name : e.target.value });
    }

    changeClass = (e)=>{

        this.setState({ class : e.target.value });
    }

    updationCall = () =>{

        if(this.state.id)
        {
            this.updateStudent();
        }else
        {
            alert("select student")
        }

    }

    updateStudent = async() =>
    {
        let stdid = this.state.id;
        let stdname = this.state.name;
        let stdclass = this.state.class;

        let data = {
            _id:stdid,
            name:stdname,
            class:stdclass
        }

        let t = this.token
        let url = getApiurl("updatestudent");
        let header = {bearer:t}
        let stdinfo  = await PostRequestFunction(url,header,data);
        if(stdinfo.success)
        {
            this.reloadTable();
        }
    }

    deleteStudent = async(id) =>
    {
        let t = this.token
        let url = getApiurl("deletestudent");
        let header = {bearer:t}
        let data = {
            _id:id,
            token:t,
        }
        let dltdata =  await DeleteRequestFunction(url,header,data);
        if(dltdata.success)
        {
            if(this.state.searchMode)
            {
                 this.searchApicall(this.pagenumber,this.state.currentsortby,this.state.order)
            }else
            {
                this.reloadTable(this.pagenumber,this.state.currentsortby,this.state.order);
            }
        }
    }

    sortByColumn = (currentsortby)=>{
        let order = 1;
        let previousSortBy = this.state.sortby;
        if(currentsortby===previousSortBy)
        {
            if(this.state.order===1)
            {   order=-1;
                this.setState({order: -1});
            }else
            {
                order=1;
                this.setState({order: 1});
            }
            
        }else
        {
            this.setState({order: 1});
        }
        this.setState({sortby : currentsortby});

        if(this.state.searchMode)
        {
             this.searchApicall(this.pagenumber,currentsortby,order)
        }else
        {
            this.reloadTable(this.pagenumber,currentsortby,order);
        }
        
     }

     enterToSerch =  (e) =>{
        this.setState({ 
            [e.target.name] : e.target.value,
            searchingType : e.target.id
        })
     }

     searchingName = () =>{
        let searchName = this.state.searchName;
        if(searchName.length > 0)
        {
            this.reloadTable(this.pagenumber,this.state.sortby,this.state.order);
        } 
        
     } 

     searching = ()=>{
         this.pagenumber = 1;
         let searchName = this.state.searchName;
         let searchClass = this.state.searchClass;
         if(searchName.length===0 && searchClass.length===0)
         {   
             this.setState({searchMode:false})
             this.reloadTable(this.pagenumber,this.state.sortby,this.state.order);
         }else
         {
             this.setState({searchMode:true})
             this.searchApicall();
         }
    }



    searchApicall = async(pageNumber=this.pageNumber,sortby=this.state.sortby,order=this.state.order) =>{
       
        let searchName = this.state.searchName;
        let searchClass = this.state.searchClass;
        let t = this.token
        //let t=`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTIxN2E2MTc3MjU5MjBkMjQ5MzI0YTMiLCJpYXQiOjE1ODAxMTIzNTV9.TPeMdxZ0LeXqp_apEgO8CP51c-5WcgxnpVygTLzFh2I`;
        let url = getApiurl("getallstudent");
        let param = {token:t,limit:3,page:pageNumber}
        if(searchName.length > 0)
        {
            param["where["+"name"+"]"] = searchName;
        }
        if(searchClass.length > 0)
        {
            param["where["+"class"+"]"] = searchClass;
        }

        if(sortby)
       {
           param["sortby"] = sortby;
           param["sort"] = order;
       }

       let getstudent = await GetRequestFunction(url,{},param);
       if(getstudent.success){
           this.setTabledata(getstudent)

       }
     }
        




    render() {

        return (
            <div>
            <div data-test="loginComponent">
             <table striped bordered hover id="tasktbl" style={{"width":"65%"}}>
                    <thead>
                        <tr>
                            <th>
                                
                                 <div>
                                 <input type="text" placeholder="Search name" id="name" name="searchName" 
                                 value={this.state.searchName} onChange={this.enterToSerch}
                                 
                                 />
                                 </div>
                                 <div onClick={()=>this.sortByColumn("name")}>Name</div>
                            </th>
                            <th>
                             
                                 <div>
                                 <input type="text" placeholder="Search class" id="class" name="searchClass" 
                                 value={this.state.searchClass} onChange={this.enterToSerch}
                                 />
                                 </div>
                                 <div onClick={()=>this.sortByColumn("class")}>Class</div>
                            </th>
                            <th>
                                <div><button onClick={this.searching}>search</button></div>
                                <div>
                                update
                                </div>
                            </th>
                            <th>
                                <div></div>
                                <div>
                                delete
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.students && this.state.students.map((ele,index)=>{
                         
                            return <tr key={ele._id}>
                                        <td>{ele.name}</td>
                                        <td>{ele.class}</td>
                                        <td><button onClick={this.permission.includes('update_student')?()=>this.getSelectedData(ele._id):null}>Update </button></td>
                                        <td>{ele.isDeleted===false?<button onClick={this.permission.includes('delete_student')?()=>this.deleteStudent(ele._id):null}>Delete</button>:null}</td>
                                   </tr>

                        })} 
                    </tbody>
                </table>
                {this.state.totalCount>0?<Pagination items={this.state.students} totalcount={this.state.totalCount} onChangePage={this.handlePagination} pageSize={3}/>:null}
            </div>
            <div data-test="loginComponent">
                 <div>
                    <div>
                        <input type="text"  
                        placeholder="Enter name" name="uname"  value={this.state.name} onChange={this.changeName}/>
                    </div>
                    <div>
                        <input type="text" 
                        placeholder="Enter class" name="psw" value={this.state.class} onChange={this.changeClass}/>
                    </div>
                    <button onClick={this.permission.includes('update_student')?this.updationCall:null}>Update</button>
                </div>
               
            </div>
            </div>
        )
    }
}
export default ShowStudent;