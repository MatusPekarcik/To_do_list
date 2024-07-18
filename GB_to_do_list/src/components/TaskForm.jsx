import React from 'react';
import { DarkModeContext } from './DarkModeProvider';
import { DatePicker, Space, Tooltip } from 'antd';
import * as Utils from './Utils';




class TaskForm extends React.Component {
    static contextType = DarkModeContext;

    constructor(props){
        super(props);
        this.state = {
            task: this.props.task,
          
        };                                       
    }

    onChange = (event) => {
       
        let t = {...this.state.task};
        if(event.target.name == "name") t.name = event.target.value
        if(event.target.name == "tags") t.tags = event.target.value
        if(event.target.name == "remark") t.remark = event.target.value
        if(event.target.name == "priority") t.priority = event.target.value
        this.setState({task: t});
    };
    
    onDateChange = (name, date, dateString) => {
        let t = {...this.state.task};
        if(name == "start") t.start = date;
        if(name == "due") t.due = date;
        this.setState({task: t});
    };

    
    

    handleSubmit = () => {
        let task = {...this.state.task}
        task.start = task.start.valueOf();
        task.due = task.due.valueOf();
        task.priority = Number(task.priority);
        

        Utils.message("submitTask",{task});


    }



    render(){
        const { darkMode } = this.context;
        return (
        <>
           

            <div className='max-w-sm mx-auto '>
                <div className="mb-5">
                    <label  className="block   text-sm font-medium text-white dark:text-white">Task name</label>
                    <input   name="name" value={this.state.task.name} onChange={this.onChange} className={`bg-gray-50  border-dimWhite
                         text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${darkMode && "bg-gray-gradient"}  border-2 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="Task number 1" required />
                </div>


                <div className="mb-5">
                    <label  className="block   text-sm font-medium text-white dark:text-white">Tags</label>
                    <input   name="tags" value={this.state.task.tags} onChange={this.onChange} className={`bg-gray-50  border-dimWhite
                         text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${darkMode && "bg-gray-gradient"}  border-2 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="Tags"/>
                </div>
                <Tooltip placement="top" color="black" title="You can change the priority by clicking on the alert icon in the task menu"> 
                    <label  className="block text-sm font-medium text-white dark:text-white">Task priority</label>
                    
                    <select
                         name="priority" value={this.state.task.priority} onChange={this.onChange} className={`bg-gray-50 border-dimWhite text-gray-900 text-sm rounded-lg focus:ring-blue-500
                            focus:border-blue-500 block w-full p-2.5 ${darkMode && "bg-gray-gradient"} border-2  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    >
                        <option className='text-black' value="4" >Very high</option>
                        <option className='text-black' value="3" >High</option>
                        <option className='text-black' value="2" >Moderate</option>
                        <option className='text-black' value="1" >Low</option>
                        <option className='text-black' value="0" >Without priority</option>
                    </select>
                </Tooltip>   
               
                <div className={`flex flex-row justify-between ${darkMode && "custom-datepicker"} custom-datepicker-2 mt-4`}>
                    <div>
                        <label  className="block text-sm font-medium text-white dark:text-white">From</label>
                        <Space direction="vertical">
                            <DatePicker name="start" value={this.state.task.start} onChange={this.onDateChange.bind(this,"start")} />
                        </Space>
                    </div>
                    <div>
                       <label  className="block   text-sm font-medium text-white dark:text-white">To</label>
                        <Space direction="vertical">
                            <DatePicker name="due" value={this.state.task.due} onChange={this.onDateChange.bind(this,"due")} />
                        </Space>
                    </div>    
                </div>
                
                        
                <label  className="block mt-4 text-sm font-medium text-white dark:text-white">Your task</label>
                <textarea  rows="4"  name="remark" value={this.state.task.remark} onChange={this.onChange} className={`block p-2.5 w-full text-sm text-gray-900 ${darkMode && "bg-gray-gradient"} rounded-lg 
                         border-dimWhite focus:ring-blue-500 focus:border-blue-500   border-2 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} 
                        placeholder="Leave a comment..."></textarea>

                <button onClick={this.handleSubmit} className="mt-4 text-white bg-gray-gradient border-2 border-white dark:bg-white  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 
                 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>

            </>
        )
    }
}export default TaskForm
