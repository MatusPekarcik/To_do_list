

export class MyData {


    tasks = [
        {name: "thing1", remark: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum vitae sapien pellentesque habitant morbi tristique senectus et. Nibh sit amet commodo nulla facilisi nullam. Tristique nulla aliquet enim tortor. Faucibus turpis in eu mi bibendum neque egestas congue quisque. Ullamcorper velit sed ullamcorper morbi. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum. Sit amet volutpat consequat mauris nunc congue nisi vitae suscipit. Pellentesque elit eget gravida cum sociis natoque penatibus. Sed vulputate odio ut enim. A diam maecenas sed enim ut sem. Nullam eget felis eget nunc lobortis mattis aliquam. Amet massa vitae tortor condimentum. Lectus arcu bibendum at varius. Nec ullamcorper sit amet risus nullam eget felis. Senectus et netus et malesuada fames ac turpis egestas.", start:"15.jan", due: "28.aug", priority:4},
        {name: "thing2", remark: "formular + add", start:"18.jan", due: "15.aug", priority:1},
        {name: "thing1", remark: "update", start:"15.jan", due: "28.aug", priority:3},
        {name: "thing2", remark: "list of to do lists", start:"18.jan", due: "15.aug", priority:2},
        {name: "thing3", remark: "urob toto3", start:"25.jan", due: "4.aug", priority:0}];


    newTask() {
        return { 
            name : undefined,
            remark : undefined,
            start : undefined,
            due : undefined,
            priority : 0,
        }
    }

    getTask(idx) {
        if (idx == -1) return this.newTask();
        if (idx < this.tasks.length)
          {
            const tt = this.visuals[idx].topics.map( t=>({...t}));
            return {...this.visuals[idx], topics: tt };
          }
        
        throw new Error(`Task index out of range`);    
      
      }
      
      












}

export var myData = new MyData;

export default myData;  