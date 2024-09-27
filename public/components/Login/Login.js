export class LoginForm {
    
    loginContent = {
    
        loginLabel: {
            text: 'Entry',
            tag: 'label',            
        },
    
        emailEntry: {
            text: 'Input your mail',
            tag: 'input',
        },
    
        passwordEntry: {
            text: 'Input your password',
            tag: 'input',
        },

        submitBtn: {
            text: 'Enter!',
            tag: 'button',
        },
        
    };
    
    renderLogin() {
        const form = document.createElement('form');
    

        const bigObj = this.loginContent;
    
        for (const key in bigObj) {
          //alert(key);
      
          //alert(bigObj[key]['tag']);
          const tag = bigObj[key]['tag'];

          const newElement = document.createElement( tag );

          switch(tag) {
            case 'input':  
                newElement.placeholder = bigObj[key]['text'];
                break
            case 'label':
                newElement.innerText = bigObj[key]['text'];
                break
            case 'button': 
                newElement.innerText = bigObj[key]['text'];
                break
              
          }

          form.appendChild(newElement);
        
        }

        return form;
        
    }
   
}



