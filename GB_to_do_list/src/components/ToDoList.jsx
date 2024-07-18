import React from 'react';
import { Cog, Trash2, CircleCheckBig, Calendar, RotateCcw, EllipsisVertical,
         Moon, Sun, Plus, TriangleAlert, Clock8, ShieldAlert, Search, Download, Upload} from "lucide-react";
import { Texture, Texture_dark } from '../assets';
import { DarkModeContext } from './DarkModeProvider';
import { Tooltip,notification } from 'antd';
import TaskForm from './TaskForm';
import dayjs from 'dayjs';
import { format } from 'date-fns';
import * as Utils from './Utils';

 


class ToDoList extends React.Component {
    static contextType = DarkModeContext;
    editedTask= [];    

    constructor(props){
        super(props);
        this.state = {
            tasks: [    {id:1, name: "thing1",tags:"cat,auto,Lorem", remark: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum vitae sapien pellentesque habitant morbi tristique senectus et. Nibh sit amet commodo nulla facilisi nullam. Tristique nulla aliquet enim tortor. Faucibus turpis in eu mi bibendum neque egestas congue quisque. Ullamcorper velit sed ullamcorper morbi. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum. Sit amet volutpat consequat mauris nunc congue nisi vitae suscipit. Pelentesque elit eget gravida cum sociis natoque penatibus. Sed vulputate odio ut enim. A diam maecenas sed enim ut sem. Nullam eget felis eget nunc lobortis mattis aliquam. Amet massa vitae tortor condimentum. Lectus arcu bibendum at varius. Nec ullamcorper sit amet risus nullam eget felis. Senectus et netus et malesuada fames ac turpis egestas.", 
                                                                                start:(new Date("2024-1-15")).getTime(), due: (new Date("2024-6-15")).getTime(), priority:4,completed:false},
                        {id:2 ,name: "thing2",tags:"Ipsum", remark: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor i.",start:(new Date("2024-2-15")).getTime(), due: (new Date("2024-7-15")).getTime(), priority:1,completed:false},
                        {id:3, name: "thing3",tags:"", remark: "Pelentesque elit eget gravida cum sociis natoque penatibus.",start:(new Date("2024-3-15")).getTime(), due: (new Date("2024-8-15")).getTime(), priority:3,completed:false},
                        {id:4, name: "thing4",tags:"Tag1,Tag2,Tag3", remark: "Enim nec dui nunc mattis. Nibh cras pulvinar mattis nunc sed blandit. Tempor commodo ullamcorper a lacus vestibulum sed arcu non. Fames ac turpis egestas maecenas pharetra convallis posuere.",   start:(new Date("2024-4-15")).getTime(), due: (new Date("2024-9-15")).getTime(), priority:2,completed:true},
                        {id:5, name: "thing5",tags:"Auto, car", remark: "Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur.",start:(new Date("2024-5-15")).getTime(), due: (new Date("2024-10-15")).getTime(), priority:0,completed:false}
            ],
            

            dropDownVis: -1,
            prioritySort: false,
            taskFormVis: false,
            searchQuery: '',
            filteredTasks: [],
            completed: false
          
        };   
                                
    }
    
    componentDidMount() {
        window.addEventListener('Command',this.handleCustomEvent);
        this.sortAndFilter();   
    }

    componentWillUnmount() {
        
        window.removeEventListener('Command', this.handleCustomEvent);

    }
     

    handleCustomEvent = (event) => {
        console.log(event);
        let data = event.detail;
        switch (data.cmd) {
            case "submitTask":{
                console.log("som v handle");
                let task = data.task;
                let index = this.state.tasks.findIndex(t=> t.id == task.id);
                if(index != -1){
                    this.state.tasks[index] = task;
                }
                //pridavanie a volne id
                if(task.id == -1){
                    task.id = 0;
                    this.state.tasks.map(t => {
                        if(t.id >= task.id){
                            task.id = t.id + 1;
                        }
                    })
                    this.state.tasks.push(task); 

                }
               
            
                this.sortAndFilter();
                
                this.closeTaskForm();break;}
                


        }


    }

    openNotificationWithIcon = (type,title,desc) => {
        var clsnm = "";
        if(type == "success"){
          clsnm = "custom-notification-success";
        }
        else{
          clsnm = "custom-notification-error";
        }
        notification[type]({
          message: title,
          description: desc,
          placement: "top",
          duration: 10,
          className: clsnm
          
          
          
        });
      };

    handleSearch = (event) => {
        let query = event.target.value;
        let isHashtag = query.indexOf("#") == 0
        if(isHashtag){
            query = query.substring(1);
            if(!query)isHashtag = false;
        }    
        const filteredTasks = this.state.tasks.filter((item) => {
            let res = ((this.state.completed && item.completed) || (!this.state.completed && !item.completed))
            if(res && query) {
                if(isHashtag) res = (query.find_in_set(item.tags) != -1);
                else res = item.name.toLowerCase().includes(query.toLowerCase());
            }
            return res;
        })




        this.setState({ searchQuery: event.target.value, filteredTasks: filteredTasks });
      };
   

    toggleDropdown = (index) => {
        if(this.state.dropDownVis == index){
            this.setState({dropDownVis: -1})
            return;
        }
        this.setState({dropDownVis: index})
    };

    toggleTaskForm = (id) => {
        let index = -1; 
        if(id!=-1) {
            index = this.state.tasks.findIndex(task => task.id == id);
            if(index == -1) return;
        }
        if(index!=-1) this.editedTask = {...this.state.tasks[index]};
        else this.editedTask = {id: -1,
                                name : undefined,
                                tags: undefined,
                                remark : undefined,
                                start : undefined,
                                due : undefined,
                                priority : 0,
                                completed:false}
            this.editedTask.start = dayjs(this.editedTask.start); 
            this.editedTask.due = dayjs(this.editedTask.due); 
            
        this.setState(prevState => ({
            taskFormVis: !prevState.taskFormVis
        }));
        this.forceUpdate();

    };  

    closeTaskForm = () => {

        this.setState(prevState => ({
            taskFormVis: !prevState.taskFormVis
        }));
        this.forceUpdate();
    }

    togglePriorityFilter = () => {
        this.setState(prevState => ({
            prioritySort: !prevState.prioritySort
        }),() => {this.sortAndFilter()}) ;
       
        
    };    

    toggleTaskPrior = (index) => {
        this.state.filteredTasks[index].priority = (this.state.filteredTasks[index].priority + 1) % 5;
        this.forceUpdate();
    }

    

    onDelete = (id) => {
        let index = this.state.tasks.findIndex(task => task.id == id);
        if(index != -1) this.state.tasks.splice(index,1);
        this.handleSearch({target:{value:this.state.searchQuery}})

        
    }  

    markAsCompleted = (id) => {
        let index = this.state.tasks.findIndex(task => task.id == id);
        if(index != -1) {
            this.state.tasks[index].completed = !this.state.tasks[index].completed;
            this.sortAndFilter();
        }
    }


    toggleCompletedTask = () => {
        this.setState(prevState => ({
            completed: !prevState.completed
        }),() => {this.sortAndFilter()}) ;


    }


    sortAndFilter = () => {
        let sortedTasks;
        if(this.state.prioritySort)sortedTasks = [...this.state.tasks].sort((a, b) => b.priority - a.priority)
        else sortedTasks = [...this.state.tasks].sort((a, b) => b.start - a.start);
        this.setState({ tasks: sortedTasks }, () => {this.handleSearch({target:{value:this.state.searchQuery}})});
    }


    importMock = async () => {
        let data = await Utils.transfer("https://6699062b2069c438cd710364.mockapi.io/api/todo/list1/1",{},"get");
        if(data.tasks) this.setState({ tasks: data.tasks},() => {this.sortAndFilter(); this.openNotificationWithIcon("success","Import","List imported from Mockapi.io"); });
       

        
    }

    exportMock = async () => {
        let data = {tasks: this.state.tasks, id:1}
        await Utils.transfer("https://6699062b2069c438cd710364.mockapi.io/api/todo/list1/1",data,"put");
        this.openNotificationWithIcon("success","Export","List exported to Mockapi.io");
        
    }

    render(){
        const { darkMode,toggleDarkMode } = this.context;
        const iconMode = darkMode ? "bg-gray-gradient text-white" : "bg-white text-black"; 
        const searchBar =   (<>
                                <div className={`px-3 py-1 `}><Search size={24} /></div>
                                <input className= {`${iconMode} inputBracket rounded-full bg-red-600 `} 
                                    onChange={this.handleSearch}
                                    type="text"
                                    name="note"
                                    value={this.state.searchQuery}
                                    placeholder="Type to search..."
                                />
                            </>)
                           
        return(
             
            <>
                <div className={` font-poppins w-full h-full flex flex-col my-3 mx-3 ${darkMode && "dark"}`}>
                    
                    <nav className='  border-red-500 mb-3 flex justify-between items-center break-words '>       
                            <span className='font-bold md:text-[48px] text-[36px]'>To do list</span>
                            
                             {/*SEARCH BAR*/}
                            
                            
                            <div className='flex flex-row gap-3 items-center '>
                            
                                 <div className={`md:flex hidden justify-between items-center searchBracket rounded-full h-1/3 min-w-60 ${iconMode} border-2 border-dimWhite`}>
                                    {searchBar}
                                 </div>


                            
                           
                                
                                
                                <div className='grid sm:grid-cols-6 grid-cols-3 sm:gap-3 gap-1 min-w-max'>
                                        <Tooltip placement="bottomRight" color="black" title="Import list"> 
                                            <button  onClick={this.importMock} className={`border-2 border-dimWhite rounded-full px-3 py-3  ${iconMode}`}><Download size={24}/></button>   
                                        </Tooltip>

                                        <Tooltip placement="bottomRight" color="black" title="Export list"> 
                                            <button  onClick={this.exportMock} className={`border-2 border-dimWhite rounded-full px-3 py-3  ${iconMode}`}><Upload size={24}/></button>   
                                        </Tooltip>
                                        
                                        <Tooltip placement="bottomRight" color="black" title="New task"> 
                                            <button onClick={this.toggleTaskForm.bind(this,-1)} className={`border-2 border-dimWhite rounded-full px-3 py-3  ${iconMode}`}>
                                                {darkMode?<Plus size={24}/> : <Plus size={24}/>}</button>
                                        </Tooltip>

                                        <Tooltip placement="bottomRight" color="black" title="Completed tasks"> 
                                            <button onClick={this.toggleCompletedTask} className={`border-2 border-dimWhite rounded-full px-3 py-3 ${this.state.completed && "bg-green-400"} ${(!darkMode && !this.state.completed) && "bg-white text-black" }`}>
                                            {this.state.completed? <CircleCheckBig size={24} color='green'/> : <CircleCheckBig size={24}/>}</button>
                                        </Tooltip>
                                        
                                        <Tooltip placement="bottomRight" color="black" title="Sort by priority/date"> 
                                            <button onClick={this.togglePriorityFilter} className={`border-2 border-dimWhite rounded-full px-3 py-3  ${iconMode}`}>
                                                {this.state.prioritySort?<ShieldAlert size={24}/> : <Clock8 size={24}/>}</button>
                                        </Tooltip>
                                    
                                        <button onClick={toggleDarkMode} className={`border-2 border-dimWhite rounded-full px-3 py-3  ${iconMode}`}>
                                            {darkMode?<Moon size={24}/> : <Sun size={24}/>}</button>
                                 </div>

                            </div>  
                    </nav>  


                    {/*SEARCH BAR FOR SM*/}
                    <div className={`md:hidden flex mb-3 justify-between items-center searchBracket rounded-full h-1/3 ${iconMode} border-2 border-dimWhite`}>
                        {searchBar}
                    </div>
                       
                    <div className={`w-full h-full grid gap-3 md:grid-cols-4 sm:grid-cols-3 grid-cols-1 `}>
                        
                       
                        {this.state.filteredTasks.map((structure,index) => {
                            

                            let tagsField = structure.tags ? structure.tags.split(',') : [];
                           

                            const navItems = (<>
                                {/*<Tooltip placement="bottomRight" color="black" title="Expand"> 
                                    <button><Maximize size={24}/></button>
                                </Tooltip>  */}
                                
                                <Tooltip placement="bottomRight" color="black" title="Options"> 
                                    <button onClick={this.toggleTaskForm.bind(this,structure.id)}><Cog size={24}/></button>
                                </Tooltip> 
                                
                                <Tooltip placement="bottomRight" color="black" title={structure.completed ? "Mark as incomplete" : "Mark as completed"}> 
                                    <button onClick={this.markAsCompleted.bind(this,structure.id)}> {structure.completed ? <RotateCcw size={24}/> : <CircleCheckBig size={24}/>}</button>
                                </Tooltip>
                                
                                <Tooltip placement="bottomRight" color="black" title="Delete">
                                    <button onClick={this.onDelete.bind(this,structure.id)}><Trash2 size={24}/></button>
                                </Tooltip>

                            </>)
                        
                            let alertColor;
                            let alertColor2 = "white";
                            let toolTipTitle;
                            switch (structure.priority){
                                case 4:    {alertColor="red"; toolTipTitle = "Priority: Very high"; break;}
                                    
                                case 3:        {alertColor="orange"; toolTipTitle = "Priority: High";break;}
                                        
                                case 2:    {alertColor="green"; toolTipTitle = "Priority: Moderate"; break;}  
                                   
                                case 1:         {alertColor="blue"; toolTipTitle = "Priority: Low"; break;}
                                     
                                case 0:        {if(darkMode){alertColor = "white"; alertColor2 = "black";}    
                                                        toolTipTitle = "Priority: Without priority"
                                                        break;
                                                    }
                                default:{
                                    alertColor="yellow";
                                }    
                                
                            }
                           
                            

                            let triangleAlert = (<Tooltip placement="bottomRight" title={toolTipTitle} overlayInnerStyle={{color:alertColor2,backgroundColor: alertColor}}>  
                                                    <button onClick={this.toggleTaskPrior.bind(this,index)}> {<TriangleAlert size={24} color={alertColor}/>} </button>
                                                </Tooltip>  )
                                          
                            
                        
                            return(
                            <React.Fragment key={index}>  
                                
                                
                                <div className={`w-full h-80 rounded-md bg-black flex flex-col  
                                    ${(structure.priority == 4 ? "border-4 border-red-600" : 
                                    (structure.priority == 3 ? "border-4 border-orange-600" : 
                                    (structure.priority == 2 ? "border-4 border-green-600" : 
                                    (structure.priority == 1 ? "border-4 border-blue-600" :  "border-4 border-dimWhite"
                                    ))))}`}  
                                    style={{ 
                                    backgroundImage: `url(${darkMode ? Texture_dark : Texture})`,
                                    backgroundSize: 'cover', 
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                }}>
                                        
                                        {/*HEADER*/}
                                        <nav className={` ${darkMode ? "bg-gray-gradient " : "bg-white" }  relative w-full h-auto dark:text-white text-black flex justify-between items-center rounded-md border-b-2 border-dimWhite`}>
                                        
                                            <div className='grid ml-1 my-1'>
                                                <span className='text-2xl font-medium'>{structure.name}</span>
                                                <div className='flex flex-row gap-1 mt-1'>
                                                    <Calendar size={24}/>
                                                    <span >{format(structure.start,"dd.MM.yy")}-
                                                        <span className={`${structure.priority == 4 ? "text-red-600 font-bold" : "dark:text-white text-black"}`}>{format(structure.due,"dd.MM.yy")}</span>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className='flex flex-row mr-1 gap-3 h-full items-center md:hidden  border-red-500'>
                                                {triangleAlert} 
                                                <button onClick={this.toggleDropdown.bind(this,index)} className=' h-full '><EllipsisVertical size={24}/></button>
                                                
                                            </div>

                                            <div className='md:grid hidden grid-flow-col xl:gap-3 gap-1 mr-1'>
                                                {triangleAlert}  
                                                {navItems}
                                            </div>
                                            
                                            {/*MOBILE/SM*/}
                                            {this.state.dropDownVis == index && (
                                                    <div className={` ${darkMode ? "bg-gray-gradient text-white border-dimWhite" : "bg-white text-black border-black" } sidebar px-5 py-3 grid grid-cols-1 top-14 right-1 absolute gap-5 rounded-md  border-2  `}>   
                                                    {navItems}
                                                    </div>
                                            )}
                                        
                                        
                                        </nav>
                                        
                                        {/*BODY/TEXT*/}
                                        <div className='w-full h-full break-words px-1 py-1 text-left overflow-y-auto scrollbar-none '>
                                            <span className='ml-1 mr-1 dark:text-white text-black font-semibold w-full h-full '>
                                                {structure.remark}
                                            </span>

                                        </div>

                                        <div className={`py-1 px-1 h-9 border-red-500 flex flex-row rounded-md gap-2 justify-start break-words overflow-x-auto scrollbar-none `}>
                                            
                                            {tagsField.map((tag,index) => 

                                                <div key={index} className={`flex flex-row min-w-20 items-center justify-center rounded-full border 2 border-dimWhite ${darkMode ? " text-white bg-gray-gradient" : "text-black bg-white"}`}>
                                                    <span className=' border-green-500 text-[12px]'>
                                                        {tag}
                                                    </span>
                                                </div>
                                            
                                            )}
                                            
                                        

                       

                                        </div>

                                </div> 


                                {this.state.taskFormVis && ( 
                                    <div className="modal z-[301]">
                                        <div onClick={this.closeTaskForm} className="overlay"></div> 
                                        <div className="modal-content fadeinmodal mt-8 ">
                                
                                            <div className="mt-14 sidebar">
                                                <TaskForm task={this.editedTask}/>    
                                            </div>   
                                        

                                        </div>
                                    </div>    
                                )}
                  
                            </React.Fragment>
                        )})}                   

                    </div> 
                    
                    
                   
                </div>
            </>

        )


    }
   
} export default ToDoList;